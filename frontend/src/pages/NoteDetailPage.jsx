import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router"; // Asegúrate de importar de react-router-dom
import api from "../lib/axios";
import toast, { LoaderIcon } from "react-hot-toast";
import { ArrowLeftIcon, Trash2Icon } from "lucide-react";

const NoteDetailPage = () => {
  const [note, setNote] = useState(null);
  // 1. CAMBIO AQUÍ: Arranca en true para que muestre el spinner de inmediato
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await api.get(`/notes/${id}`);
        setNote(res.data);
      } catch (error) {
        console.log("Error in fetching note", error);
        toast.error("Failed to fetch the note");
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;

    try {
      await api.delete(`/notes/${id}`);
      toast.success("Note deleted");
      navigate("/")
    } catch (error) {
      console.log("Error deleting notes", error)
      toast.error("Failed to delete note")
    }
  };
  const handleSave = async () => {
    if(!note.title.trim() || !note.content.trim ()) {
      toast.error("Please add a title or content");
      return;
    }
    setSaving(true)
    try {
      await api.put(`/notes/${id}`, note)
      toast.success("Note updated successfully");
      navigate("/");
    } catch (error) {
      console.log("Error updating notes", error)
      toast.error("Failed to updated note")
    } finally {
      setSaving(false)
    }
  };

  // Pantalla de carga
  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <LoaderIcon className="animate-spin size-10" />
      </div>
    );
  }

  // 2. CAMBIO AQUÍ: "Escudo" protector. Si terminó de cargar pero no hay nota, mostramos un error en vez de crashear.
  if (!note) {
    return (
      <div className="min-h-screen bg-base-200 flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold mb-4">Note not found</h2>
        <Link to="/" className="btn btn-primary">
          Go back home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {" "}
          {/* Corregí un typo aquí: decía .maxw-2xl */}
          <div className="flex items-center justify-between mb-6">
            <Link to="/" className="btn btn-ghost">
              <ArrowLeftIcon className="h-5 w-5" />
              Back to Notes
            </Link>
            <button
              onClick={handleDelete}
              className="btn btn-error btn-outline"
            >
              <Trash2Icon className="h-5 w-5" /> {/* Corregí g-5 a h-5 */}
              Delete Note
            </button>
          </div>
<div className="card bg-base-100">
            <div className="card-body">
              
              {/* --- AQUÍ VUELVE EL TÍTULO --- */}
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input
                  type="text"
                  placeholder="Note title"
                  className="input input-bordered"
                  value={note.title}
                  onChange={(e) => setNote({ ...note, title: e.target.value })}
                />
              </div>

              {/* --- AQUÍ ESTÁ TU CONTENIDO --- */}
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Content</span>
                </label>
                <textarea
                  placeholder="Write your note here..."
                  className="textarea textarea-bordered h-32"
                  value={note.content}
                  onChange={(e) =>
                    setNote({ ...note, content: e.target.value })
                  }
               />
              </div>
              
              {/* --- AQUÍ ESTÁ EL BOTÓN DE GUARDAR --- */}
              <div className="card-actions justify-end">
                <button className="btn btn-primary" disabled={saving} onClick={handleSave}>
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>

            </div> {/* Cierre correcto del card-body */}
          </div> {/* Cierre correcto del card */}
        </div>
      </div>
    </div>
  );
};

export default NoteDetailPage;
