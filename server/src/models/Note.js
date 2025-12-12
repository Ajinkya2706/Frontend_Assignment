import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true, trim: true },
    body: { type: String, default: '' },
    tags: [{ type: String }],
    pinned: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model('Note', noteSchema);

