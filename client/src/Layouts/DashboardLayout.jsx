import { Outlet } from "react-router";
import Footer from "../default/Footer";
import Header from "../default/Header";
import DashboardSidebar from "../pages/Dashboard/DashboardSidebar";
import { useState } from "react";
import { VscGear } from "react-icons/vsc";
import { FaHandPointLeft } from "react-icons/fa6";
import { ReTitle } from 're-title';

export default function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <>
      <ReTitle title="Dashboard || Holy Care Pharmacy"></ReTitle>
      <Header></Header>
      <div className="container min-h-[calc(100vh-365px)]">
        <div className="flex gap-5 min-h-[calc(100vh-365px)]">
          <div className={`w-80 min-h-[calc(100vh-80px)] lg:min-h-auto lg:max-w-xs lg:w-full bg-gray-100 py-10 fixed lg:relative top-20 lg:top-0 left-0 lg:left-0 z-10 duration-300 ease-in-out ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
            <DashboardSidebar></DashboardSidebar>
          </div>
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className={`lg:hidden w-16 h-16 p-4 bg-gray-200 text-primary flex items-center justify-center cursor-pointer rounded-r-md rounded-br-md fixed top-40  z-20 duration-300 ease-in-out ${isSidebarOpen ? "left-80": "left-0"  }`}>
            {
              isSidebarOpen ? <FaHandPointLeft className="text-2xl"></FaHandPointLeft> : <VscGear className="text-2xl"></VscGear>
            }
          </button>
          <div className="w-full lg:w-[calc(100%-320px)] py-10 bg-gray-100 px-5">
            <Outlet></Outlet>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  )
}
