import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const generateToken = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "7d",
    });

    res.cookie("jwt", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days  // cookie will be removed after 7 days
        httpOnly: true, // cookie cannot be accessed by client side javascript
        sameSite: "strict", // cookie will only be sent in a first-party context
        secure: process.env.NODE_ENV !== "development", // cookie will only be sent in https
    });

    return token;
};