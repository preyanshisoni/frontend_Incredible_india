import React, { useEffect } from 'react'

import { Navbar } from './Navbar'
import { CarouselContainer } from './CarouselContainer';
import { DestinationBanner } from './Header/DestinationBanner';

import Footer from './Footer/Footer';

import { useDispatch} from 'react-redux';
import { fetchLocation } from '../redux/slice/locationSlice';
import { fetchPlace } from '../redux/slice/PlaceSlice';
import { fetchCategories } from '../redux/slice/categorySlice';


import TopSpiritualCarousel from './TopSpiritualCarousel/TopSpiritualCarousel';
import Slider from './Slider/Slider';
import Filter from './Slider/F/Filter';




export const HomePage = ()=>{
const dispatch =  useDispatch();
useEffect(()=>{
dispatch(fetchLocation())
dispatch(fetchPlace());
dispatch(fetchCategories())
},[dispatch])

  return<>
    
    <CarouselContainer/>
    <DestinationBanner/>
    <Slider/>
    <TopSpiritualCarousel/>
    <Filter/>
    
    
    
   
   
  </>
}

