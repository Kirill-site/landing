import React, {useEffect, useState} from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {
  Navigation,
  Pagination,
	Keyboard
} from "swiper/core";
import "swiper/swiper-bundle.css";
import "swiper/swiper.min.css";
import Json from "../portfolio.json";

SwiperCore.use([Navigation, Pagination, Keyboard]);


function importAll(r) {
  return r.keys().map(r);
}
const images = importAll(require.context('../images/sliders', false, /\.(png|jpe?g|svg)$/));








export default function FullScreenSwiper({index}) {
	const [swiper, setSwiper] = useState(null);

	useEffect(() => {
		const portfolioFullScreenBlock = document.querySelector('.portfolio-fullscreen');
		let portfolioBottomSlides = document.querySelectorAll(`.portfolio-bottom-slide-${index}`);
		portfolioBottomSlides.forEach(bottomSlide => {
			bottomSlide.addEventListener('click', function() {
				portfolioFullScreenBlock.classList.add('portfolio-fullscreen_visible');
				portfolioFullScreenBlock.querySelector(`#portfolio-fullscreen-slider-${index}`).classList.add('portfolio-fullscreen-slider_visible');
				document.body.style.overflow = 'hidden';
				let numbers = this.id.match(/[0-9]+-[0-9]+/);
				numbers = numbers.toString();
				let x = parseInt(numbers.slice(numbers.indexOf('-') + 1));
				if (swiper){
					swiper.slideTo(x, 0);
				}


				// swiper.slideTo
			});
			const closeFullScreenBlock = () => {
				portfolioFullScreenBlock.classList.remove('portfolio-fullscreen_visible');
				portfolioFullScreenBlock.querySelector(`#portfolio-fullscreen-slider-${index}`).classList.remove('portfolio-fullscreen-slider_visible');
				document.body.style.overflow = '';
			};
			document.querySelector('.portfolio-fullscreen-close').addEventListener('click', closeFullScreenBlock);
			document.addEventListener('keydown', (e) => {
				if (e.code === 'Escape')
					closeFullScreenBlock();

			});
		});
	

		
	}, [swiper]);
	const site = Json.sites[index];
	let url = site.url;
	let siteImages = [];
	images.forEach(image => {
		const regex = new RegExp('.*?' + url + '_[0-9]+.*', 'gi');
		const num_regex = new RegExp(url + '(_[0-9]+)', 'gi');

		if (regex.test(image)){
			let num = (image.match(num_regex))[0].match(/[0-9]+/gm)[0];
			siteImages.push(
				<SwiperSlide key={num} id={num} className="portfolio-fullscreen-slide">
					<img className="img portfolio-fullscreen-image" src={image} alt={'photo' + num}/>
				</SwiperSlide>)
	}});
	return(
	<Swiper key={index} className="portfolio-fullscreen-slider"
	id={`portfolio-fullscreen-slider-${index}`}
	slidesPerView={1}
	spaceBetween={190}
	navigation
	pagination={{
		"clickable": true
	}}
	keyboard={{
		enabled: true
	}}

	onSwiper={setSwiper}
	>
		{siteImages}

	</Swiper>)

}