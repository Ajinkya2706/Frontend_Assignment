const NoteCard = ({ note, onEdit, onDelete }) => (
  <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm flex flex-col gap-3">
    <div className="flex items-start justify-between gap-3">
      <div>
        <div className="flex items-center gap-2">
          <h4 className="text-lg font-semibold text-slate-900">{note.title}</h4>
          {note.pinned && (
            <span className="text-amber-700 text-xs font-semibold bg-amber-100 px-2 py-0.5 rounded-full">Pinned</span>
          )}
        </div>
        <p className="text-slate-600 text-sm mt-1 whitespace-pre-wrap">{note.body}</p>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => onEdit(note)}
          className="px-3 py-1 rounded-lg text-sm font-semibold border border-slate-200 hover:bg-slate-50"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(note._id)}
          className="px-3 py-1 rounded-lg text-sm font-semibold bg-rose-50 text-rose-700 border border-rose-100 hover:bg-rose-100"
        >
          Delete
        </button>
      </div>
    </div>
    <div className="flex items-center justify-between text-xs text-slate-500">
      <div className="flex gap-2 flex-wrap">
        {(note.tags || []).map((tag) => (
          <span key={tag} className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full">
            #{tag}
          </span>
        ))}
      </div>
      <span>{new Date(note.updatedAt).toLocaleString()}</span>
    </div>
  </div>
);

export default NoteCard;

