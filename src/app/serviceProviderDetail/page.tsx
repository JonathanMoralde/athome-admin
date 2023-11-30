"use client";
import React, { useEffect, useState } from "react";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  getDoc,
  setDoc,
  where,
  query,
  updateDoc,
  doc,
} from "firebase/firestore";
import { app } from "@/app/config/firebase";
import Sidebar from "@/components/sidebar/sidebar";
import SectionTitle from "@/components/sectionTitle/section_title";
import Image from "next/image";
import Link from "next/link";

const ServiceProviderDetail = ({
  searchParams,
}: {
  searchParams: {
    id: string;
  };
}) => {
  const [data, setData] = useState<any>(null);
  const [userData, setUserData] = useState<any>(null);

  const fetchData = async () => {
    try {
      const spDataRef = query(
        collection(getFirestore(app), "service_provider"),
        where("uid", "==", searchParams.id)
      );

      const querySnapshot = await getDocs(spDataRef);
      const docsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Assuming there's only one document for the given ID
      const singleDocData = docsData.length > 0 ? docsData[0] : null;
      setData(singleDocData);
    } catch (error) {
      console.error("Error fetching service provider: ", error);
    }
  };
  const fetchUserData = async () => {
    try {
      const spDataRef = query(
        collection(getFirestore(app), "users"),
        where("uid", "==", searchParams.id)
      );

      const querySnapshot = await getDocs(spDataRef);
      const docsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Assuming there's only one document for the given ID
      const singleDocData = docsData.length > 0 ? docsData[0] : null;
      setUserData(singleDocData);
    } catch (error) {
      console.error("Error fetching user: ", error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchUserData();
  }, [searchParams.id]);

  const handleClick = async (action: string) => {
    console.log("clicked");
    const docId: string = searchParams.id;
    const status: string = action == "Accept" ? "Accepted" : "Rejected";

    try {
      const documentRef = doc(getFirestore(app), "service_provider", docId);

      console.log("updating");

      await updateDoc(documentRef, {
        status: status,
      }).then((response) => {
        console.log(response);
      });
      fetchData();
      fetchUserData();
    } catch (error) {
      console.log(`error updating status: ${error}`);
    }
  };

  console.log(data);

  return (
    <main className="flex bg-bg-gray">
      <Sidebar />
      <section className="px-10 py-20 w-full">
        <div className="flex justify-between">
          <SectionTitle
            title={data == null ? "Loading" : data.service_provider_name}
          />

          {data != null && data.status == "Pending" ? (
            <div className="flex">
              <button
                className="hover:opacity-80 transition-all py-1 px-10 rounded-full me-5 text-white uppercase tracking-wider text-xl font-semibold bg-athome-orange"
                onClick={() => {
                  handleClick("Reject");
                }}
              >
                Reject
              </button>
              <button
                className="hover:opacity-80 transition-all py-1 px-10 rounded-full text-white uppercase tracking-wider text-xl font-semibold bg-athome-blue"
                onClick={() => {
                  handleClick("Accept");
                }}
              >
                Accept
              </button>
            </div>
          ) : (
            ""
          )}
        </div>

        <article className="flex justify-between mt-10">
          <div className="w-full">
            <div className="flex items-center">
              <h5 className="me-3">Service Provider Details</h5>

              <div className="h-[1px] grow bg-gray-500"></div>
            </div>
            <div className="flex px-10 py-5 text-xl">
              <div className="text-end me-3 font-semibold">
                <p>Name:</p>
                <p>Contact Number:</p>
                <p>Location:</p>
              </div>
              {data == null ? (
                <div>
                  <p>Loading...</p>
                  <p>Loading...</p>
                  <p>Loading...</p>
                </div>
              ) : (
                <div>
                  <p>{data.service_provider_name}</p>
                  <p>{data.contact_num}</p>
                  <p>{data.service_address}</p>
                </div>
              )}
            </div>

            <div className="flex items-center">
              <h5 className="me-3">User Details</h5>

              <div className="h-[1px] grow bg-gray-500"></div>
            </div>
            <div className="flex px-10 py-5 text-xl">
              <div className="text-end me-3 font-semibold">
                <p>Full Name:</p>
                <p>Contact Number:</p>
                <p>Address:</p>
                <p>Email Address:</p>
              </div>
              {userData == null ? (
                <div>
                  <p>Loading...</p>
                  <p>Loading...</p>
                  <p>Loading...</p>
                  <p>Loading...</p>
                </div>
              ) : (
                <div>
                  <p>{userData.name}</p>
                  <p>{userData.phone_num}</p>
                  <p>{userData.address}</p>
                  <p>{userData.email_add}</p>
                </div>
              )}
            </div>
          </div>

          {/* IMAGE */}
          <div className=" ms-4">
            <h5 className="mb-3">Uploaded Photo:</h5>
            <div className="h-96 w-96 relative">
              {data != null ? (
                <Link
                  target="_blank"
                  href={{
                    pathname: "/imageView",
                    query: {
                      imageUrl: data.uploaded_doc,
                    },
                  }}
                >
                  <Image
                    src={data.uploaded_doc}
                    alt="uploaded image"
                    className="object-contain h-full w-full"
                    fill
                  />
                </Link>
              ) : (
                ""
              )}
            </div>
          </div>
        </article>
      </section>
    </main>
  );
};

export default ServiceProviderDetail;
