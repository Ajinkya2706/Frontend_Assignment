import { useEffect, useState } from 'react';

const defaultState = { title: '', body: '', tags: '', pinned: false };

const NoteForm = ({ onSubmit, activeNote, loading, onCancel }) => {
  const [form, setForm] = useState(defaultState);

  useEffect(() => {
    if (activeNote) {
      setForm({
        title: activeNote.title || '',
        body: activeNote.body || '',
        tags: (activeNote.tags || []).join(', '),
        pinned: Boolean(activeNote.pinned),
      });
    } else {
      setForm(defaultState);
    }
  }, [activeNote]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      title: form.title.trim(),
      body: form.body.trim(),
      pinned: form.pinned,
      tags: form.tags
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
    };
    onSubmit(payload, !!activeNote);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-900">{activeNote ? 'Edit note' : 'New note'}</h3>
        <label className="flex items-center gap-2 text-sm text-amber-700">
          <input type="checkbox" name="pinned" checked={form.pinned} onChange={handleChange} />
          Pin
        </label>
      </div>
      <input
        name="title"
        value={form.title}
        onChange={handleChange}
        required
        placeholder="Title"
        className="w-full rounded-lg border border-slate-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
      />
      <textarea
        name="body"
        value={form.body}
        onChange={handleChange}
        rows="3"
        placeholder="Add details..."
        className="w-full rounded-lg border border-slate-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500 resize-none"
      />
      <input
        name="tags"
        value={form.tags}
        onChange={handleChange}
        placeholder="Tags (comma separated)"
        className="w-full rounded-lg border border-slate-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
      />
      <div className="flex gap-3">
        <button
          type="submit"
          disabled={!form.title || loading}
          className="rounded-lg bg-sky-600 text-white px-4 py-2 font-semibold hover:bg-sky-700 transition disabled:opacity-60"
        >
          {loading ? 'Saving...' : activeNote ? 'Update' : 'Create'}
        </button>
        {activeNote && (
          <button
            type="button"
            onClick={() => {
              setForm(defaultState);
              onCancel?.();
            }}
            className="rounded-lg px-4 py-2 font-semibold border border-slate-200 text-slate-700 hover:bg-slate-50"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default NoteForm;

