import { Request, Response } from "express";
import { Address } from "../models/Address";



export const AddAddress = async (req: Request, res: Response) => {
    try {
        const { country, city, street, zip } = req.body;

        // Validate input
        if (!country || !city || !street || !zip) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Sprawdzenie czy user już ma przypisany adres
        const existingAddress = await Address.findOne({ user: req.user?.userId });
        if (existingAddress) {
            const updatedAddress = await Address.findByIdAndUpdate(
                existingAddress._id,
                { country, city, street, zip },
                { new: true }
            );
            return res.status(200).json({ message: "Address updated successfully", address: updatedAddress });
        }

        // Tworzenie nowego adresu
        const newAddress = new Address({
            user: req.user?.userId,
            country,
            city,
            street,
            zip,
        });

        await newAddress.save();
        res.status(201).json({ message: "Address added successfully", address: newAddress });
    } catch (err) {
        console.error("Error adding address:", err);
        res.status(500).json({ message: "Internal server error" });
    }
};
export const GetAddress = async (req: Request, res: Response) => {
    try {
        const address = await Address.findOne({ user: req.user?.userId });
        if (!address) {
            return res.status(404).json({ message: "Add Address" });
        }
        res.status(200).json(address);
    } catch (err) {
        console.error("Error fetching address:", err);
        res.status(500).json({ message: "Internal server error" });
    }
    
};
