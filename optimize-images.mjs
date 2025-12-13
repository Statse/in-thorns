import sharp from 'sharp';
import { readdir, mkdir, stat } from 'fs/promises';
import { join, basename } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const sourceDir = join(__dirname, 'public', 'exit_wounds');
const outputDir = join(__dirname, 'public', 'exit_wounds_optimized');

// Special handling for specific images
const imageConfig = {
	// Hero background - wider for full-screen
	'DA93CD43-944B-4EF9-8AC8-5B33C4DE2171.jpg': {
		width: 2400,
		quality: 85,
		description: 'Hero background'
	},
	// Album cover - square format
	'cover.png': {
		width: 1200,
		height: 1200,
		quality: 90,
		description: 'Album cover'
	},
	// Gallery photos - standard size
	default: {
		width: 1200,
		quality: 82,
		description: 'Gallery photo'
	}
};

async function optimizeImage(inputPath, outputPath, config) {
	const filename = basename(inputPath);
	console.log(`\nOptimizing ${filename}...`);
	console.log(`  Type: ${config.description}`);

	try {
		const image = sharp(inputPath);
		const metadata = await image.metadata();
		const inputStats = await stat(inputPath);

		console.log(`  Original: ${metadata.width}x${metadata.height}, ${(inputStats.size / 1024 / 1024).toFixed(2)}MB`);

		let pipeline = image;

		// Resize based on config
		if (config.width && config.height) {
			// Square format for cover
			pipeline = pipeline.resize(config.width, config.height, {
				fit: 'cover',
				position: 'center'
			});
		} else if (config.width) {
			// Resize based on width, maintain aspect ratio
			pipeline = pipeline.resize(config.width, null, {
				withoutEnlargement: true
			});
		}

		// Convert to WebP with quality settings
		const outputWebP = outputPath.replace(/\.(jpg|jpeg|png)$/i, '.webp');
		await pipeline
			.webp({ quality: config.quality, effort: 6 })
			.toFile(outputWebP);

		const outputStats = await stat(outputWebP);
		const outputMetadata = await sharp(outputWebP).metadata();
		console.log(`  Optimized: ${outputMetadata.width}x${outputMetadata.height}, ${(outputStats.size / 1024).toFixed(0)}KB`);
		console.log(`  Savings: ${((1 - outputStats.size / inputStats.size) * 100).toFixed(1)}%`);

		return {
			original: filename,
			optimized: basename(outputWebP),
			originalSize: inputStats.size,
			optimizedSize: outputStats.size,
			savings: inputStats.size - outputStats.size
		};
	} catch (error) {
		console.error(`  Error: ${error.message}`);
		return null;
	}
}

async function main() {
	console.log('🖼️  Image Optimization Script');
	console.log('━'.repeat(50));

	// Create output directory
	try {
		await mkdir(outputDir, { recursive: true });
		console.log(`\n✓ Created output directory: ${outputDir}`);
	} catch (error) {
		console.error(`Error creating output directory: ${error.message}`);
		process.exit(1);
	}

	// Read all images
	const files = await readdir(sourceDir);
	const imageFiles = files.filter(f => /\.(jpg|jpeg|png)$/i.test(f));

	console.log(`\nFound ${imageFiles.length} images to optimize`);

	const results = [];
	for (const file of imageFiles) {
		const inputPath = join(sourceDir, file);
		const outputPath = join(outputDir, file);
		const config = imageConfig[file] || imageConfig.default;

		const result = await optimizeImage(inputPath, outputPath, config);
		if (result) {
			results.push(result);
		}
	}

	// Summary
	console.log('\n' + '━'.repeat(50));
	console.log('📊 Summary');
	console.log('━'.repeat(50));

	const totalOriginal = results.reduce((sum, r) => sum + r.originalSize, 0);
	const totalOptimized = results.reduce((sum, r) => sum + r.optimizedSize, 0);
	const totalSavings = totalOriginal - totalOptimized;

	console.log(`\nTotal original size: ${(totalOriginal / 1024 / 1024).toFixed(2)}MB`);
	console.log(`Total optimized size: ${(totalOptimized / 1024 / 1024).toFixed(2)}MB`);
	console.log(`Total savings: ${(totalSavings / 1024 / 1024).toFixed(2)}MB (${((totalSavings / totalOriginal) * 100).toFixed(1)}%)`);
	console.log(`\n✨ Optimized images saved to: ${outputDir}`);
	console.log('\n💡 Next steps:');
	console.log('   1. Review the optimized images');
	console.log('   2. If satisfied, replace exit_wounds with exit_wounds_optimized');
	console.log('   3. Update image references to use .webp extension\n');
}

main().catch(console.error);
