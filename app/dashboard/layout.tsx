"use client";
import Navigation from "@/components/Navigation";
import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="w-full h-screen flex">
            <Navigation />
            <main className="flex-1 p-10 ml-20">
                {children}
            </main>
            {/* ToastContainer for global notifications */}
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
        </div>
    );
};

export default DashboardLayout;
