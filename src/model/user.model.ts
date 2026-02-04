import mongoose from "mongoose";

// Define the User Interface for TypeScript
export interface IUser {
    _id?: mongoose.Types.ObjectId;
    name?: string;
    email: string;
    password: string;
    image?: string;
    createdAt?: Date;
    updatedAt?: Date;
  }

const userSchema = new mongoose.Schema<IUser>({
    name:{
        type: String,
        required: false,    
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: false,  // Set to false to support OAuth (Google/GitHub) later
        select: false   // CRITICAL: Hidden from queries by default for security
    },
    image: {
        type: String,
        required: false
    },
},{timestamps: true});

const User = mongoose.models.User || mongoose.model("User", userSchema);

// const User = (models.User as Model<IUser>) || model<IUser>("User", userSchema);

export default User;