const TopBar = ({ user, onLogout, query, setQuery, pinnedOnly, setPinnedOnly }) => (
  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
    <div>
      <p className="text-sm text-slate-500">Welcome</p>
      <h2 className="text-xl font-semibold text-slate-900">{user?.name}</h2>
    </div>
    <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
      <div className="flex items-center rounded-lg border border-slate-200 bg-white px-3 py-2 shadow-sm">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search notes..."
          className="outline-none w-44 sm:w-64"
        />
      </div>
      <button
        onClick={() => setPinnedOnly((prev) => !prev)}
        className={`rounded-lg px-4 py-2 font-semibold border shadow-sm ${
          pinnedOnly ? 'bg-amber-100 border-amber-200 text-amber-800' : 'bg-white border-slate-200 text-slate-700'
        }`}
      >
        {pinnedOnly ? 'Pinned only' : 'All notes'}
      </button>
      <button
        onClick={onLogout}
        className="rounded-lg px-4 py-2 font-semibold bg-slate-900 text-white hover:bg-slate-800 shadow-sm"
      >
        Logout
      </button>
    </div>
  </div>
);

export default TopBar;

