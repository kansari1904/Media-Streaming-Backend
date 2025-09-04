import adminModel from "../models/adminModel.js"
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken';


export const handleRegister = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ success: false, message: "All fields are required" })
    }
    try {
        const existEmail = await adminModel.findOne({ email })
        if (existEmail) {
            return res.json({ success: false, message: "Email Already existing!" })
        }
        const hassedPassword = await bcrypt.hash(password, 10);

        const user = await adminModel.create({
            name,
            email,
            password: hassedPassword,
        });

        return res.json({ success: true , message: "user created successfully" })
    } catch (err) {
        return res.status(400).json({ success: false, message: "error occures" })
    }
}

export const handlelogin = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ success: false, message: "All fields required!" })
    }

    try {
        const user = await adminModel.findOne({ email })
        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid email!" })
        }
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Invalid password!" })
        }
        const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: "7d" })
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        })
        return res.json({ success: true, message : "user successfully login!" })
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
}






