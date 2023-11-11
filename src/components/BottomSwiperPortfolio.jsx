import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {
  Navigation,
  Pagination,
} from "swiper/core";
import "swiper/swiper-bundle.css";
import "swiper/swiper.min.css";
import Json from "../portfolio.json";
SwiperCore.use([Navigation, Pagination]);

function importAll(r) {
  return r.keys().map(r);
}
const images = importAll(require.context('../images/sliders', false, /\.(png|jpe?g|svg)$/));


export default function BottomSwiperPortfolio({thisSiteIndex}) {
	
	const slides = [];
	const url = Json.sites[thisSiteIndex].url;
	let count = 0;
	images.forEach(image => {
		const regex = new RegExp('.*?' + url + '_[0-9]+.*', 'gi');
		const num_regex = new RegExp(url + '(_[0-9]+)', 'gi');

		if (regex.test(image)){
			let num = (image.match(num_regex))[0].match(/[0-9]+/gm)[0];

			console.log(num);
			slides.push(
				<SwiperSlide key={count} id={`portfolio-bottom-slide-${thisSiteIndex}-${count}`} className={`portfolio-bottom-slide portfolio-bottom-slide-${thisSiteIndex}`} >
					<img className="portfolio-bottom-image" src={image} alt={'photo' + num}/>
				</SwiperSlide>
			)
			count++;
		}
	});
	
	return(
		<Swiper className="portfolio-bottom-slider"
		id="portfolio-bottom-slider"
		slidesPerView={4}
		spaceBetween={25}
		navigation
		pagination


		>
		{slides}
		</Swiper>
	)
}

