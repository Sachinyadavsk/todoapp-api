const User = require("../models/user.model");
const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

// Login User
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).json({
                status: "error",
                message: "Email and Password are required"
            });
        }

        // Find user
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                status: "error",
                message: "Invalid email or password"
            });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({
                status: "error",
                message: "Invalid email or password"
            });
        }

        // Generate JWT Token
        const token = jwt.sign(
            {
                id: user._id,
                email: user.email
            },
            process.env.JWT_SECRET || "mysecretkey",
            {
                expiresIn: "7d"
            }
        );

        res.status(200).json({
            status: "success",
            message: "Login successful",
            token,
            user: user
        });

    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message
        });
    }
};
// Register User
exports.register = async (req, res) => {
    try {
        const { name, email, password, confirmpassword } = req.body;
        // Validate
        if (!name || !email || !password || !confirmpassword) {
            return res.status(400).json({
                status: "error",
                message: "All fields are required"
            });
        }

        // Check password match
        if (password !== confirmpassword) {
            return res.status(400).json({
                status: "error",
                message: "Password and Confirm Password do not match"
            });
        }

        // Check if email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                status: "error",
                message: "Email already exists"
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        // Create user
        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        res.status(201).json({
            status: "success",
            message: "User registered successfully",
            data: user
        });

    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message
        });
    }
};

// Get All Users
exports.getUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password");

        res.status(200).json({
            status: "success",
            total: users.length,
            data: users
        });

    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message
        });
    }
};

// Get Single User
exports.getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select("-password");

        if (!user) {
            return res.status(404).json({
                status: "error",
                message: "User not found"
            });
        }

        res.status(200).json({
            status: "success",
            data: user
        });

    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message
        });
    }
};

// Update User
exports.updateUser = async (req, res) => {
    try {
        const { name, email } = req.body;

        const user = await User.findByIdAndUpdate(
            req.params.id,
            { name, email },
            { new: true }
        ).select("-password");

        if (!user) {
            return res.status(404).json({
                status: "error",
                message: "User not found"
            });
        }

        res.status(200).json({
            status: "success",
            data: user,
            message: "User updated successfully"
        });

    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message
        });
    }
};

// Delete User
exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);

        if (!user) {
            return res.status(404).json({
                status: "error",
                message: "User not found"
            });
        }

        res.status(200).json({
            status: "success",
            message: "User deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message
        });
    }
};