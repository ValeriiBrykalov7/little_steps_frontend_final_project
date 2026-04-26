'use client'
import { useWeekStore } from "@/lib/store/weekStore";
import { useAuthStore } from "@/lib/store/authStore";
import { useEffect } from "react";
import GreetingBlock from "@/components/GreetingBlock/GreetingBlock";
import StatusBlock from "@/components/StatusBlock/StatusBlock";

export default function DashboardPage(){
    const {dashboardData, isLoading, fetchDashboard}=useWeekStore();
    const {isAuthenticated}=useAuthStore();

    useEffect(()=>{
        fetchDashboard(isAuthenticated)
    },[isAuthenticated, fetchDashboard])
    
    if (isLoading) return <div>Loading...</div>;
    if (!dashboardData) return <div>No data found.</div>;
    return (
      <>
        <GreetingBlock/>
        <StatusBlock/>
      </>
    )
  }
