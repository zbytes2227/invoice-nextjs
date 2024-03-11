import Products from "@/model/Products";
import connectDb from "../../middleware/mongoose";
import Invoices from "@/model/Invoices";
import Orders from "@/model/Orders";
import Tracking from "@/model/Tracking";


const handler = async (req, res) => {
    if (req.method == "POST") {
        try {
            console.log(req.body);

            const existingCard = await Tracking.findOne({ TrackingID: req.body.TrackingID });
            const checkCustomer = await Orders.findOne({ OrderID: req.body.OrderID });

            if (existingCard) {
                // If cardID already exists, return an error response
                return res.status(400).json({ success: false, msg: "Tracking ID already exists." });
            }

            const newCard = new Tracking({
                TrackingID: req.body.TrackingID,
                TrackingCost: req.body.cost,
                trackingUrl: req.body.trackingUrl,
                TrackingStatus: req.body.TrackingStatus,
                TrackingCourier: req.body.courierName,
                OrderID: req.body.OrderID
            });

            await newCard.save();
            console.log("okay");
            return res.status(200).json({ success: true, msg: "Tracking Added Successfuly.." });
        } catch (err) {
            console.error(err);
            res
                .status(500)
                .json({ success: false, msg: "Server error..Contact the Developers." });
        }
    } else if (req.method === "GET") {
        try {
            // Find all cards in the database
            const allCards = await Tracking.find({});

            // Return the found cards as a JSON response
            return res.status(200).json({ success: true, trackings: allCards });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ success: false, msg: "Server error. Contact the Developers." });
        }
    }

};

export default connectDb(handler);