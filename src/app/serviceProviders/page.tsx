"use client";

import SectionTitle from "@/components/sectionTitle/section_title";
import Sidebar from "@/components/sidebar/sidebar";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  getFirestore,
  collection,
  getDocs,
  where,
  query,
} from "firebase/firestore";
import { app, db } from "@/app/config/firebase";

const ServiceProviders = () => {
  const [activeStatus, setActiveStatus] = useState<string>("Pending");
  const [serviceProviders, setServiceProviders] = useState<any[]>([]);

  useEffect(() => {
    const fetchServiceProviders = async () => {
      try {
        const serviceProvidersRef = query(
          collection(db, "service_provider"), //getFireStore(app)
          where("status", "==", activeStatus)
        );

        const querySnapshot = await getDocs(serviceProvidersRef);

        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setServiceProviders(data);
      } catch (error) {
        console.error("Error fetching service providers: ", error);
      }
    };

    fetchServiceProviders();
  }, [activeStatus]);

  return (
    <>
      <main className="flex bg-bg-gray w-screen">
        <Sidebar />
        <section className="px-10 py-20 w-full">
          <SectionTitle title="Service Providers" />
          <article className="mt-5">
            {/* status category */}
            <div className="flex">
              <button
                className={`${
                  activeStatus === "Pending"
                    ? "border-b-2 border-athome-blue text-athome-blue"
                    : ""
                } transition-all`}
                onClick={() => {
                  setActiveStatus("Pending");
                }}
              >
                Pending
              </button>
              <div className="w-[2px] bg-black mx-4"></div>
              <button
                className={`${
                  activeStatus === "Accepted"
                    ? "border-b-2 border-athome-blue text-athome-blue"
                    : ""
                } transition-all`}
                onClick={() => {
                  setActiveStatus("Accepted");
                }}
              >
                Accepted
              </button>
              <div className="w-[1px] bg-black mx-4"></div>
              <button
                className={`${
                  activeStatus === "Rejected"
                    ? "border-b-2 border-athome-blue text-athome-blue"
                    : ""
                } transition-all`}
                onClick={() => {
                  setActiveStatus("Rejected");
                }}
              >
                Rejected
              </button>
            </div>

            {/* table list */}
            <div className="mt-5 text-center">
              <div
                className={`grid  ${
                  activeStatus != "Pending" ? "grid-cols-3" : "grid-cols-4"
                }`}
              >
                <h3 className="border border-e-0 border-black py-2">Name</h3>
                <h3 className="border border-e-0 border-black py-2">Address</h3>
                <h3
                  className={`border  ${
                    activeStatus != "Pending" ? "" : "border-e-0"
                  } border-black py-2`}
                >
                  Contact Number
                </h3>
                <h3
                  className={`border border-black py-2 ${
                    activeStatus != "Pending" ? "hidden" : ""
                  }`}
                >
                  Action
                </h3>
              </div>

              {serviceProviders.map((provider) => (
                <div
                  className={`grid ${
                    activeStatus != "Pending" ? "grid-cols-3" : "grid-cols-4"
                  } `}
                  key={provider.id}
                >
                  <p className="border-s border-b border-black py-2">
                    {provider.service_provider_name}
                  </p>
                  <p className="border-s border-b border-black py-2">
                    {provider.service_address != ""
                      ? provider.service_address
                      : "N/A"}
                  </p>
                  <p
                    className={`border-s border-b border-black py-2 ${
                      activeStatus != "Pending" ? "border-e" : ""
                    }`}
                  >
                    {provider.contact_num}
                  </p>
                  <p
                    className={`border-s border-b border-e border-black py-2 ${
                      activeStatus != "Pending" ? "hidden" : ""
                    }`}
                  >
                    <Link
                      className="bg-athome-blue px-6 py-1 rounded-full text-white uppercase tracking-wider font-semibold "
                      href={{
                        pathname: "/serviceProviderDetail",
                        query: {
                          id: provider.id,
                        },
                      }}
                    >
                      View
                    </Link>
                  </p>
                </div>
              ))}

              {serviceProviders.length == 0 ? (
                <h3 className="mt-5">No data</h3>
              ) : (
                ""
              )}
            </div>
          </article>
        </section>
      </main>
    </>
  );
};

export default ServiceProviders;
