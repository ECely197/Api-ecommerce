import { describe, expect, it, jest } from "@jest/globals";

jest.unstable_mockModule("../models/product", () => ({
  default: {
    find: jest.fn(),
    create: jest.fn(),
    findById: jest.fn(),
    findByIdAndDelete: jest.fn(),
  },
}));

const {
  list,
  find,
  create,
  update,
  destroy,
  findByCategory,
} = await import("../controllers/productController");
const Product = (await import("../models/product")).default;

describe("LIST", () => {
  it("Deberia de listar los productos", async () => {
    const mockProducts =[
        {
            nombre: "producto",
        tipo: "dia de las madres",
        precio:"30",
        images:"....",
        descriptionOne: "hola mundo",
        descriptionTwo: "hola mundo 2",
        categoria: "123123",
        material:"piedra",
        dimension:"2x1",
        stock:"4",
        shippingTime: "2:00",
        },
        {
            nombre: "producto 2",
            tipo: "dia de las madres 2",
            precio:"302",
            images:".....",
            descriptionOne: "hola mundo 1",
            descriptionTwo: "hola mundo 3",
            categoria: "123123123",
            material:"piedra 2",
            dimension:"2x1x1",
            stock:"4",
            shippingTime: "2:00",
        }
    ];
    Product.find.mockResolvedValue(mockProducts);

    const req = {};
    const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
    };
    await list(req,res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockProducts)
  });
  it
})
