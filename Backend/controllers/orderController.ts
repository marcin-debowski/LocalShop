import Order from "../models/Order";
import e, { Request, Response } from "express";    
import { User } from "../models/User";

export const addOrder = async (req: Request, res: Response) => {
    try {
        const {  customer, items, total, address } = req.body;

        let customerData = {};
        let userId = null;

        if (!items || !Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ message: "Order must have at least one item" });
        }
        if (!address) {
            return res.status(400).json({ message: "Address is required" });
        }

        if (req.user) {
            const user = await User.findById(req.user.userId);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            customerData = {
                name: user.name,
                email: user.email
            };
            userId = user._id;
        }else if(customer && customer.name && customer.email){
            customerData = {
                name: customer.name,
                email: customer.email
            };
            userId = null; 
        } else {
            return res.status(400).json({ message: "Customer data is required" });
        }
        if (!items || items.length === 0) {
            return res.status(400).json({ message: "Order must have at least one item" });
        }
        const newOrder = new Order({
            user: userId,
            customer: customerData,
            items,
            total,
            address
        });

        await newOrder.save();
        res.status(201).json(newOrder);
    } catch (error) {
        res.status(500).json({ message: "Error creating order", error });
    }
};