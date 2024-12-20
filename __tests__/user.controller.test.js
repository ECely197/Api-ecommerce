import { jest, describe, expect, beforeEach } from "@jest/globals";

jest.unstable_mockModule("../models/USer", () => ({
  default: {
    find: jest.fn(),
    create: jest.fn(),
    findById: jest.fn(),
    findByIdAndDelete: jest.fn(),
    findByIdAndUpdate: jest.fn(),
  },
}));
const { getUserProfile, update, destroy, list } = await import(
  "../controllers/usersController"
);
const User = (await import("../models/USer")).default;

describe("GETUSERPROFILE", () => {
  it("Deberia de buscar un usuario por su Id", async () => {
    const mockUser = {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      avatar: "",
      deletedAt: Date,
    };
    User.findById.mockResolvedValue(mockUser);

    const req = {
      params: { id: Number },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await getUserProfile(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockUser);
  });
  it("No deberia de encontrar el usuario", async () => {
    User.findById.mockResolvedValue(null);
    const req = {
      params: { id: Number },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    await getUserProfile(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      message: "Usuario no encontrado.",
    });
  });
  it("Deberia de dar error del servidor", async () => {
    User.findById.mockRejectedValue({ message: "Error interno del servidor." });
    const req = {
      params: { id: Number },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    await getUserProfile(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: "Error interno del servidor.",
    });
  });
});
describe("UPDATE", () => {
  it("Deberia de actualizar el usuario", async () => {
    const mockUser = {
      id: "123123",
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      avatar: "",
      deletedAt: Date,
    };
    const updateUser = {
      ...mockUser,
      firstname: "1",
      lastname: "1",
      email: "1",
      password: "1",
      avatar: "1",
      deletedAt: Date,
    };
    User.findByIdAndUpdate.mockResolvedValue(updateUser);

    const req = {
      params: { id: "123123" },
      body: {
        firstname: "1",
        lastname: "1",
        email: "1",
        password: "1",
        avatar: "1",
        deletedAt: Date,
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await update(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(updateUser);
  });
  it("No deberia de enontrar el usuario para actualizarlo", async () =>{
    User.findByIdAndUpdate.mockResolvedValue(null);
    const req = {
      params: { id: Number },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    await update(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      message: "Usuario no encontrado.",
    });
  });
  it("Deberia de lanzar error del servidor", async () =>{
    User.findByIdAndUpdate.mockRejectedValue({ message: "Error interno del servidor." });
    const req = {
      params: { id: Number },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    await update(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: "Error interno del servidor.",
    });
    })
});
describe("LIST", () =>{
  it("Deberia de listar todos los usuarios",async () =>{
    const mockUsers =[ {
      id: "123123",
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      avatar: "",
      deletedAt: Date,
    },{
      id: "123123",
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      avatar: "",
      deletedAt: Date,
    }]
    User.find.mockResolvedValue(mockUsers)

    const req = {};
    const res ={
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await list(req,res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockUsers);
  });
  it("Deberia dar error al listar los usuarios", async () =>{
    const mockUsers =[ {
      id: "123123",
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      avatar: "",
      deletedAt: Date,
    },{
      id: "123123",
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      avatar: "",
      deletedAt: Date,
    }]
    User.find.mockRejectedValue({message:'Error interno del servidor.'})

    const req = {};
    const res ={
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await list(req,res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Error interno del servidor.' });
  });
  });
describe("DESTROY", () =>{
  it("Deberia de buscar y eliminar el usuario", async () =>{
    const mockUser = {
      id: "123123",
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      avatar: "",
      deletedAt: Date,
    };
    const updateUser = {
      ...mockUser,
      firstname: "1",
      lastname: "1",
      email: "1",
      password: "1",
      avatar: "1",
      deletedAt: "ayer",
    };
    User.findByIdAndDelete.mockResolvedValue(updateUser);

    const req = {
      params: { id: "123123" },
      body: {
        firstname: "1",
        lastname: "1",
        email: "1",
        password: "1",
        avatar: "1",
        deletedAt: "hoy",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await destroy(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: 'Usuario eliminado correctamente.' });
  })
})

// describe('getUserProfile', () => {
//   it('debería obtener un perfil de usuario', async () => {
//     await controller.getUserProfile(req, res);
//     expect(res.status).toHaveBeenCalledWith(200);
//   });
// });

// describe('update', () => {
//   it('debería actualizar un usuario', async () => {
//     await controller.update(req, res);
//     expect(res.status).toHaveBeenCalledWith(200);
//   });
// });

// describe('destroy', () => {
//   it('debería eliminar un usuario', async () => {
//     await controller.destroy(req, res);
//     expect(res.status).toHaveBeenCalledWith(200);
//   });
// });

// describe('list', () => {
//   it('debería listar todos los usuarios', async () => {
//     await controller.list(req, res);
//     expect(res.status).toHaveBeenCalledWith(200);
//   });
// });
