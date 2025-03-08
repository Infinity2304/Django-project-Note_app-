import React, { useState } from 'react'
import toast from "react-hot-toast"

const useAddNotes = () => {
  const [loading, setLoading] = useState(false);

  const add = async ({ title, description }) => {
    setLoading(true)
    try {
      const res = await fetch("api/notes/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description })
      })

      if (!res.ok) {
          const errorData = await res.json();
          if (errorData.title && errorData.title.length > 0){
            throw new Error(errorData.title[0]);
          }
          if (errorData.description && errorData.description.length > 0){
            throw new Error(errorData.description[0]);
          }
      }
      const data = await res.json();
      console.log("add note message ",data);
      toast.success("Note Saved")
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }


  return { loading, add };
}

export default useAddNotes
