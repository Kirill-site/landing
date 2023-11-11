import React from "react";
import * as ReactDOMClient from 'react-dom/client';
import MainSwiperPortfolio from './components/MainSwiperPortfolio';


const main_swiper_portfolio = ReactDOMClient.createRoot(document.querySelector('.portfolio-slider-block'));

main_swiper_portfolio.render(<MainSwiperPortfolio/>);
