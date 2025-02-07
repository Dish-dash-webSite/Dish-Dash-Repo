import React from 'react';
import MetricCard from "./MetricCard";
import { FaBox, FaDollarSign, FaClipboardList, FaCheckCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import image1 from '../../../assets/deleveray image.jpg';
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchDashboardData } from "../../../store/dashboardSlice"

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDashboardData());
  }, [dispatch]);

  
  const balance = useSelector((state) => state.dashboard.balance);
  const delivered = useSelector((state) => state.dashboard.delivered);
  const available = useSelector((state) => state.dashboard.available);
  

  return (
    <main className="flex flex-col items-center justify-center gap-8 pt-40 p-4">
      {/* Existing MetricCard components */}
      <div className="flex flex-row flex-wrap justify-center gap-4">
        <MetricCard title="Orders Delivered" value={delivered} icon={<FaBox className="text-[#FC8A06] text-3xl mb-4" />} />
        <MetricCard title="Money Made" value={`$${balance}`} icon={<FaDollarSign className="text-[#FC8A06] text-3xl mb-4" />} />
        <MetricCard title="Orders available" value={available} icon={<FaClipboardList className="text-[#FC8A06] text-3xl mb-4" />} />
        <MetricCard title="Tasks Completed" value={89} icon={<FaCheckCircle className="text-[#FC8A06] text-3xl mb-4" />} />
      </div>

      {/* New Creative Block/Blog Component */}
      <div className="relative w-full max-w-4xl h-96 bg-[#03081F] rounded-3xl overflow-hidden shadow-2xl flex items-center justify-center">
        {/* Colorful Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#FC8A06] to-[#028643] opacity-30"></div>

        {/* Creative Design Elements */}
        <div className="absolute w-40 h-40 bg-[#FC8A06] rounded-full -top-20 -left-20 opacity-20"></div>
        <div className="absolute w-60 h-60 bg-[#028643] rounded-full -bottom-20 -right-20 opacity-20"></div>
        <div className="absolute w-24 h-24 bg-[#FC8A06] rounded-full top-1/4 left-1/4 opacity-30"></div>
        <div className="absolute w-32 h-32 bg-[#028643] rounded-full bottom-1/4 right-1/4 opacity-30"></div>

        {/* Centered Button */}
        <button className="relative z-10 px-8 py-4 bg-[#FC8A06] text-white text-xl font-semibold rounded-full hover:bg-[#028643] transition-colors duration-300 shadow-lg"
        onClick={() => navigate('/delivery/workSpace')}>
          Start Working
        </button>
      </div>
      <div className="mt-auto w-full">
        <img 
          src={image1} 
          alt="delivery image" 
          className="w-full h-auto object-cover rounded-t-3xl shadow-2xl" 
        />
      </div>
    </main>
  );
};

export default HomePage;