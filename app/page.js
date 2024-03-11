
"use client"
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [Dashboard, setDashboard] = useState('');
  const [msg, setmsg] = useState("")
  useEffect(() => {
    
  

    fetch("/api/dashboard", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => response.json())
      .then((data) => {
        setmsg(data.msg)
        if (data.success) {
          console.log(data);
          setDashboard(data);
        } else {
          console.error("API request failed");
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [])
  
  return (
    <>
      <div class="p-4 mx-auto container mt-20 text-center">
        <h1 class="mb-4 text-3xl font-extrabold text-gray-900 md:text-5xl lg:text-6xl">
          <span class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
            #Smart Invoice
          </span>{" "}
          System
        </h1>
        <p class="text-lg font-normal text-gray-500 lg:text-xl">
          Infinite Horizons, One Digital Nation: Charting the Course for Digital
          PP
        </p>
        <div className="mt-10  flex justify-center items-center">
          {/* <Image height={500} width={500} alt=";lknjb" className=" shadow shadow-xl rounded-lg" src={"/images/image.jpeg"} /> */}
        </div>
      </div>


      <div className="mx-auto border container flex justify-between text-center p-5 max-w-max">

        <a href="#" class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 mx-2">
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">Total Customers</h5>
          <p class="font-extrabold text-3xl text-gray-700 ">{Dashboard.Customers}</p>
        </a>

        <a href="#" class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 mx-2">
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">Total Invoices</h5>
          <p class="font-extrabold text-3xl text-gray-700 ">{Dashboard.Invoices}</p>
        </a>

        <a href="#" class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 mx-2">
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">Total Products</h5>
          <p class="font-extrabold text-3xl text-gray-700 ">{Dashboard.Products}</p>
        </a>

        <a href="#" class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 mx-2">
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">Total Orders</h5>
          <p class="font-extrabold text-3xl text-gray-700 ">{Dashboard.Orders}</p>
        </a>
      </div>
    </>
  );
}
