import { useEffect, useState } from 'react';

const ProfileCard = ({ profile, onSave, saving, message, error }) => {
  const [name, setName] = useState('');

  useEffect(() => {
    setName(profile?.name || '');
  }, [profile]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(name.trim());
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 space-y-3">
      <div>
        <p className="text-sm font-semibold text-sky-500 uppercase">Profile</p>
        <h3 className="text-lg font-semibold text-slate-900">Account</h3>
        <p className="text-sm text-slate-500">Update your display name.</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="text-sm font-medium text-slate-700">Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
            placeholder="Your name"
          />
        </div>
        <button
          type="submit"
          disabled={!name || saving}
          className="rounded-lg bg-slate-900 text-white px-4 py-2 font-semibold hover:bg-slate-800 transition disabled:opacity-60"
        >
          {saving ? 'Saving...' : 'Save'}
        </button>
      </form>
      {message && <p className="text-sm text-emerald-700 bg-emerald-50 border border-emerald-100 px-3 py-2 rounded-lg">{message}</p>}
      {error && <p className="text-sm text-rose-700 bg-rose-50 border border-rose-100 px-3 py-2 rounded-lg">{error}</p>}
    </div>
  );
};

export default ProfileCard;

