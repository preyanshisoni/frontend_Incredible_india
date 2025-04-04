import React, { useEffect } from 'react'


import { Navbar } from '@/User/Navbar';
import { CarouselContainer } from '@/User/CarouselContainer';
import { DestinationBanner } from '@/User/Header/DestinationBanner';
import Footer from '../User/Footer/Footer';
import { useDispatch } from 'react-redux';
import { fetchCategories } from '@/redux/slice/categorySlice';
import { fetchPlace } from '@/redux/slice/PlaceSlice';
import TopSpiritualCarousel from '@/User/TopSpiritualCarousel/TopSpiritualCarousel';
import Slider from '@/User/Slider/Slider';
import { fetchLocation } from '@/redux/slice/locationSlice';

const HomePage = ()=>{
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





  </>
}


export default HomePage;