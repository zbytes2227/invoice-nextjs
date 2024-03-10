"use client"
import Navbar from "@/components/Navbar";
import React, { useEffect, useState } from "react";
import { useSearchParams } from 'next/navigation'


const Page = () => {
    const searchParams = useSearchParams();
    const orderid = searchParams.get('id')
    const [msg, setmsg] = useState("")

    const [Product, setProduct] = useState("")
    const [Customer, setCustomer] = useState("")

    const [ProductList, setProductList] = useState([])

    const postData = {
        orderid: orderid,
        // Add other properties if needed
    };
    useEffect(() => {
        // Fetch data from the API
        fetch("/api/getOrder", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(postData),
        }).then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    console.log(data.Product);
                    setProduct(data.Product)
                } else {
                    console.error("API request failed");
                }
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []);


    useEffect(() => {
        fetch("/api/getCustomer", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ customerid: Product.CustomerID }),
        }).then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    console.log(data);
                    setCustomer(data.customer)
                } else {
                    console.error("API request failed");
                }
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });



            fetch("/api/getProduct", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }).then((response) => response.json())
                .then((data) => {
                    if (data.success) {
                        console.log(data.products);
                        setProductList(data.products);
                    } else {
                        console.error("API request failed");
                    }
                })
                .catch((error) => {
                    console.error("Error fetching data:", error);
                });
    }, [Product])

  

    const getOrderDetails = () => {
        if (Product && Product.Products && Array.isArray(Product.Products)) {
          return Product.Products.map(order => {
            const productDetails = ProductList.find(product => product.ProductID === order.productId);
      
            if (productDetails) {
              const total = productDetails.ProductPrice * parseInt(order.quantity);
      
              return (
                <tr key={order.productId}>
                  <td className="border py-2 px-4">{productDetails.ProductID}</td>
                  <td className="border py-2 px-4">{productDetails.ProductName}</td>
                  <td className="border py-2 px-4">{order.quantity}</td>
                  <td className="border py-2 px-4">{total}</td>
                </tr>
              );
            }
      
            return null;
          });
        }
      
        return null; // Handle the case where the data is not in the expected format
      };
      

    return (
        <>
            <div className="mt-20">
                <h2 className="mb-5 text-2xl font-bold text-center">
                    SHOW ORDER DETAILS : ID
                </h2>
            </div>
            <div class="max-w-xl mx-auto border border-3 rounded-lg p-5">
                {!msg ? ("") : (<div class="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50" role="alert">
                    {msg}
                </div>)}


                <h2 class="mb-2 text-lg font-semibold text-gray-900 ">Order Details</h2>
                <ul class="max-w-xl space-y-1 text-gray-500 list-disc list-inside ">
                    <li className="text-lg font-bold">
                        ORDER ID : {Product.OrderID}
                    </li>
                    <li className="text-lg font-bold">
                        Customer Name : {Customer.CustomerName}
                    </li>
                    <li className="text-lg font-bold">
                        Customer Phone : {Customer.CustomerPhone}
                    </li>
                    <li className="text-lg font-bold">
                        Customer Email : {Customer.CustomerEmail}
                    </li>
                    <li className="text-lg font-bold">
                        Address : {Product.Address}
                    </li>
                    <li className="text-lg font-bold">
                        Tracking ID : {Product.TrackingID}
                    </li>
                    <li className="text-lg font-bold">
                        Sales Channel : {Product.SalesChannel}
                    </li>
                </ul>



                <div>
      <h2 className="mb-2 text-lg font-semibold text-gray-900 mt-8">Products Details</h2>
      <table className="min-w-full border-collapse">
        <thead>
          <tr>
            <th className="border py-2 px-4">Product ID</th>
            <th className="border py-2 px-4">Product Name</th>
            <th className="border py-2 px-4">Quantity</th>
            <th className="border py-2 px-4">Price</th>
          </tr>
        </thead>
        <tbody>
          {getOrderDetails()}
        </tbody>
      </table>
    </div>
            </div>

        </>
    );
};

export default Page;
