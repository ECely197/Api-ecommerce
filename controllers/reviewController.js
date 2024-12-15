import Review from '../models/review.model.js'; 

// Función para crear una nueva reseña
export const createReview = async (req, res) => {
  const { nombreRevisor, calificacion, comentario, productoId } = req.body;

  // Validación de campos requeridos
  if (!nombreRevisor || !calificacion || !comentario || !productoId) {
    return res.status(400).json({ message: "Todos los campos son obligatorios." });
  }

  try {
    const newReview = await Review.create({
      nombreRevisor,
      calificacion,
      comentario,
      productoId
    });

    res.status(201).json({ message: "Reseña creada", review: newReview });
  } catch (err) {
    res.status(500).json({ message: "Error del servidor", error: err.message });
  }
};

// Función para obtener una reseña por su ID
export const getReviewById = async (req, res) => {
  const { id } = req.params; // Obtiene el ID de los parámetros de la URL

  try {
    const review = await Review.findById(id); // Busca la reseña por su ID

    if (!review) {
      return res.status(404).json({ message: "Reseña no encontrada." });
    }

    res.status(200).json(review); // Devuelve la reseña encontrada
  } catch (err) {
    res.status(500).json({ message: "Error del servidor", error: err.message });
  }
};

// Función para obtener todas las reseñas
export const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find(); // Obtiene todas las reseñas
    res.status(200).json(reviews); // Devuelve todas las reseñas
  } catch (err) {
    res.status(500).json({ message: "Error del servidor", error: err.message });
  }
};

// Función para obtener reseñas por productoId
export const getReviewsByProductId = async (req, res) => {
  const { productoId } = req.params; // Obtiene el productoId de los parámetros de la URL

  try {
    const reviews = await Review.find({ productoId }); // Busca reseñas asociadas al productoId

    if (reviews.length === 0) {
      return res.status(404).json({ message: "No se encontraron reseñas para este producto." });
    }

    res.status(200).json(reviews); // Devuelve las reseñas encontradas
  } catch (err) {
    res.status(500).json({ message: "Error del servidor", error: err.message });
  }
};
