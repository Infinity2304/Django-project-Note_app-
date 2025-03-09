import { useEffect, useState } from 'react'
import Note from './component/Note'
import './App.css'
import useNotes from './hooks/useNotes';
import toast, { Toaster } from 'react-hot-toast';

function App() {

  const [notes, setNotes] = useState([]);
  const [rendering, setRendering] = useState(false);
  const [inputs, setInputs] = useState({
    title: "",
    description: ""
  })

  const { loading, add } = useNotes();


  useEffect(() => {
    fetchNotes();
  }, [])

  const fetchNotes = async () => {
    setRendering(true)
    try {
      const response = await fetch('api/notes/');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setNotes(data);
    } catch (error) {
      toast.error(error.message);
      console.error(error);
    } finally {
      setRendering(false);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await add(inputs);
      fetchNotes();
      setInputs({
        title: '',
        description: '',
      });
    } catch (error) {
      console.error('Error adding note:', error);
    }
  }


  return (
    <>
      <div className='fixed inset-0 bg-slate-700 flex flex-col justify-center items-center'>
        <h1 className='text-green-700 label text-3xl font-bold p-4'>Notes App</h1>
        <div className='p-1'>
          <label className="input">
            <span className="label">Title</span>
            <input type="text" placeholder="" value={inputs.title} onChange={(e) => setInputs({ ...inputs, title: e.target.value })} />
          </label>
        </div>
        <div className='p-1'>
          <label className="input">
            <span className="label">Note</span>
            <input type="text" placeholder="" value={inputs.description} onChange={(e) => setInputs({ ...inputs, description: e.target.value })} />
          </label>
        </div>
        <button className="btn btn-active btn-success" disabled={rendering || !inputs.title || !inputs.description} onClick={handleSubmit}>Submit</button>
        <div className='Notes p-10 overflow-auto'>
          {notes.map((note) => <Note key={note.id} id={note.id} title={note.title} description={note.description} setNotes={setNotes} />)}
        </div>
      </div>
      <Toaster />
    </>
  )
}

export default App
