// Store scroll position when clicking a photo
document.addEventListener('astro:page-load', () => {
	// Re-attach listeners after view transition
	attachPhotoClickListeners();
	attachHashScrollListeners();

	// Restore scroll position if coming back from photo viewer
	const savedScroll = sessionStorage.getItem('galleryScrollPosition');
	if (savedScroll && window.location.pathname === '/') {
		// Use setTimeout to ensure DOM is ready and view transition is complete
		setTimeout(() => {
			window.scrollTo(0, parseInt(savedScroll));
			sessionStorage.removeItem('galleryScrollPosition');
		}, 0);
	}
});

function attachPhotoClickListeners() {
	document.querySelectorAll('a[href^="/photos/"]').forEach(link => {
		link.addEventListener('click', () => {
			// Save current scroll position before navigating to photo
			sessionStorage.setItem('galleryScrollPosition', window.scrollY.toString());
		});
	});
}

function attachHashScrollListeners() {
	// Smooth scroll behavior for anchor links
	document.querySelectorAll('a[href^="#"]').forEach(anchor => {
		anchor.addEventListener('click', function (e) {
			e.preventDefault();
			//@ts-ignore
			const target = document.querySelector(this.getAttribute('href'));
			if (target) {
				target.scrollIntoView({
					behavior: 'smooth',
					block: 'start'
				});
			}
		});
	});
}

// Initial attachment
attachPhotoClickListeners();
attachHashScrollListeners();
