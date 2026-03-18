import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from "react-router";
import api from "../lib/axios";
import toast, { LoaderIcon } from "react-hot-toast";
import { ArrowLeftIcon, Trash2Icon } from "lucide-react";

const NoteDetailPage = () => {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await api.get(`/notes/${id}`)
        setNote(res.data)
      } catch (error) {
        console.log("Error in fetching note", error)
        toast.error("Failed to fetch the note")
      } finally {
        setLoading(false)
      }
    };

    fetchNote();
  }, [id]);


  const handleDelete = () => {};

  if (loading) {
    return (
      <div className='min-h-screen bg-base-200 flex items-center justify-center'>
        <LoaderIcon className='animate-spin size-10' />
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-base-200'>
      <div className='container mx-auto px-4 py-8'>
        <div className='flex items-center justify-between mb-6'>
          <Link to="/" className='btn btn-ghost'>
            <ArrowLeftIcon className="h-5 w-5" />
            Back to Notes
          </Link>
          <button onClick={handleDelete} className='btn btn-error btn-outline'>
            <Trash2Icon className='g-5 w-5' />
            Delete Note
          </button>
        </div>
      </div>
    </div>
  )
}

export default NoteDetailPage