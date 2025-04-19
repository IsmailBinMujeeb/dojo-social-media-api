import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({

    firstName: {
        type: String,
        required: [true, 'First name is required in user model'],
        trim: true,
        lowercase: true,
    },

    lastName: {
        type: String,
        default: "",
        trim: true,
        lowercase: true,
    },

    userhandle: {
        type: String,
        required: [true, 'Userhandle is required in user model'],
        unique: true,
        index: true,
        trim: true,
        lowercase: true,
        validate: {
            validator: function (v) {
                return /^[a-zA-Z0-9_]+$/.test(v); // Allows only alphanumeric characters and underscores
            },
            message: props => `${props.value} is not a valid userhandle!`
        }
    },

    email: {
        type: String,
        required: [true, 'Email name is required in user model'],
        unique: true,
        index: true,
        trim: true,
        lowercase: true,
        validate: {
            validator: function (v) {
                return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v); // email validation
            },
            message: props => `${props.value} is not a valid email!`
        }
    },

    password: {
        type: String,
        required: [true, 'Password is required in user model'],
        trim: true,
        minlength: [6, 'Password must be at least 6 characters long'],
    },

    refreshToken: {
        type: String,
        default: null,
    },

    profilePicture: {
        type: String,
        default: null,
    },
}, { timestamps: true });

userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
}

export default mongoose.model("User", userSchema);