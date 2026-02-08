import React, { useEffect, useState } from 'react'
import axios from "axios";
const App = () => {

  const [note, setNote] = useState([
    {
      title: "Sample Note1",
      content: "This is the content of sample note 1."
    },
    {
      title: "Sample Note2",
      content: "This is the content of sample note 2."
    },
    {
      title: "Sample Note3",
      content: "This is the content of sample note 3."
    },
    {
      title: "Sample Note4",
      content: "This is the content of sample note 4."
    }
  ])

  console.log("hello");

  function fetchNotes() {
    axios.get("https://day8-h4tt.onrender.com/api/notes")
      .then((res) => {
        console.log(res.data);
        setNote(res.data.note);
      })
  }

  useEffect(() => {
    fetchNotes();
  }, [])

  function handleSubmit(e) {
    e.preventDefault();
    const { title, content } = e.target.elements;
    console.log(title.value, content.value);

    axios.post("https://day8-h4tt.onrender.com/api/notes", {
      title: title.value,
      content: content.value})
      .then((res) => {
        console.log(res.data);
        fetchNotes();
      })

  }

  function handleDelteNote(noteId) {
    console.log(noteId);
    axios.delete("https://day8-h4tt.onrender.com/api/notes/" + noteId)
      .then((res) => {
        console.log(res.data);
        fetchNotes();
      })
  }

  return (
    <>
      <form className='create-note' onSubmit={handleSubmit}>
        <input name='title' type="text" placeholder='title' />
        <input name='content' type="text" placeholder='content' />
        <button>create note</button>
      </form>

      <div className="notes">
        {
          note.map((noteItem, index) => (
            <div className="note">
              <h1>{noteItem.title}</h1>
              <p>{noteItem.content}</p>
              <button onClick={() => handleDelteNote(noteItem._id)}>Delete</button>
            </div>))
        }

      </div>
    </>
  )
}


export default App