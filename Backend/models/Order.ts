import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false },
  customer: {
    name: { type: String, required: true },
    email: { type: String, required: true },
  },
  items: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      name: String,
      price: Number,
      quantity: { type: Number, required: true },
    }
  ],
  total: { type: Number, required: true },
  status: { type: String, enum: ["pending", "shipped", "delivered"], default: "pending" },
  address: {
    country: String,
    city: String,
    street: String,
    zipCode: String,
  }
}, { timestamps: true });

const Order = mongoose.model("Order", orderSchema);

export default Order;
