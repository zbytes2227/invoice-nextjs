const mongoose = require("mongoose");

const connectDb = (handler) => async (req, res) => {
  if (mongoose.connections[0].readyState) {
    return handler(req, res);
  }
  await mongoose.connect("mongodb+srv://zbytes1:fA1RuLDDhjnsptrJ@cluster0.njg3jya.mongodb.net/cdb?retryWrites=true&w=majority&appName=Cluster0");
  return handler(req, res);
};
export default connectDb;