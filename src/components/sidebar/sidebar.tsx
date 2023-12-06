"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import { FaPowerOff } from "react-icons/fa";

const Sidebar = () => {
  const { logout, active, setActive } = useAuth();
  const router = useRouter();
  const handleClick = () => {
    try {
      logout();

      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="bg-sidebar-1 h-screen">
      <div className="h-full flex flex-col">
        <div>
          {/* Logo */}
          <div className="flex items-center bg-sidebar-2 p-4">
            <div className="h-16 w-16 relative me-2">
              <Image
                src="/lighterLogo.png"
                alt="Image Logo of athome-convenience"
                className="object-contain h-full w-full"
                fill
              />
            </div>
            <div className="font-bold">
              <h3 className="text-3xl text-athome-blue tracking-wider">
                At-Home
              </h3>
              <h3 className="text-2xl text-athome-orange tracking-wider">
                Convenience
              </h3>
            </div>
          </div>

          {/* Welcome */}
          <div className="text-center mx-auto break-words w-1/2 py-5 text-2xl text-white font-light tracking-wider">
            <p>
              Welcome, <span className="font-semibold ">Admin</span>
            </p>
          </div>

          {/* divider */}
          <div className="px-4">
            <div className="h-[1px] bg-white w-full"></div>
          </div>
        </div>

        {/* Nav Link */}
        <div className="py-4 flex flex-col justify-between text-white text-center grow text-xl tracking-wider">
          <ul>
            <li
              className={`${
                active === "serviceProviders" ? "bg-filter-dark" : ""
              } py-2`}
            >
              <Link
                href="/serviceProviders"
                onClick={() => {
                  setActive("serviceProviders");
                }}
              >
                <p>Service Providers</p>
              </Link>
            </li>
            <li
              className={`${
                active === "customers" ? "bg-filter-dark" : ""
              } py-2`}
            >
              <Link
                href="/customers"
                onClick={() => {
                  setActive("customers");
                }}
              >
                <p>Customers</p>
              </Link>
            </li>
            <li
              className={`${active === "reports" ? "bg-filter-dark" : ""} py-2`}
            >
              <Link
                href="/reports"
                onClick={() => {
                  setActive("reports");
                }}
              >
                <p>Users Report</p>
              </Link>
            </li>
          </ul>
          <button
            className="flex justify-center items-center"
            onClick={handleClick}
          >
            <FaPowerOff className="me-4" />
            <span className="tracking-wider">Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
