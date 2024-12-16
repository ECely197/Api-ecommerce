// models/review.model.js
import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  nombreRevisor: { type: String, required: true },
  calificacion: { type: Number, required: true },
  comentario: { type: String, required: true },
  productoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true }
  // Aquí puedes añadir más propiedades si es necesario
});

// Exporta el modelo
const Review = mongoose.model('Review', reviewSchema);
export default Review;
