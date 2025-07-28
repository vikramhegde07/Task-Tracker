import jwt from 'jsonwebtoken';

export const verifyToken = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            message: "Access Denied. Invalid or missing token",
            origin: "Authentication"
        });
    }

    const token = authHeader.split(" ")[1];

    if (!token) return res.status(401).json({
        message: "Access Denied. No token provided",
        origin: "Authentication"
    })

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id;
        next();
    } catch (err) {
        return res.status(401).json({
            message: "Invalid or Expired token",
            error: err,
            origin: "Server"
        })
    }
}

export const createToken = async (user) => {
    if (!user) throw new Error("User not provided");
    const payload = {
        id: user._id,
    }

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '72h' });
    return token;
}