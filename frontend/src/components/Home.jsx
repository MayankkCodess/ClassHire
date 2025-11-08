import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import HeroSection from './HeroSection'
import CategoryCarousel from './CategoryCarousel'
import LatestJobs from './LatestJobs'
import Footer from './shared/Footer'
import useGetAllJobs from '../hooks/useGetAllJobs.jsx'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
const Home = () => {
  useGetAllJobs();
  //Admin Redirect to different from home page
  const {user} = useSelector(store=>store.auth);
  const navigate = useNavigate();
  useEffect(()=>{
    if(user?.role ==='recruiter'){
      navigate("/admin/companies");
    }
  },[]);

  return (
    <div>
      <Navbar/>
      <HeroSection/>
      <CategoryCarousel />
      <LatestJobs/>
      <Footer/>
    </div>
  )
}

export default Home
