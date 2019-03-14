(function () {
	let me = {};
	let nav = document.querySelector('.nav');

	me.toggleToActiveLink = function (target) {
		let links = document.querySelectorAll('.nav-link');
		let showedSection = target.dataset.link;

		for (let i = 0; i < links.length; i++) {
			if (links[i].classList.contains('nav-link-active')) {
				links[i].classList.remove('nav-link-active');
			}
		}

		target.classList.add('nav-link-active');
		scrollToActiveSection(showedSection);
	};

	function scrollToActiveSection(showedSection) {
		let section = document.querySelector(`.${showedSection}`);
		let scroll = new SmoothScroll();
		scroll.animateScroll(section);
	}

	ITVDN.navigation = me;
}());
