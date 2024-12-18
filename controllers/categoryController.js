import categoryModel from "../models/ModelCategory.js";

export const getAll = async(req, res)=> {
  try {
    const categories = await categoryModel.find({ deleteAt: null });
    return res.json(categories);
  } catch (error) {
    console.log(error);
    return res.status(404).json("categorias no encontradas");
  }
}

export const getById = async (req, res) => {
  try {
    const category = await categoryModel.findById(req.params.id);
    return res.json(category);
  } catch (error) {
    console.log(error);
    return res.status(404).json("Categoria no encontrada");
  }
}

export const create = async(req, res) =>{
  const { name, description, festivity, imgCategory } = req.body;
  try {
    const newCategory = await categoryModel.create({
      name,
      description,
      festivity,
      imgCategory,
    });
    return res.status(201).json(newCategory);
  } catch (error) {
    console.log(error);
    return res.status(500).json("error interno del servidor");
  }
}

export const update = async (req, res) => {
  const categoryUpdate = await categoryModel.findById(req.params.id);
  if (categoryUpdate !== null) {
    const { id, name, description, festivity, imgCategory, isActive } = req.body;

    categoryUpdate.name = name || categoryUpdate.name;
    categoryUpdate.description = description || categoryUpdate.description;
    categoryUpdate.festivity = festivity || categoryUpdate.festivity;
    categoryUpdate.imgCategory = imgCategory || categoryUpdate.imgCategory;
    categoryUpdate.isActive = isActive !== undefined ? isActive : categoryUpdate.isActive;

    await categoryUpdate.save();

    return res.json("la categoria se a actualizado");
  } else {
    return res.json("no existe categoria con el ID mencionado");
  }
}

export const deleted = async(req, res) => {
  try {
    const categoryId = req.params.id;
    const categoryDeleted = await categoryModel.findById(categoryId);

    if (!categoryDeleted) {
      return res.status(404).json({ message: "Categoría no encontrada" });
    }

    await categoryModel.deleteOne({ _id: categoryId });

    return res.json({
      message: "Se ha eliminado la categoría",
    });
  } catch (error) {
    console.error("Error al eliminar la categoría:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
}

export default {
  getAll: getAll,
  getById: getById,
  create: create,
  update: update,
  deleted: deleted,
};
