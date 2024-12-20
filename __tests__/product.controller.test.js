import { describe, expect, it, jest } from "@jest/globals";

jest.unstable_mockModule("../models/product", () => ({
  default: {
    find: jest.fn(),
    create: jest.fn(),
    findById: jest.fn(),
    findByIdAndDelete: jest.fn(),
    findByIdAndUpdate: jest.fn(),
  },
}));
jest.unstable_mockModule("../models/ModelCategory.js", () => ({
  default: {
    findOne: jest.fn(),
    create: jest.fn(),
  },
}));

const {
  list,
  find,
  create,
  update,
  destroy,
  findByCategory,
  asignarCategoriaPorTipo,
} = await import("../controllers/productController");
const Product = (await import("../models/product")).default;
const categoryModel = (await import("../models/ModelCategory")).default;

describe("LIST", () => {
  it("Deberia de listar los productos", async () => {
    const mockProducts = [
      {
        nombre: "producto",
        tipo: "dia de las madres",
        precio: "30",
        images: "....",
        descriptionOne: "hola mundo",
        descriptionTwo: "hola mundo 2",
        categoria: "123123",
        material: "piedra",
        dimension: "2x1",
        stock: "4",
        shippingTime: "2:00",
      },
      {
        nombre: "producto 2",
        tipo: "dia de las madres 2",
        precio: "302",
        images: ".....",
        descriptionOne: "hola mundo 1",
        descriptionTwo: "hola mundo 3",
        categoria: "123123123",
        material: "piedra 2",
        dimension: "2x1x1",
        stock: "4",
        shippingTime: "2:00",
      },
    ];
    Product.find.mockResolvedValue(mockProducts);

    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    await list(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockProducts);
  });
  it("Deberia dar error al listar los productos", async () => {
    Product.find.mockRejectedValue(new Error("err.message"));

    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    await list(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: "Error del servidor",
      error: "err.message",
    });
  });
});
describe("FIND", () => {
  it("deberia de buscar un producto por su id", async () => {
    const mockProduct = {
      id: "123123",
      nombre: "producto",
      tipo: "dia de las madres",
      precio: "30",
      images: "....",
      descriptionOne: "hola mundo",
      descriptionTwo: "hola mundo 2",
      material: "piedra",
      dimension: "2x1",
      stock: "4",
      shippingTime: "2:00",
      deletedAt: null,
    };

    Product.findById.mockResolvedValue(mockProduct);

    const req = { params: { id: "123123" } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    await find(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockProduct);
  });
  it("deberia de buscar un producto por su id y dar error ", async () => {
    const mockProduct = {
      id: "123123",
      nombre: "producto",
      tipo: "dia de las madres",
      precio: "30",
      images: "....",
      descriptionOne: "hola mundo",
      descriptionTwo: "hola mundo 2",
      material: "piedra",
      dimension: "2x1",
      stock: "4",
      shippingTime: "2:00",
    };

    Product.findById.mockResolvedValue(mockProduct);

    const req = { params: { id: "123123" } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    await find(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      message: "Producto no encontrado",
    });
  });
  it("Deberia de dar error del servidor al intentar buscar producto por su id", async () => {
    Product.findById.mockRejectedValue(new Error("Error del servidor"));

    const req = { params: { id: "123123" } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await find(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: "Error del servidor",
      error: "Error del servidor",
    });
  });
});
describe("UPDATE", () => {
  it("Deberia de actualizar un producto", async () => {
    const mockProduct = {
      id: "123123",
      nombre: "producto",
      tipo: "dia de las madres",
      precio: "30",
      images: "....",
      descriptionOne: "hola mundo",
      descriptionTwo: "hola mundo 2",
      material: "piedra",
      dimension: "2x1",
      stock: "4",
      shippingTime: "2:00",
    };
    const updatedProduct = {
      ...mockProduct,
      nombre: "producto 2",
      precio: "31",
      descriptionOne: "hola mundo 3",
      descriptionTwo: "hola mundo 4",
      material: "papel",
      dimension: "3x1",
      stock: "5",
    };
    Product.findByIdAndUpdate.mockResolvedValue(updatedProduct);

    const req = {
      params: { id: "123123" },
      body: {
        nombre: "producto 2",
        tipo: "dia de las madres",
        precio: "31",
        images: "....",
        descriptionOne: "hola mundo 3",
        descriptionTwo: "hola mundo 4",
        material: "papel",
        dimension: "3x1",
        stock: "5",
        shippingTime: "2:00",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await update(req, res);
    expect(res.json).toHaveBeenCalledWith({
      message: "Producto actualizado",
      product: updatedProduct,
    });
    expect(res.status).toHaveBeenCalledWith(200);
  });
  it("Deberia de mandar error por no encontrar el producto", async () => {
    Product.findByIdAndUpdate.mockResolvedValue(null);

    const req = { params: { id: "12312" } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await update(req, res);
    expect(res.json).toHaveBeenCalledWith({
      message: "Producto no encontrado",
    });
    expect(res.status).toHaveBeenCalledWith(404);
  });
  it("Deberia de lanzar error del servidor", async () => {
    Product.findByIdAndUpdate.mockRejectedValue(
      new Error("Error del servidor")
    );

    const req = { params: { id: "12312" } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await update(req, res);
    expect(res.json).toHaveBeenCalledWith({
      message: "Error del servidor",
      error: "Error del servidor",
    });
    expect(res.status).toHaveBeenCalledWith(500);
  });
});
describe("DESTROY", () => {
  it("deberia de eliminar un producto", async () => {
    const mockProduct = {
      id: "123123",
      nombre: "producto",
      tipo: "dia de las madres",
      precio: "30",
      images: "....",
      descriptionOne: "hola mundo",
      descriptionTwo: "hola mundo 2",
      material: "piedra",
      dimension: "2x1",
      stock: "4",
      shippingTime: "2:00",
    };
    const destroyProducts = {
      ...mockProduct,
      nombre: "producto 2",
      precio: "31",
      descriptionOne: "hola mundo 3",
      descriptionTwo: "hola mundo 4",
      material: "papel",
      dimension: "3x1",
      stock: "5",
      deletedAt: false,
    };
    Product.findByIdAndUpdate.mockResolvedValue(destroyProducts);

    const req = {
      params: { id: "123123" },
      body: {
        nombre: "producto 2",
        tipo: "dia de las madres",
        precio: "31",
        images: "....",
        descriptionOne: "hola mundo 3",
        descriptionTwo: "hola mundo 4",
        material: "papel",
        dimension: "3x1",
        stock: "5",
        shippingTime: "2:00",
        deletedAt: true,
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await destroy(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "Producto eliminado",
      product: destroyProducts,
    });
  });
  it("Deberia de lanzar un error que no encontro el producto", async () => {
    Product.findByIdAndUpdate.mockResolvedValue(null);

    const req = {
      params: { id: "123123" },
      body: {
        deletedAt: "hoy",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await destroy(req, res);
    expect(res.json).toHaveBeenCalledWith({
      message: "Producto no encontrado",
    });
    expect(res.status).toHaveBeenCalledWith(404);
  });
  it("Deberia de lanzar un erro del servidor", async () => {
    Product.findByIdAndUpdate.mockRejectedValue(
      new Error("Error del servidor")
    );

    const req = {
      params: { id: "12312" },
      body: {
        deletedAt: "hoy",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await destroy(req, res);
    expect(res.json).toHaveBeenCalledWith({
      message: "Error del servidor",
      error: "Error del servidor",
    });
    expect(res.status).toHaveBeenCalledWith(500);
  });
});
describe("FINDBYCATEGORY", () => {
  it("Deberia de buscar un producto por la categoria", async () => {
    const mockProduct = {
      id: "123123",
      nombre: "producto",
      tipo: "dia de las madres",
      precio: "30",
      images: "....",
      descriptionOne: "hola mundo",
      descriptionTwo: "hola mundo 2",
      categoria: "electrico",
      material: "piedra",
      dimension: "2x1",
      stock: "4",
      shippingTime: "2:00",
    };
    Product.find.mockResolvedValue(mockProduct);

    const req = {
      params: {
        categoria: "electrico",
      },
      deletedAt: "hoy",
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await findByCategory(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockProduct);
  });
  it("Deberia de lanzar error del servidor al buscar producto por categoria", async () => {
    Product.find.mockRejectedValue(new Error("Error del servidor"));

    const req = {
      params: {
        categoria: "electrico",
      },
      deletedAt: "hoy",
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    await findByCategory(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: "Error del servidor",
      error: "Error del servidor",
    });
  });
});
describe("ASIGNARCATEGORIAPORTIPO", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Debería asignar una categoría existente para un tipo válido", async () => {
    const tipo = "dia de las madres";
    const mockCategory = { _id: "12345", name: "Dia de la madre" };

    categoryModel.findOne.mockResolvedValue(mockCategory);

    const result = await asignarCategoriaPorTipo(tipo);

    expect(categoryModel.findOne).toHaveBeenCalledWith({
      name: "Dia de la madre",
    });
    expect(result).toBe(mockCategory._id);
  });
  it("Debería crear una nueva categoría si no existe", async () => {
    const tipo = "cumpleaños";
    const mockCreatedCategory = { _id: "67890", name: "Cumpleaños" };

    categoryModel.findOne.mockResolvedValue(null);
    categoryModel.create.mockResolvedValue(mockCreatedCategory);

    const result = await asignarCategoriaPorTipo(tipo);

    expect(categoryModel.findOne).toHaveBeenCalledWith({ name: "Cumpleaños" });
    expect(categoryModel.create).toHaveBeenCalledWith({ name: "Cumpleaños" });
    expect(result).toBe(mockCreatedCategory._id);
  });

  it("Debería lanzar un error si el tipo es un string vacío", async () => {
    await expect(asignarCategoriaPorTipo("")).rejects.toThrow(
      "El tipo proporcionado debe ser un string no vacío"
    );
  });

  it("Debería lanzar un error si el tipo no es un string", async () => {
    await expect(asignarCategoriaPorTipo(123)).rejects.toThrow(
      "El tipo proporcionado debe ser un string no vacío"
    );
  });

  it("Debería lanzar un error si no existe una categoría mapeada para el tipo", async () => {
    const tipo = "desconocido";

    await expect(asignarCategoriaPorTipo(tipo)).rejects.toThrow(
      `No existe una categoria para el tipo: ${tipo}`
    );
  });
});

// describe("CREATE", () => {
// it("Deberia de crear un producto", async () => {
//     const tipo = 'dia de las madres'

//     const mockCategoriaMap = {
//         'dia de las madres': 'Dia de la madre',
//     'dia del padre': 'Dia del padre',
//     'dia del amor y la amistad':'Dia del amor y la amistad',
//     'cumpleaños': 'Cumpleaños',
//     'dia especial': 'Dia especial',
//     };
//     const mockNombreCategoria = mockCategoriaMap[tipo.toLowerCase()];
//      const mockProduct = {
//         id: "123123",
//         nombre: "producto",
//         tipo: tipo,
//         precio: "30",
//         images:[ "....","...."],
//         descriptionOne: "hola mundo",
//         descriptionTwo: "hola mundo 2",
//         categoria: "category123",
//         material: "piedra",
//         dimension: "2x1",
//         stock: "4",
//         shippingTime: "2:00",
//       };
//     Product.create.mockResolvedValue(mockProduct);

//     const req = {body:{
//         id: "123123",
//         nombre: "producto",
//         tipo: "dia del padre",
//         precio: "30",
//         images:[ "....","...."],
//         descriptionOne: "hola mundo",
//         descriptionTwo: "hola mundo 2",
//         categoria: "category123",
//         material: "piedra",
//         dimension: "2x1",
//         stock: "4",
//         shippingTime: "2:00",
//     }};
//     const res = {
//         json: jest.fn()
//     }

//     await create(req,res)

// })
