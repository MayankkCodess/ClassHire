import React, { useEffect } from "react";
import Navbar from "../../../components/shared/Navbar";
import HeroSection from "../components/HeroSection";
import CategoryCarousel from "../components/CategoryCarousel";
import LatestJobs from "../components/LatestJobs";
import Footer from "../../../components/shared/Footer";
import useGetAllJobs from "../../../hooks/useGetAllJobs.jsx";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Home = () => {
  //because it is a parent component and can pass jobs to its child component
  useGetAllJobs();
  //Admin Redirect to different from home page , that means agar role recrutier hai toh diff & student hai toh diff.
  const { user } = useSelector((store) => store.auth);

  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role === "recruiter") {
      navigate("/admin/companies");
    }
  }, []);

  return (
    <div>
      <Navbar />
      <HeroSection />
      <CategoryCarousel />
      <LatestJobs />
      <Footer />
    </div>
  );
};

export default Home;
