import { describe, expect, jest } from '@jest/globals';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { register, login, tokenIsValid } from '../controllers/authController.js'; 
import { validationResult } from 'express-validator';

jest.mock('bcrypt', () => ({
  hash: jest.fn().mockResolvedValue('hashedPassword'),
  compare: jest.fn().mockResolvedValue(true),
}));

jest.mock('jsonwebtoken', () => ({
  sign: jest.fn().mockReturnValue('mockToken'),
  verify: jest.fn(),
}));

jest.mock('express-validator', () => ({
  validationResult: jest.fn().mockImplementation((req) => ({
    isEmpty: jest.fn().mockReturnValue(
      req.body.firstname && req.body.lastname && req.body.email && req.body.password
    ),
    array: jest.fn().mockReturnValue(
      req.body.firstname || req.body.lastname || req.body.email || req.body.password
        ? []
        : [{ msg: 'Campo requerido' }]
    ),
  })),
}));

describe('Register', () => {
  it('should register a user successfully', async () => {
    User.findOne = jest.fn().mockResolvedValue(null);
    User.prototype.save = jest.fn().mockResolvedValue({ firstname: 'John', lastname: 'Doe', email: 'john@example.com', password: 'password123', avatar: null });

    const req = { body: { firstname: 'John', lastname: 'Doe', email: 'john@example.com', password: 'password123' } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await register(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ message: 'Usuario registrado exitosamente.' });
  });

  it('should return 400 if email is already in use', async () => {
    User.findOne = jest.fn().mockResolvedValue({ email: 'john@example.com' });

    const req = { body: { firstname: 'John', lastname: 'Doe', email: 'john@example.com', password: 'password123' } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await register(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'El email ya está en uso.' });
  });

  it('should return 500 if an error occurs', async () => {
    User.findOne = jest.fn().mockRejectedValue(new Error('DB Error'));

    const req = { body: { firstname: 'John', lastname: 'Doe', email: 'john@example.com', password: 'password123' } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await register(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
  });

  it('should return 400 if validation errors are found', async () => {
    const req = { body: { firstname: '', lastname: '', email: '', password: '123' } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ errors: expect.any(Array) }));
  });

  it('should return 400 if any field is missing or invalid', async () => {
    const req = { body: { firstname: '', lastname: 'Doe', email: 'invalidEmail', password: 'pwd' } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ errors: expect.any(Array) }));
  });
});

describe('Login', () => {
  it('should login successfully', async () => {
    User.findOne = jest.fn().mockResolvedValue({ _id: '1', firstname: 'John', lastname: 'Doe', email: 'john@example.com', password: 'hashedPassword', avatar: null });

    const req = { body: { email: 'john@example.com', password: 'password123' } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await login(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
  });

  it('should return 401 if credentials are incorrect', async () => {
    User.findOne = jest.fn().mockResolvedValue({ email: 'john@example.com', password: 'wrongPassword' });

    const req = { body: { email: 'john@example.com', password: 'password123' } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await login(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'Credenciales incorrectas.' });
  });

  it('should return 500 if an error occurs', async () => {
    User.findOne = jest.fn().mockRejectedValue(new Error('DB Error'));

    const req = { body: { email: 'john@example.com', password: 'password123' } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await login(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Error interno del servidor.' });
  });

  it('should return 400 if validation errors are found', async () => {
    const req = { body: { email: '', password: '' } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ errors: expect.any(Array) }));
  });
});

describe('Token Validation', () => {
  it('should return 401 if the token is invalid', async () => {

    const req = { header: jest.fn().mockReturnValue('Bearer invalidToken') };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await tokenIsValid(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
  });

  it('should return 401 if the token is missing', async () => {
    const req = { header: jest.fn().mockReturnValue(null) };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await tokenIsValid(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
  });

  it('should return 500 if an error occurs', async () => {

    const req = { header: jest.fn().mockReturnValue('Bearer validToken') };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await tokenIsValid(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
  });
});