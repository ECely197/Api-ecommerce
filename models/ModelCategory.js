import mongoose from "mongoose";

const categorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      requiered: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    deleteAt: {
      type: Date,
      default: null,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    imgCategory: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);
const categoryModel = mongoose.model("category", categorySchema);

export default categoryModel;
