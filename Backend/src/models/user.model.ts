import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    phoneNumber:{
      type: String,
    },
    aboutMe:{
      type:String,
    }
  },
  {
    timestamps: true,
  }
);

 const User = model("User", userSchema);

 export default User;