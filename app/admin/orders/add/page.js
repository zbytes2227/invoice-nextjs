"use client"
import Navbar from "@/components/Navbar";
import React, { useEffect, useState } from "react";
import { useSearchParams } from 'next/navigation'
import Select from 'react-select';


const Page = () => {


  const [rows, setRows] = useState([
    { productId: '', quantity: 1 },
  ]);

  const handleProductChange = (index, productId) => {
    const newRows = [...rows];
    newRows[index].productId = productId;
    setRows(newRows);
  };

  const handleQuantityChange = (index, quantity) => {
    const newRows = [...rows];
    newRows[index].quantity = quantity;
    setRows(newRows);
  };

  const handleAddRow = () => {
    setRows([...rows, { productId: '', quantity: 1 }]);
    console.log(rows);
  };


  const handleDeleteRow = (index) => {
    const newRows = [...rows];
    newRows.splice(index, 1);
    setRows(newRows);
  };




  const [CustomersList, setCustomersList] = useState([]);
  const [ProductList, setProductList] = useState([]);

  const [OrderID, setOrderID] = useState("")
  const [CustomerID, setCustomerID] = useState("")
  const [CustomerName, setCustomerName] = useState("")
  const [CustomerPhone, setCustomerPhone] = useState("")
  const [CustomerEmail, setCustomerEmail] = useState("")

  const [SalesChannel, setSalesChannel] = useState("")
  const [TrackingID, setTrackingID] = useState("")
  const [Address, setAddress] = useState("")

  const handleCustomerSelection = (event) => {
    const selectedValue = event.target.value;
    const [selectedCustomerID, selectedCustomerName, selectedCustomerPhone, selectedCustomerEmail] = selectedValue.split(" | ");
    // You can perform additional actions based on the selected customer
    console.log("Selected Customer ID:", selectedCustomerID);
    console.log("Selected Customer Name:", selectedCustomerName);

    setCustomerID(selectedCustomerID);
    setCustomerName(selectedCustomerName)
    setCustomerPhone(selectedCustomerPhone)
    setCustomerEmail(selectedCustomerEmail)

  };



  const [msg, setmsg] = useState("")


  useEffect(() => {
    // Fetch data from the API
    fetch("/api/getCustomer", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => response.json())
      .then((data) => {
        if (data.success) {
          console.log(data.customers);
          setCustomersList(data.customers)
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
  }, []);


  function save() {
    const postData =
    {
      OrderID: OrderID,
      CustomerID: CustomerID,
      Products: rows,
      SalesChannel: SalesChannel,
      Address: Address,
      TrackingID: TrackingID,
      Total: "Total"
    }
    console.log(postData);
    fetch("/api/addOrder", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData)
    }).then((response) => response.json())
      .then((data) => {
        setmsg(data.msg)
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


  return (
    <>
      <div className="mt-20">
        <h2 className="mb-5 text-2xl font-bold text-center">Add New Order</h2>
      </div>
      <div className="max-w-xl mx-auto border border-3 rounded-lg p-5">
        {!msg ? ("") : (
          <div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50" role="alert">
            {msg}
          </div>
        )}
        <div className="mb-5">
          <label htmlFor="id" className="block mb-2 text-sm font-medium text-gray-900">Order ID</label>
          <input value={OrderID} onChange={(e) => setOrderID(e.target.value)} type="text" id="id" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
        </div>
        <div className="mb-5">
          <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900">Select or type Customer ID</label>
          <input type="text" id="countries" onChange={handleCustomerSelection} list="country-list" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
          <datalist id="country-list">
            {CustomersList.map((customer) => (
              <option key={customer._id} value={`${customer.CustomerID} | ${customer.CustomerName} | ${customer.CustomerPhone} | ${customer.CustomerEmail}`} />
            ))}
          </datalist>
        </div>
        <div className="mb-5">
          <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Customer Name</label>
          <input disabled value={CustomerName} onChange={(e) => setCustomerName(e.target.value)} type="text" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-0" required />
        </div>
        <div className="mb-5">
          <label htmlFor="class" className="block mb-2 text-sm font-medium text-gray-900">Customer Email</label>
          <input value={CustomerEmail} onChange={(e) => setCustomerEmail(e.target.value)} type="text" id="class" disabled className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-0" placeholder="" required />
        </div>
        <div className="mb-5">
          <label htmlFor="Contact" className="block mb-2 text-sm font-medium text-gray-900">Customer Phone</label>
          <input value={CustomerPhone} onChange={(e) => setCustomerPhone(e.target.value)} id="Contact" disabled className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-0" placeholder="" required />
        </div>
        <div className="mb-5">
          <label htmlFor="sc" className="block mb-2 text-sm font-medium text-gray-900">Address</label>
          <input value={Address} onChange={(e) => setAddress(e.target.value)} id="sc" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-0" placeholder="" required />
        </div>
        <div className="mb-5">
          <label htmlFor="sc" className="block mb-2 text-sm font-medium text-gray-900">Sales Channel</label>
          <input value={SalesChannel} onChange={(e) => setSalesChannel(e.target.value)} id="sc" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-0" placeholder="" required />
        </div>
        <div className="mb-5">
          <label htmlFor="sc" className="block mb-2 text-sm font-medium text-gray-900">Tracking ID</label>
          <input value={TrackingID} onChange={(e) => setTrackingID(e.target.value)} id="sc" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-0" placeholder="" required />
        </div>


        <table className="min-w-full border-collapse mt-4">
          <thead>
            <tr>
              <th className="border py-2 px-4">Product</th>
              <th className="border py-2 px-4">Quantity</th>
              <th className="border py-2 px-4">Total</th>
              <th className="border py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={index}>
                <td className="border py-2 px-4">
                  <select value={row.productId} onChange={(e) => handleProductChange(index, e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                    <option value="" disabled>Select a product</option>
                    {ProductList.map((product) => (
                      <option key={product._id} value={product.ProductID}>{product.ProductID}{" "}|{" "}{product.ProductName}</option>
                    ))}
                  </select>
                </td>
                <td className="border py-2 px-4">
                  <input type="number" value={row.quantity} onChange={(e) => handleQuantityChange(index, e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                </td>
                <td className="border py-2 px-4">
                  <input type="text" value={row.quantity * ProductList.find((product) => product.ProductID === row.productId)?.ProductPrice || 0} disabled className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                </td>
                <td className="border py-2 px-4">
                  <button onClick={() => handleDeleteRow(index)} className="bg-red-500 text-white px-4 py-2 rounded">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex mt-1 justify-end w-full">
          <button onClick={handleAddRow} className="mt-4 bg-blue-500 text-white px-4 py-1 rounded">Add Row</button>
        </div>
        <div className="flex flex-col mt-5">
          {!msg ? ("") : (
            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-100" role="alert">
              {msg}
            </div>
          )}
          <button onClick={save} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center">
            Save New Order
          </button>
        </div>
      </div>
    </>
  );
};

export default Page;
