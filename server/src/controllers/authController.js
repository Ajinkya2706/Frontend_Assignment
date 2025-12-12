import jwt from 'jsonwebtoken';
import Joi from 'joi';
import User from '../models/User.js';

const signupSchema = Joi.object({
  name: Joi.string().min(2).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const createToken = (user) =>
  jwt.sign({ id: user._id, email: user.email, name: user.name }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });

export const register = async (req, res, next) => {
  try {
    const payload = await signupSchema.validateAsync(req.body, { abortEarly: false });
    const exists = await User.findOne({ email: payload.email });
    if (exists) return res.status(400).json({ message: 'Email already registered' });

    const user = await User.create(payload);
    const token = createToken(user);
    return res.status(201).json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    return next(err.isJoi ? { status: 400, message: err.message } : err);
  }
};

export const login = async (req, res, next) => {
  try {
    const payload = await loginSchema.validateAsync(req.body, { abortEarly: false });
    const user = await User.findOne({ email: payload.email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const match = await user.matchPassword(payload.password);
    if (!match) return res.status(400).json({ message: 'Invalid credentials' });

    const token = createToken(user);
    return res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    return next(err.isJoi ? { status: 400, message: err.message } : err);
  }
};

