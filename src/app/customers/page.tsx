"use client";
import SectionTitle from "@/components/sectionTitle/section_title";
import Sidebar from "@/components/sidebar/sidebar";
import React, { useEffect, useState } from "react";
import { getFirestore, collection, getDocs, query } from "firebase/firestore";
import { app } from "@/app/config/firebase";

const Customers = () => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const customersRef = query(collection(getFirestore(app), "users"));

        const querySnapshot = await getDocs(customersRef);

        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setData(data);
      } catch (error) {
        console.error("Error fetching service providers: ", error);
      }
    };

    fetchCustomers();
  }, []);

  return (
    <main className="flex bg-bg-gray">
      <Sidebar />
      <section className="px-10 py-20 w-full">
        <SectionTitle title="Customer" />
        <article className="mt-5">
          <div className="grid grid-cols-4 text-center">
            <p className="border border-e-0 border-black py-2 font-semibold text-lg">
              Name
            </p>
            <p className="border border-e-0 border-black py-2 font-semibold text-lg">
              Address
            </p>
            <p className="border border-e-0 border-black py-2 font-semibold text-lg">
              Contact Number
            </p>
            <p className="border border-black py-2 font-semibold text-lg">
              Email Address
            </p>
          </div>
          {data.map((user) => (
            <div className="grid grid-cols-4 text-center" key={user.id}>
              <p className="border-s border-b border-black py-2">{user.name}</p>
              <p className="border-s border-b border-black py-2">
                {user.address}
              </p>
              <p className="border-s border-b border-black py-2">
                {user.phone_num}
              </p>
              <p className="border-s border-b border-e border-black py-2">
                {user.email_add}
              </p>
            </div>
          ))}
        </article>
      </section>
    </main>
  );
};

export default Customers;
