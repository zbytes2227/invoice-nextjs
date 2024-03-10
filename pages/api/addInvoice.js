
import Customers from "@/model/Customers";
import connectDb from "../../middleware/mongoose";
import Orders from "@/model/Orders";
import Invoices from "@/model/Invoices";


const handler = async (req, res) => {

  if (req.method == "POST") {
    try {
      console.log(req.body);

      const existingCard = await Orders.findOne({ OrderID: req.body.OrderID });
    
    
      if (!existingCard) {
        // If cardID already exists, return an error response
        return res.status(400).json({ success: false, msg: "Order ID Not found" });
      }

      const generateRandomID = () => {
        // Generate a random 8-character alphanumeric string as the ID
        return Math.random().toString(36).substring(2, 10);
      };

      let isUnique = false;
      let randomID;
    
      // Keep generating new random IDs until a unique one is found
      while (!isUnique) {
        randomID = generateRandomID();
    
        // Check if the generated ID already exists in the database
        const existingInvoice = await Invoices.findOne({ InvoiceID: randomID });
    
        // If no existing invoice found, mark it as unique
        if (!existingInvoice) {
          isUnique = true;
        }
      }
    
      // Now, use the unique random ID to create the new invoice
      const newCard = new Invoices({
        InvoiceID: randomID,
        OrderID: req.body.OrderID,
        CustomerID: existingCard.CustomerID,
        Products: existingCard.Products,
        SalesChannel: existingCard.SalesChannel,
        Address: existingCard.Address,
        TrackingID: existingCard.TrackingID,
      });
    
      // Save the new invoice to the database
      await newCard.save();

      await newCard.save();
      console.log("okay");
      return res.status(200).json({ success: true, msg: "Order Added Successfuly.." });
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json({ success: false, msg: "Server error..Contact the Developers." });
    }
  }
};

export default connectDb(handler);