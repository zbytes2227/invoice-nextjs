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


    function addInvoice() {
        fetch("/api/addInvoice", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ OrderID: Product.OrderID }),
        }).then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    console.log(data);
                } else {
                    console.error("API request failed");
                }
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });

    }

    const getOrderDetails = () => {

        if (Product && Product.Products && Array.isArray(Product.Products)) {
            let subtotalAmount = 0; // Variable to accumulate the subtotal value
            const taxRate = 0.18; // 18% tax rate

            const orderDetails = Product.Products.map(order => {
                const productDetails = ProductList.find(product => product.ProductID === order.productId);

                if (productDetails) {
                    const total = productDetails.ProductPrice * parseInt(order.quantity);
                    subtotalAmount += total; // Accumulate the subtotal value

                    return (
                        <tr key={order.productId}>
                            <td className="border py-2 px-4">{productDetails.ProductID}</td>
                            <td className="border py-2 px-4">{productDetails.ProductName}</td>
                            <td className="border py-2 px-4">{order.quantity}</td>
                            <td className="border py-2 px-4">{total.toFixed(1)}</td> {/* Round to 1 decimal place */}
                        </tr>
                    );
                }

                return null;
            });

            const taxAmount = subtotalAmount * taxRate;
            const totalAmount = subtotalAmount + taxAmount;

            // Add a row for the subtotal
            orderDetails.push(
                <tr key="subtotal">
                    <td className="border py-2 px-4" colSpan="3">Subtotal</td>
                    <td className="border py-2 px-4">{subtotalAmount.toFixed(1)}</td> {/* Round to 1 decimal place */}
                </tr>
            );

            // Add a row for the tax
            orderDetails.push(
                <tr key="tax">
                    <td className="border py-2 px-4" colSpan="3">Tax (18%)</td>
                    <td className="border py-2 px-4">+{taxAmount.toFixed(2)}</td> {/* Round to 1 decimal place */}
                </tr>
            );

            // Add a row for the total at the end
            orderDetails.push(
                <tr key="total">
                    <td className="border py-2 px-4 font-bold" colSpan="3">Total</td>
                    <td className="border py-2 px-4 font-bold">{totalAmount.toFixed(1)}</td> {/* Round to 1 decimal place */}
                </tr>
            );

            return orderDetails;
        }

        return null; // Handle the case where the data is not in the expected format
    };



    const [printData, setPrintData] = useState({
        title: 'Printable Title',
        description: 'This is the content to be printed.',
    });

    const handlePrint = () => {
        addInvoice();
        const printableArea = document.getElementById('printableArea');

        if (printableArea) {
            const printWindow = window.open('', '_blank');
            printWindow.document.write('<html><head><title>Print</title> <script src="https://cdn.tailwindcss.com"></script></head><body>');
            printWindow.document.write('<div class="flex justify-center items-center mt-3"><button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onclick="window.print()">Print</button></div>');
            printWindow.document.write('<div style="margin: 20px;">');
            printWindow.document.write(printableArea.innerHTML);
            printWindow.document.write('</div></body></html>');
            printWindow.document.close();
        }
    };


    return (
        <>

            <div className="mt-20">
                <h2 className="mb-5 text-2xl font-bold text-center">
                    SHOW ORDER DETAILS : {Product.OrderID} <a onClick={handlePrint} href="" class="mx-3 relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white">
                        <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0">
                            Generate Invoice
                        </span>
                    </a>
                </h2>
            </div>
            <section id="printableArea">
                <div class="max-w-xl mx-auto border border-3 rounded-lg p-5">
                    {!msg ? ("") : (<div class="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50" role="alert">
                        {msg}
                    </div>)}
                    <h2 className="mb-5 text-2xl font-bold text-center">
                        Zbytes Invoice</h2>

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
                        <p className="mt-2">Date: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    </div>
                </div>
            </section>

        </>
    );
};

export default Page;
