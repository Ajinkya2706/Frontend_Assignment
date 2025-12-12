import { useEffect, useMemo, useState } from 'react';
import TopBar from '../components/TopBar';
import NoteForm from '../components/NoteForm';
import NoteCard from '../components/NoteCard';
import ProfileCard from '../components/ProfileCard';
import { useAuth } from '../context/AuthContext';
import { listNotes, createNote, updateNote, deleteNote } from '../services/noteService';
import { fetchProfile } from '../services/authService';

const DashboardPage = () => {
  const { user, logout } = useAuth();
  const [profile, setProfile] = useState(user);
  const [profileSaving, setProfileSaving] = useState(false);
  const [profileMsg, setProfileMsg] = useState('');
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeNote, setActiveNote] = useState(null);
  const [formKey, setFormKey] = useState(0);
  const [query, setQuery] = useState('');
  const [pinnedOnly, setPinnedOnly] = useState(false);
  const [error, setError] = useState('');

  const filters = useMemo(() => ({ q: query, pinned: pinnedOnly ? true : undefined }), [query, pinnedOnly]);

  const loadNotes = async () => {
    setLoading(true);
    try {
      const data = await listNotes(filters);
      setNotes(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load notes');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile().then(setProfile).catch(() => setProfile(user));
  }, [user]);

  useEffect(() => {
    loadNotes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, pinnedOnly]);

  const handleSave = async (payload, isEdit) => {
    setSaving(true);
    try {
      if (isEdit && activeNote) {
        await updateNote(activeNote._id, payload);
      } else {
        await createNote(payload);
        setFormKey((n) => n + 1); // reset form after create
      }
      setActiveNote(null);
      await loadNotes();
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to save note');
    } finally {
      setSaving(false);
    }
  };

  const handleProfileSave = async (name) => {
    setProfileSaving(true);
    setProfileMsg('');
    setError('');
    try {
      const updated = await updateProfile({ name });
      setProfile(updated);
      setProfileMsg('Profile updated');
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to update profile');
    } finally {
      setProfileSaving(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteNote(id);
      loadNotes();
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to delete');
    }
  };

  return (
    <div className="min-h-screen p-6 md:p-10">
      <div className="max-w-6xl mx-auto space-y-6">
        <TopBar
          user={profile}
          onLogout={logout}
          query={query}
          setQuery={setQuery}
          pinnedOnly={pinnedOnly}
          setPinnedOnly={setPinnedOnly}
        />
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
          <div className="space-y-4">
            <ProfileCard
              profile={profile}
              onSave={handleProfileSave}
              saving={profileSaving}
              message={profileMsg}
              error={error && !profileMsg ? error : ''}
            />
            <NoteForm
              key={formKey}
              onSubmit={handleSave}
              activeNote={activeNote}
              loading={saving}
              onCancel={() => setActiveNote(null)}
            />
          </div>
          <div className="xl:col-span-2 space-y-4">
            {error && <div className="bg-rose-50 border border-rose-100 text-rose-700 px-4 py-3 rounded-xl">{error}</div>}
            {loading ? (
              <div className="bg-white border border-slate-100 rounded-2xl p-6 text-center text-slate-500">Loading...</div>
            ) : notes.length === 0 ? (
              <div className="bg-white border border-slate-100 rounded-2xl p-6 text-center text-slate-500">
                No notes yet. Create your first one.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {notes.map((note) => (
                  <NoteCard
                    key={note._id}
                    note={note}
                    onEdit={(n) => setActiveNote(n)}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;

