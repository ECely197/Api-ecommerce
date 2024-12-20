import { describe, expect, jest } from "@jest/globals";

jest.unstable_mockModule("../models/product.js", () => ({
  default: {
    find: jest.fn(),
    findById: jest.fn(),
    create: jest.fn(),
    findByIdAndUpdate: jest.fn(),
  },
}));

const {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrder,
  softDeleteOrder,
} = await import("../controllers/orderController.js");
const Order = (await import("../models/Order.js")).default;

describe("Get All Orders", () => {
  it("debería devolver una lista de órdenes con status 200", async () => {
    const mockOrders = [
      {
        _id: "1",
        user: "user1",
        products: [],
        totalAmount: 100,
        status: "Pendiente",
      },
      {
        _id: "2",
        user: "user2",
        products: [],
        totalAmount: 200,
        status: "Enviado",
      },
    ];

    Order.find.mockResolvedValue(mockOrders);

    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await getAllOrders(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockOrders);
  });

  it("debería devolver un error con status 500 si ocurre un fallo", async () => {
    Order.find.mockRejectedValue(new Error("Error en la base de datos"));

    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await getAllOrders(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: "Error al buscar todos los pedidos",
      error: expect.any(Object),
    });
  });
});

describe("Get Order by ID", () => {
  it("debería devolver una orden por ID con status 200", async () => {
    const mockOrder = {
      _id: "1",
      user: "user1",
      products: [],
      totalAmount: 100,
      status: "Pendiente",
    };

    Order.findById.mockResolvedValue(mockOrder);

    const req = { params: { id: "1" } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await getOrderById(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockOrder);
  });

  it("debería devolver un error con status 500 si ocurre un fallo", async () => {
    Order.findById.mockRejectedValue(new Error("Error en la base de datos"));

    const req = { params: { id: "1" } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await getOrderById(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: "Error al buscar el pedido",
      error: expect.any(Object),
    });
  });
});

describe("Create Order", () => {
  it("debería crear una nueva orden con status 201", async () => {
    const mockOrder = {
      _id: "1",
      user: "user1",
      products: [],
      totalAmount: 100,
      status: "Pendiente",
    };

    Order.create.mockResolvedValue(mockOrder);

    const req = {
      body: {
        user: "user1",
        products: [],
        totalAmount: 100,
        status: "Pendiente",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await createOrder(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(mockOrder);
  });

  it("debería devolver un error con status 500 si ocurre un fallo al crear", async () => {
    Order.create.mockRejectedValue(new Error("Error en la base de datos"));

    const req = {
      body: {
        user: "user1",
        products: [],
        totalAmount: 100,
        status: "Pendiente",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await createOrder(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: "Error al crear el pedido",
      error: expect.any(Object),
    });
  });
});

describe("Update Order", () => {
  it("debería actualizar una orden existente con status 200", async () => {
    const mockOrder = {
      _id: "1",
      user: "user1",
      products: [],
      totalAmount: 100,
      status: "Pendiente",
    };

    Order.findById.mockResolvedValue(mockOrder);

    // Asegurémonos de que save() está correctamente mockeado
    mockOrder.save = jest.fn().mockResolvedValue(mockOrder);

    const req = {
      params: { id: "1" },
      body: { totalAmount: 200 },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await updateOrder(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith("El pedido ha sido actualizado");
  });

  it("debería devolver un error con status 500 si ocurre un fallo al actualizar", async () => {
    const mockOrder = {
      _id: "1",
      user: "user1",
      products: [],
      totalAmount: 100,
      status: "Pendiente",
    };

    Order.findById.mockResolvedValue(mockOrder);
    // Simulamos un error al guardar el pedido
    mockOrder.save = jest
      .fn()
      .mockRejectedValue(new Error("Error en la base de datos"));

    const req = {
      params: { id: "1" },
      body: { totalAmount: 200 },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await updateOrder(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: "Error al actualizar el pedido",
      error: expect.any(Object),
    });
  });
});

describe("Soft Delete Order", () => {
  it("debería eliminar una orden (soft delete) con status 200", async () => {
    const mockOrder = {
      _id: "1",
      user: "user1",
      products: [],
      totalAmount: 100,
      status: "Pendiente",
    };

    Order.findById.mockResolvedValue(mockOrder);

    // Asegurémonos de que save() está correctamente mockeado
    mockOrder.save = jest.fn().mockResolvedValue(mockOrder);

    const req = { params: { id: "1" } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await softDeleteOrder(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith("El pedido ha sido elminado");
  });

  it("debería devolver un error con status 500 si ocurre un fallo al eliminar", async () => {
    const mockOrder = {
      _id: "1",
      user: "user1",
      products: [],
      totalAmount: 100,
      status: "Pendiente",
    };

    Order.findById.mockResolvedValue(mockOrder);
    mockOrder.save = jest
      .fn()
      .mockRejectedValue(new Error("Error en la base de datos"));

    const req = { params: { id: "1" } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await softDeleteOrder(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: "Error al eliminar el pedido",
      error: expect.any(Object),
    });
  });
});
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

const {list, find, create, update, destroy, findByCategory,asignarCategoriaPorTipo} = await import(
  "../controllers/productController"
);
const Product = (await import("../models/product")).default;

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
  it("Deberia de dar error del servidor al intentar buscar producto por su id", async () =>{
    
      Product.findById.mockRejectedValue(new Error("Error del servidor"));

      const req = { params: { id: "123123" } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await find(req,res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
        message: "Error del servidor", error: "Error del servidor"
    })
  });
});
describe("UPDATE", () => {
    it("Deberia de actualizar un producto", async () =>{
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

          const req ={params:{id:"123123"}
          ,body:{
            nombre: "producto 2",
            tipo: "dia de las madres",
            precio: "31",
            images: "....",
            descriptionOne: "hola mundo 3",
            descriptionTwo: "hola mundo 4",
            material: "papel",
            dimension: "3x1",
            stock: "5",
            shippingTime: "2:00"
          }};
          const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
          };

          await update(req,res);
          expect(res.json).toHaveBeenCalledWith({
            message: "Producto actualizado",
            product: updatedProduct,
          });
          expect(res.status).toHaveBeenCalledWith(200);
          
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

