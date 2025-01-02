import mongoose from "mongoose";

const subcategory=new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: [2, "Too Short"],
        unique: true,
        trim: true,
      },
      slug: {
        type: String,
        lowercase: true,
      },
      category: {
        type: Schema.ObjectId,
        required: true,
        ref: "category",
      },
    },
{ timestamps: true });

export const Subcategory = mongoose.model("Subcategory", subcategory);