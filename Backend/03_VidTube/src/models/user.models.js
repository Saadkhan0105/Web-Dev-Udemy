import mongoose, {Schema} from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true
        },
        fullname: {
            type: String,
            required: true,
            trim: true,
            index: true
        },
        avatar: {
            type: String, //cloudinary URL
            required: true,
        },
        coverImage: {
            type: String //cloudinary URL
        },
        watchHistory: [
            {
            type: [Schema.Types.ObjectId],
            ref: "Video"
        }
    ],
        password: {
            type: String,
            required: [true, "Password is required."],
        },
        refreshToken: {
            type: String  
        }        
    },
    {timestamps: true}
)

userSchema.pre("save", async function (next) {

    if(!this.isModified("password")) return next();

    this.password = bcrypt.hashSync(this.password, 10)


    next();
})

userSchema.methods.isPasswordCorrect = async function(password) {
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateToken = function() {
    // short lived access token
    return jwt.sign(
      {
        _id: this._id,
        email: this.email,
        username: this.username,
        fullname: this.fullname,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
    );
    
}
userSchema.methods.generateRefreshToken = function() {
    // short lived access token
    return jwt.sign(
      {
        _id: this._id
      },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
    );
    
}




export const User = mongoose.model("User", userSchema);

// whenever we are saving anything in the "User" we should name them as this -> "User" because mongoDb automatically converts them in lowercase and in plural format.