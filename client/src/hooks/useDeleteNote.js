import React, { useState } from 'react'
import toast from 'react-hot-toast';

const useDeleteNote = () => {
    const [loading, setLoading] = useState(false);

    const remove = async (id) => {
        setLoading(true)
        try {
            const res = await fetch(`api/notes/${id}`, {
                method: "DELETE",
            })
            // const data = await res.json();
            // console.log("delete note message ",data);
            toast.success("Note Removed")
        } catch (error) {
            toast.error(error.message)
            console.log(error);
        } finally {
            setLoading(false)
        }
    }
    return { loading, remove }
}

export default useDeleteNote
