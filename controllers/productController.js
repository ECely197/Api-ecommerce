import Product from "../models/product.js";
import categoryModel from "../models/ModelCategory.js";

// funcion para asignar categoria segun tipo
export const asignarCategoriaPorTipo = async (tipo) =>{
  if (typeof tipo !== "string" || tipo.trim() === "") {
    throw new Error("El tipo proporcionado debe ser un string no vacío");
  }
  const categoriaMap ={
    'dia de las madres': 'Dia de la madre',
    'dia del padre': 'Dia del padre',
    'dia del amor y la amistad':'Dia del amor y la amistad',
    'cumpleaños': 'Cumpleaños',
    'dia especial': 'Dia especial',
  };
  const nombreCategoria = categoriaMap[tipo.toLowerCase()];

  if(!nombreCategoria){
    throw new Error(`No existe una categoria para el tipo: ${tipo}`)
  }
  //bucas o crea la categoria 
  let categoria = await categoryModel.findOne({ name: nombreCategoria});
  if(!categoria){
    categoria = await categoryModel.create({ name: nombreCategoria});
  }
  return categoria._id;
}

// Lista todos los productos
export const list = async (req, res) =>{
  try {
    const products = await Product.find({ deletedAt: null });
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: "Error del servidor", error: err.message });
  }
}

// Busca un producto por su ID
export const find = async (req, res) => {
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
export const create = async (req, res) => {
  try {
    console.log("Datos recibidos en el body:", req.body);

    const {
      nombre,
      tipo,
      precio,
      images,
      descripcionOne,
      descripcionTwo,
      material,
      dimensions,
      stock,
      shippingTime,
    } = req.body;
    //asignar categoria segun el tipo
    const categoryId = await asignarCategoriaPorTipo(tipo);

    // Validar que images sea un array
    if (!Array.isArray(images)) {
      return res.status(400).json({ message: "images debe ser un array." });
    }

    // Crear el nuevo producto
    const newProduct = await Product.create({
      nombre,
      tipo,
      precio,
      images,
      descripcionOne,
      descripcionTwo,
      categoria : categoryId,
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
export const update = async (req, res) => {
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
export const destroy = async (req, res) => {
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
export const findByCategory = async (req, res) =>{
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
  asignarCategoriaPorTipo,
};
