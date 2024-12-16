import Product from "../models/product.js";

// Lista todos los productos
async function list(req, res) {
  try {
    const products = await Product.find({ deletedAt: null });
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: "Error del servidor", error: err.message });
  }
}

// Busca un producto por su ID
async function find(req, res) {
  try {
    const product = await Product.findById(req.params.id);

    if (product && product.deletedAt === null) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ message: "Producto no encontrado" });
    }
  } catch (err) {
    res.status(500).json({ message: "Error del servidor", error: err.message });
  }
}

// Crea un nuevo producto
async function create(req, res) {
  try {
    console.log("Datos recibidos en el body:", req.body);

    const {
      nombre,
      precio,
      images,
      descripcionOne,
      descripcionTwo,
      categoriaId,
      material,
      dimensions,
      stock,
      shippingTime,
    } = req.body;

    // Validar que images sea un array
    if (!Array.isArray(images)) {
      return res.status(400).json({ message: "images debe ser un array." });
    }

    // Crear el nuevo producto
    const newProduct = await Product.create({
      nombre,
      precio,
      images,
      descripcionOne,
      descripcionTwo,
      categoriaId,
      material: material || null,
      dimensions: dimensions || null,
      stock: stock || 0,
      shippingTime: shippingTime || null,
    });

    console.log("Producto creado exitosamente:", newProduct);

    res.status(201).json({ message: "Producto creado exitosamente", product: newProduct });
  } catch (err) {
    console.error("Error al crear el producto:", err.message);
    res.status(500).json({ message: "Error del servidor", error: err.message });
  }
}

// Actualiza un producto por ID
async function update(req, res) {
  try {
    const productId = req.params.id;
    const updatedProduct = await Product.findByIdAndUpdate(productId, req.body, { new: true, runValidators: true });

    if (updatedProduct) {
      res.status(200).json({ message: "Producto actualizado", product: updatedProduct });
    } else {
      res.status(404).json({ message: "Producto no encontrado" });
    }
  } catch (err) {
    res.status(500).json({ message: "Error del servidor", error: err.message });
  }
}

// Marca un producto como eliminado
async function destroy(req, res) {
  try {
    const productId = req.params.id;
    const deletedProduct = await Product.findByIdAndUpdate(productId, { deletedAt: new Date() }, { new: true });

    if (deletedProduct) {
      res.status(200).json({ message: "Producto eliminado", product: deletedProduct });
    } else {
      res.status(404).json({ message: "Producto no encontrado" });
    }
  } catch (err) {
    res.status(500).json({ message: "Error del servidor", error: err.message });
  }
}

// Encuentra productos por categoría
async function findByCategory(req, res) {
  try {
    const { categoriaId } = req.params;
    const products = await Product.find({ categoriaId, deletedAt: null });

    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: "Error del servidor", error: err.message });
  }
}

// Exportar los controladores
export default {
  list,
  find,
  create,
  update,
  destroy,
  findByCategory,
};
