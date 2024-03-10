import Cards from "@/model/Cards";
import connectDb from "../../middleware/mongoose";
import Products from "@/model/Products";

const handler = async (req, res) => {
    if (req.method === "POST") {
        try {
            console.log("req.body");
            console.log(req.body);
            // Check if the request body contains the required fields
            if (!req.body.ProductID || !req.body.ProductName || !req.body.ProductPrice || !req.body.ProductStock) {
                return res.status(400).json({ success: false, msg: "Missing required fields in the request body." });
            }

            const { ProductID, ProductName, ProductPrice, ProductStock } = req.body;

            const forbiddenSymbols = /[^a-zA-Z0-9\s\-()]/;

            if (forbiddenSymbols.test(ProductName) || forbiddenSymbols.test(ProductPrice)) {
                return res.status(400).json({ success: false, msg: "Details should not contain symbols except '-' and '()'." });
            }
            // Find the card in the database based on the provided cardid
            const foundCard = await Products.findOne({ ProductID: ProductID });

            if (!foundCard) {
                return res.status(404).json({ success: false, msg: "Card not found." });
            }

            // Update the details of the found card
            foundCard.ProductPrice = ProductPrice;
            foundCard.ProductName = ProductName;
            foundCard.ProductStock = ProductStock;

            // Save the updated card to the database
            await foundCard.save();

            // Return the updated details of the card as a JSON response
            return res.status(200).json({ success: true, card: foundCard, msg: "Details Updated Sucessfully" });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ success: false, msg: "Server error. Contact the Developers." });
        }
    }
};

export default connectDb(handler);
