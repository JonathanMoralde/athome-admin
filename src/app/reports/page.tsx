"use client";
import SectionTitle from "@/components/sectionTitle/section_title";
import Sidebar from "@/components/sidebar/sidebar";
import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJs,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import {
  getFirestore,
  collection,
  getDocs,
  where,
  query,
  updateDoc,
  doc,
} from "firebase/firestore";
import { app, db } from "@/app/config/firebase";
import DropDownBtn from "@/components/dropdownBtn/dropdown_btn";
import TwoOptionRadio from "@/components/radio/radio";
import { FaPlus, FaMinus, FaUser, FaUsers } from "react-icons/fa";

ChartJs.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Reports = () => {
  const [chartData, setChartData] = useState<any>({
    datasets: [],
  });
  const [chartOptions, setChartOptions] = useState<any>({});

  const [totalSP, setTotalSP] = useState<number>(0);
  const [totalCustomer, setTotalCustomer] = useState<number>(0);

  const [spNumber, setSpNumber] = useState<number>(0);
  const [customerNum, setCustomerNum] = useState<number>(0);
  const [filterMode, setFilterMode] = useState<string>("month");

  const [year, setYear] = useState<number>(2023);

  let currentDate = new Date();
  let monthToday = currentDate.getMonth();
  let monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const [month, setMonth] = useState<number>(monthToday);
  const [selectedMonth, setSelectedMonth] = useState<string>(
    monthNames[monthToday]
  );
  const [isOpen, setIsOpen] = useState<boolean>(false);

  //   FETCH CHART DATA
  useEffect(() => {
    const fetchSnapshotsByMonth = async () => {
      const startDate = new Date(year, filterMode === "month" ? month : 0, 1);
      const endDate = new Date(
        year,
        filterMode === "month" ? month + 1 : 11,
        filterMode === "month" ? 0 : 31
      );
      console.log(`start date: ${startDate}`);
      console.log(`end date: ${endDate}`);

      try {
        const spDataRef = query(
          collection(db, "service_provider"),
          where("timestamp", ">=", startDate),
          where("timestamp", "<=", endDate)
        );

        const spQuerySnapshot = await getDocs(spDataRef);
        const spDocsData = spQuerySnapshot.docs;

        const customerDataRef = query(
          collection(db, "users"),
          where("timestamp", ">=", startDate),
          where("timestamp", "<=", endDate)
        );

        const customerQuerySnapshot = await getDocs(customerDataRef);
        const customerDocsData = customerQuerySnapshot.docs;

        // const SPQuerySnapshot = await getDocs(SPQ);
        // const customerQuerySnapshot = await getDocs(CustomerQ);

        console.log(`Number of SP: ${spDocsData.length}`);
        setSpNumber(spDocsData.length);
        console.log(`Number of Customer: ${customerDocsData.length}`);
        setCustomerNum(customerDocsData.length);
      } catch (error) {
        console.error("Error fetching snapshots:", error);
      }
    };

    fetchSnapshotsByMonth();
  }, [month, year, filterMode]);

  //   SETTING CHART DATA
  useEffect(() => {
    setChartData({
      labels: [
        `${filterMode === "month" ? `${selectedMonth} - ${year}` : year} `,
      ],
      datasets: [
        {
          label: "Service Provider",
          data: [spNumber],
          borderColor: "rgb(53, 162, 235)",
          backgroundColor: "rgb(53,162,235, 0.4)",
        },
        {
          label: "Customer",
          data: [customerNum],
          borderColor: "rgb(53, 162, 75)",
          backgroundColor: "rgb(53,162,75, 0.4)",
        },
      ],
    });

    setChartOptions({
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "NUMBER OF REGISTRATIONS",
        },
      },
      maintainAspectRatio: false,
      response: true,
    });
  }, [spNumber, customerNum, selectedMonth, year, filterMode]);

  //  FETCHING TOTAL SP AND CUSTOMER
  useEffect(() => {
    const fetchTotalSP = async () => {
      try {
        const spDataRef = query(collection(db, "service_provider"));

        const querySnapshot = await getDocs(spDataRef);
        const docsData = querySnapshot.docs;

        setTotalSP(docsData.length);
      } catch (error) {
        console.error("Error fetching service provider: ", error);
      }
    };
    const fetchTotalCustomer = async () => {
      try {
        const spDataRef = query(collection(db, "users"));

        const querySnapshot = await getDocs(spDataRef);
        const docsData = querySnapshot.docs;

        setTotalCustomer(docsData.length);
      } catch (error) {
        console.error("Error fetching service provider: ", error);
      }
    };

    fetchTotalSP();
    fetchTotalCustomer();
  }, []);

  console.log(month);
  console.log(year);

  return (
    <>
      <main className="flex bg-bg-gray w-screen">
        <Sidebar />
        <section className="px-10 pt-20 w-full overflow-hidden">
          <SectionTitle title="Users Report" />
          <article>
            <div className="w-1/2 grid lg:grid-cols-2 mb-5 mt-5">
              {/* Num of SP */}
              <div className="bg-white border px-4 py-2 flex items-center justify-between me-4">
                <div>
                  <p className="text-sm">Total Serivce Provider:</p>
                  <h3 className="text-3xl font-semibold">{totalSP}</h3>
                </div>
                <div className="h-12 w-12 rounded-full bg-blue-100 grid place-items-center text-xl text-blue-800">
                  <FaUsers />
                </div>
              </div>

              {/* Num of User */}
              <div className="bg-white border px-4 py-2 flex items-center justify-between">
                <div>
                  <p className="text-sm">Total Customer:</p>
                  <h3 className="text-3xl font-semibold">{totalCustomer}</h3>
                </div>
                <div className="h-12 w-12 rounded-full bg-blue-100 grid place-items-center text-xl text-blue-800">
                  <FaUser />
                </div>
              </div>

              {/*  */}
            </div>

            {/* Filter options */}
            <div className="flex justify-between items-center mb-2">
              <TwoOptionRadio
                selectedOption={filterMode}
                onChange={(e) => {
                  setFilterMode(e.target.value);
                }}
              />
              <div className="flex items-center">
                {filterMode === "month" ? (
                  <DropDownBtn
                    isOpen={isOpen}
                    selectedOption={selectedMonth}
                    onClick={(e) => {
                      setMonth(parseInt(e.currentTarget.value));
                      setSelectedMonth(e.currentTarget.textContent!);
                      setIsOpen(!isOpen);
                    }}
                    toggleDropdown={() => {
                      setIsOpen(!isOpen);
                    }}
                  />
                ) : (
                  ""
                )}

                <div className="flex items-center bg-white border px-4 py-[6px] rounded-md">
                  <button
                    className="me-4"
                    onClick={() => {
                      setYear(year - 1);
                    }}
                  >
                    <FaMinus />
                  </button>
                  <p className="me-4">{year}</p>
                  <button
                    onClick={() => {
                      setYear(year + 1);
                    }}
                  >
                    <FaPlus />
                  </button>
                </div>
              </div>
            </div>

            {/* BAR */}
            <div className="w-full md:col-span-2 relative lg:h-[55vh] h-[30vh] m-auto p-4 border bg-white">
              <Bar data={chartData} options={chartOptions} />
            </div>
          </article>
        </section>
      </main>
    </>
  );
};

export default Reports;
