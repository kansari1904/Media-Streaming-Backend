import jwt from "jsonwebtoken";

const userAuth = (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        return res.status(401).json({ success: false, message: "Not Authorized, Login Again" });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);

        if (!decoded.id) {
            return res.status(403).json({ success: false, message: "Invalid Token" });
        }

        // Attach userId to request
        req.userId = decoded.id;

        next(); 
    } catch (error) {
        return res.status(403).json({ success: false, message: error.message });
    }
};

export default userAuth;
