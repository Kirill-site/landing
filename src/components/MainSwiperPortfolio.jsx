import React from "react";
import * as ReactDOMClient from 'react-dom/client';
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {
  Navigation,
  Pagination,
} from "swiper/core";
import "swiper/swiper-bundle.css";
import "swiper/swiper.min.css";
import Json from "../portfolio.json";
import BottomSwiperPortfolio from "./BottomSwiperPortfolio";
import FullScreenSwiper from "./FullScreenSwiper";

SwiperCore.use([Navigation, Pagination]);
function importAll(r) {
  return r.keys().map(r);
}
const images = importAll(require.context('../images/sliders', false, /\.(png|jpe?g|svg|webp)$/));

let descblocks = []
Json.sites.forEach((site, index) => {
  let imageUrl = '';
  images.forEach(image => {
		const regex = new RegExp('.*?' + site.url + '_sizes.*', 'gi');
    if (regex.test(image)) {
      imageUrl = image;
    }
  });
  descblocks.push(
    <div key={index} id={site.url.slice(0, site.url.indexOf('.'))} className="portfolio-descblock-c">
      <div className="portfolio-descblock__top">
        <div className="portfolio-descblock__left">
          <img className="portfolio-descblock__size-image" src={imageUrl} alt={`${site.url}_sizes`}/>
        </div>
        <div className="portfolio-descblock__description">
          <h3 className="portfolio-descblock__title">{site.name}</h3>
          <p className="portfolio-descblock__text">{site.desc}</p>
          <a href={`http://${site.url}`} className="portfolio-descblock__link">{site.url}</a>
        </div>
      </div>
      <div className="portfolio-descblock__bottom">
        <BottomSwiperPortfolio thisSiteIndex={index}/>
      </div>
    </div>
  );
});
const descblock = ReactDOMClient.createRoot(document.querySelector('.portfolio-descblock'));
descblock.render(<div className="portfolio-descblock__container">
  {descblocks}
</div>);

const changePortfolioBlock = (index) => {
  const allDescs = document.querySelectorAll('.portfolio-descblock-c');
  let n = Json.sites[index].url;
  const thisBlock = document.querySelector(`#${n.slice(0, n.indexOf('.'))}`);
  allDescs.forEach(d => {
    d.classList.remove('portfolio-descblock-c_visible')
  });
  thisBlock.classList.add('portfolio-descblock-c_visible');
  
}
let sites = [];
Json.sites.forEach((site, index) => {
  console.log(site, index);
  sites.push(
    <FullScreenSwiper key={index} index={index}/>
  );
});
const portfolioFullscreen = ReactDOMClient.createRoot(document.querySelector('.portfolio-fullscreen'));
portfolioFullscreen.render(<div className="portfolio-fullscreen__container container">
  <div className="portfolio-fullscreen-close"></div>
  {sites}
</div>);







export default function MainSwiperPortfolio() {
  const slides = [];

  Json.sites.forEach((site, index) => {
    slides.push(
      <SwiperSlide className="portfolio-slide" key={index}>
        <img className="img portfolio-slide__img" src={require(`../images/sliders/${site.url}_01.webp`)} alt={site.url}/>
      </SwiperSlide>
    );
  });
  return (
    <Swiper
      id="swiper"
      slidesPerView={1}
      spaceBetween={45}
      loop
      navigation
      pagination={
				{"clickable": true}
			}
      onSlideChange={(sw) => changePortfolioBlock(sw.realIndex)}
    >
      {slides}
    </Swiper>
  );
}

