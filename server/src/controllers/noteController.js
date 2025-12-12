import Joi from 'joi';
import Note from '../models/Note.js';

const noteSchema = Joi.object({
  title: Joi.string().min(1).required(),
  body: Joi.string().allow(''),
  tags: Joi.array().items(Joi.string()),
  pinned: Joi.boolean(),
});

export const list = async (req, res, next) => {
  try {
    const { q, tag, pinned } = req.query;
    const filter = { userId: req.user.id };
    if (q) filter.title = { $regex: q, $options: 'i' };
    if (tag) filter.tags = tag;
    if (pinned !== undefined) filter.pinned = pinned === 'true';

    const notes = await Note.find(filter).sort({ updatedAt: -1 });
    return res.json(notes);
  } catch (err) {
    return next(err);
  }
};

export const create = async (req, res, next) => {
  try {
    const payload = await noteSchema.validateAsync(req.body, { abortEarly: false });
    const note = await Note.create({ ...payload, userId: req.user.id });
    return res.status(201).json(note);
  } catch (err) {
    return next(err.isJoi ? { status: 400, message: err.message } : err);
  }
};

export const update = async (req, res, next) => {
  try {
    const payload = await noteSchema.validateAsync(req.body, { abortEarly: false });
    const note = await Note.findOneAndUpdate({ _id: req.params.id, userId: req.user.id }, payload, {
      new: true,
    });
    if (!note) return res.status(404).json({ message: 'Note not found' });
    return res.json(note);
  } catch (err) {
    return next(err.isJoi ? { status: 400, message: err.message } : err);
  }
};

export const remove = async (req, res, next) => {
  try {
    const note = await Note.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!note) return res.status(404).json({ message: 'Note not found' });
    return res.json({ success: true });
  } catch (err) {
    return next(err);
  }
};

