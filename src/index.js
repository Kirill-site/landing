import React from "react";
import * as ReactDOMClient from 'react-dom/client';
import MainSwiperPortfolio from './components/MainSwiperPortfolio';


const main_swiper_portfolio = ReactDOMClient.createRoot(document.querySelector('.portfolio-slider-block'));

main_swiper_portfolio.render(<MainSwiperPortfolio/>);

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
	anchor.addEventListener('click', function (e) {
			e.preventDefault();
			const href = this.getAttribute('href');
			let el = '';
			if (href !== '#top') {
				el = document.querySelector(this.getAttribute('href'));
				el.scrollIntoView({
					behavior: 'smooth'
				});
			} else {
				el = document.querySelector('.header');
				el.scrollIntoView({
					behavior: 'smooth'
				});
			}

	});
});
