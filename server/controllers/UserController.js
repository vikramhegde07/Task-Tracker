import bcrypt from 'bcryptjs';
import { User } from '../models/UserModel.js';
import { createToken } from '../middlewares/auth.js';

export const UserRegister = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        if (!username || !email || !password)
            return res.status(400).json({
                message: "Send all required fields",
                origin: "User Registration"
            });

        const existingUser = await User.findOne({ email });
        if (existingUser)
            return res.status(409).json({
                message: "Email already registered",
                origin: "User Registration"
            });

        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);
        const newUser = new User({
            username: username,
            email: email,
            passwordHash,
            isDemo: true
        });

        await newUser.save();

        const token = await createToken(newUser);
        const { _id } = newUser;

        return res.status(201).json({
            message: "User Created Successfully",
            token,
            user: { id: _id, username, email }
        });
    } catch (err) {
        return res.status(500).json({
            message: "Internal server error",
            origin: "User Registration",
            error: err
        })
    }
}

export const UserLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password)
            return res.status(400).json({
                message: "Send all required fields",
                origin: "User Login"
            });

        const user = await User.findOne({ email });
        if (!user)
            return res.status(401).json({
                message: "No user Found!",
                origin: "User Login"
            });

        const isMatch = await bcrypt.compare(password, user.passwordHash);

        if (!isMatch)
            return res.status(401).json({
                message: "Invalid Credentials",
                origin: 'User Login'
            });

        const token = await createToken(user);

        return res.status(200).json({
            message: "Login Successfull",
            token,
            user
        });
    } catch (err) {
        return res.status(500).json({
            message: "Internal server error",
            origin: "User Login",
            error: err
        })
    }

}

export const getUser = async (req, res) => {
    const userId = req.userId;
    try {
        const user = await User.findById(userId).select("-passwordHash");
        if (!user)
            return res.status(401).json({
                message: "No user found.",
                origin: "Get User"
            });
        return res.status(200).json({
            message: "User Found.",
            user
        })
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            origin: "Get User"
        });
    }
}