const mongoose = require("mongoose");
// mongoose.set('strictQuery', true);

const OrderSchema = new mongoose.Schema(
  {
    OrderID: { type: String, required: true, unique: true },
    CustomerID: { type: String },
    Products: { type: Array },
    SalesChannel: { type: String },
    Address: { type: String },
    TrackingID: { type: String },
    Total: { type: String },
  },
  { collection: "all-Orders" },
  { timestamps: true }
);

mongoose.models = {};
const Orders = mongoose.model("Orders", OrderSchema);
module.exports = Orders;