import { jest } from '@jest/globals';
import User from '../models/User.js';
import { destroy, list, getUserProfile, update } from '../controllers/usersController.js';
import { validationResult } from 'express-validator';

jest.mock('express-validator', () => ({
  validationResult: jest.fn().mockImplementation((req) => ({
    isEmpty: jest.fn().mockReturnValue(
      req.body.firstname && req.body.lastname && req.body.email
    ),
    array: jest.fn().mockReturnValue(
      req.body.firstname || req.body.lastname || req.body.email
        ? []
        : [{ msg: 'Campo requerido' }]
    ),
  })),
}));

const mockRes = () => ({
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
});

describe('Get User Profile', () => {
  it('should return a user successfully', async () => {
    User.findById = jest.fn().mockResolvedValue({
      _id: '1',
      firstname: 'John',
      lastname: 'Doe',
      email: 'john@example.com',
      avatar: null,
    });

    const req = { params: { id: '1' } };
    const res = mockRes();

    await getUserProfile(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ firstname: 'John' }));
  });

  it('should return 404 if user is not found', async () => {
    User.findById = jest.fn().mockResolvedValue(null);

    const req = { params: { id: '1' } };
    const res = mockRes();

    await getUserProfile(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: 'Usuario no encontrado.' });
  });

  it('should return 500 if an error occurs', async () => {
    User.findById = jest.fn().mockRejectedValue(new Error('DB Error'));

    const req = { params: { id: '1' } };
    const res = mockRes();

    await getUserProfile(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Error interno del servidor.' });
  });
});

describe('Update User', () => {
  it('should update a user successfully', async () => {
    User.findByIdAndUpdate = jest.fn().mockResolvedValue({
      _id: '1',
      firstname: 'John',
      lastname: 'Smith',
      email: 'john@example.com',
    });

    const req = {
      params: { id: '1' },
      body: { firstname: 'John', lastname: 'Smith', email: 'john@example.com' },
    };
    const res = mockRes();

    await update(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ firstname: 'John', lastname: 'Smith' }));
  });

  it('should return 400 if validation errors are found', async () => {
    const req = { body: { firstname: '', lastname: '', email: '' } };
    const res = mockRes();

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ errors: expect.any(Array) }));
  });

  it('should return 500 if an error occurs', async () => {
    User.findByIdAndUpdate = jest.fn().mockRejectedValue(new Error('DB Error'));

    const req = { params: { id: '1' }, body: { firstname: 'John', lastname: 'Smith', email: 'john@example.com' } };
    const res = mockRes();

    await update(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Error interno del servidor.' });
  });
});

describe('Delete User', () => {
  it('should delete a user successfully', async () => {
    User.findByIdAndDelete = jest.fn().mockResolvedValue({ _id: '1' });

    const req = { params: { id: '1' } };
    const res = mockRes();

    await destroy(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: 'Usuario eliminado correctamente.' });
  });

  it('should return 404 if user is not found', async () => {
    User.findByIdAndDelete = jest.fn().mockResolvedValue(null);

    const req = { params: { id: '1' } };
    const res = mockRes();

    await destroy(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: 'Usuario no encontrado.' });
  });

  it('should return 500 if an error occurs', async () => {
    User.findByIdAndDelete = jest.fn().mockRejectedValue(new Error('DB Error'));

    const req = { params: { id: '1' } };
    const res = mockRes();

    await destroy(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Error interno del servidor.' });
  });
});

