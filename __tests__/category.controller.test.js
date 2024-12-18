import { describe, expect, jest } from "@jest/globals";

jest.unstable_mockModule("../models/ModelCategory.js", () => ({
  default: {
    find: jest.fn(),
    create: jest.fn(),
    findById: jest.fn(),
    
  },
}));

const { getAll, getById, create, update, deleted } = await import(
  "../controllers/categoryController"
);
const Category = (await import("../models/ModelCategory")).default;

describe("GET CATEGORIES", () => {
  it("Deberia devolver una lista de categorias", async () => {
    const mockCategory = [
      {
        name: "cumpleaños",
        description: "hola mundo",
        festivity: "festivo",
        imgCategory: "....",
      },
      {
        name: "calendario",
        description: "hola mundo kkkk",
        festivity: "regalo",
        imgCategory: "....",
      },
    ];
    //Arrange
    Category.find.mockResolvedValue(mockCategory);
    //Act

    const req = {};
    const res = {
      json: jest.fn(),
    };
    //assert
    await getAll(req, res);
    expect(res.json).toHaveBeenCalledWith(mockCategory);
  });
  
  it("Deberia devolver error al listar las categorias con un status 404", async () => {
    //Arrange
    Category.find.mockRejectedValue(new Error('Error al obtener las categorias'));

    //act
    const req = {};
    const res = {
        status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    //assert
    await getAll(req, res);
    expect(res.status).toHaveBeenCalledWith(404)
    expect(res.json).toHaveBeenCalledWith(
        "categorias no encontradas",
    )
  });
});
describe("GET BY ID CATEGORY", () =>{
    it("Deberia devolver una categoria", async () =>{
        const mockCategory = {id:"123123",name: "cumpleaños",description: "hola mundo",festivity: "festivo",imgCategory: "....",};
        //arrenge
        Category.findById.mockResolvedValue(mockCategory)
        //act

        const req = {params:{id:Number}};
        const res = {
            json: jest.fn(),
        };
        //assert
        await getById(req, res);
        expect(res.json).toHaveBeenCalledWith(mockCategory)
    });
    it("Deberia devolver error al intentar traer una categoria", async ()=>{
        const mockCategory = {id:"123123",name: "cumpleaños",description: "hola mundo",festivity: "festivo",imgCategory: "....",};
        //arrenge
        Category.findById.mockRejectedValue(mockCategory);
        //act
        const req = {params:{id:Number}}
        const res ={
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        //assert
        await getById(req,res);
        expect(res.status).toHaveBeenCalledWith(404)
        expect(res.json).toHaveBeenCalledWith("Categoria no encontrada")
    });
describe("CREATE CATEGORY", () =>{
    it("Deberia de crear una categoria", async () =>{
        const mockCategory = {name: "cumpleaños",description: "hola mundo",festivity: "festivo",imgCategory: "....",};
        //arrenge
        Category.create.mockRejectedValue(new Error('No se pudo crear la categoria'));
        //act
        const req = {body:{name: "cumpleaños",description: "hola mundo",festivity: "festivo",imgCategory: "...."}};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        //assert
        await create(req, res);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith("error interno del servidor")
    });
describe("UPDATE CATEGORY", () =>{
    it()
})
})
})
