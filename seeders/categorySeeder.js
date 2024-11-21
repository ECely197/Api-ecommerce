import "dotenv/config";
import categoryModel from "../models/ModelCategory.js"
import connectDB from "../config/database.js";

connectDB();

async function categorySeeder() {
    await categoryModel.create({
        name: "Electronics",
        description: "Devices and gadgets including phones, computers, and accessories.",
        festivity: "holiday season",

    });
    console.log("[seeder] category created")
    process.exit(1);
}

categorySeeder();