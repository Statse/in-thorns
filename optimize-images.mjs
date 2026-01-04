import sharp from 'sharp';
import { readdir, mkdir, stat } from 'fs/promises';
import { join, basename } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Check command line arguments for which folder to optimize
const args = process.argv.slice(2);
const folderArg = args.find(arg => arg.startsWith('--folder='));
const folder = folderArg ? folderArg.split('=')[1] : null;

let sourceDir;
if (folder) {
	// Custom folder path (e.g., --folder=photos/tlbocos)
	sourceDir = join(__dirname, 'public', folder);
} else if (args.includes('--photos')) {
	// Legacy photos flag
	sourceDir = join(__dirname, 'public', 'photos', 'exit_wounds');
} else {
	// Default to music
	sourceDir = join(__dirname, 'public', 'music');
}
const outputDir = sourceDir; // Output to same directory

// Special handling for specific images
const imageConfig = {
	// TLBOACOS Album cover - square format
	'tlboacos-album.jpg': {
		width: 1200,
		height: 1200,
		quality: 90,
		description: 'Album cover'
	},
	// Exit Wounds single cover - square format
	'exit-wounds-cover.webp': {
		width: 1200,
		height: 1200,
		quality: 90,
		description: 'Single cover'
	},
	// Default for photos
	photos: {
		width: 1200,
		quality: 85,
		description: 'Band photo'
	},
	// Default for music
	default: {
		width: 1200,
		quality: 85,
		description: 'Music asset'
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
	const isPhotosFolder = sourceDir.includes('photos');
	for (const file of imageFiles) {
		const inputPath = join(sourceDir, file);
		const outputPath = join(outputDir, file);
		const config = imageConfig[file] || (isPhotosFolder ? imageConfig.photos : imageConfig.default);

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
	console.log('   2. If satisfied, replace files in public/music/');
	console.log('   3. Update image references to use .webp extension if needed\n');
}

main().catch(console.error);
