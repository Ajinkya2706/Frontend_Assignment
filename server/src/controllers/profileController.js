import Joi from 'joi';
import User from '../models/User.js';

const updateSchema = Joi.object({
  name: Joi.string().min(2),
});

export const getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    return res.json(user);
  } catch (err) {
    return next(err);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const payload = await updateSchema.validateAsync(req.body, { abortEarly: false });
    const user = await User.findByIdAndUpdate(req.user.id, payload, { new: true }).select('-password');
    return res.json(user);
  } catch (err) {
    return next(err.isJoi ? { status: 400, message: err.message } : err);
  }
};

