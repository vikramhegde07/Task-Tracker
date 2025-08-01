import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            trim: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },

        passwordHash: {
            type: String,
            required: true,
        },

        isDemo: {
            type: Boolean,
            default: false,
        },

        autoDeleteAt: {
            type: Date,
            default: function () {
                return this.isDemo ? new Date(Date.now() + 24 * 60 * 60 * 1000) : undefined;
            },
            expires: 0,
        },
    },
    { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
