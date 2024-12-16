import mongoose from "mongoose";

const productoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  precio: { type: Number, required: true },
  images: { type: [String], required: true },
  descripcionOne: { type: String, required: true },
  descripcionTwo: { type: String, default: null },
  categoriaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Categoria' },
  material: { type: String, default: null },
  dimensions: { type: String, default: null },
  stock: { type: Number, default: 0 },
  shippingTime: { type: String, default: null },
  marca: { type: String, default: null },
  deletedAt: { type: Date, default: null },
});

const Product = mongoose.model("Product", productoSchema);

export default Product;
