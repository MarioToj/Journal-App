import { addDoc, collection, deleteDoc, doc, updateDoc } from "@firebase/firestore"
import Swal from "sweetalert2"
import { types } from "../components/types/types"
import { db } from "../firebase/firebase-config"
import { fileUpload } from "../helpers/fileUpload"
import { loadNotes } from "../helpers/loadNotes"


export const startNewNote = () => {

    
    return async ( dispatch, getState ) => {

        const uid = getState().auth.uid
        
        const newNote = {

            title: '',
            body: '',
            date: new Date().getTime()
        }
        //console.log(uid);

        const doc = await addDoc(collection(db, `${ uid }`, "journal/notes"),{
            title: '',
            body: '',
            date: new Date().getTime()
        });
        
        dispatch( activeNote( doc.id, newNote ) )
        dispatch( addNewNote( doc.id, newNote ) )

    }
}

export const activeNote = ( id, notes ) => ({

    type: types.notesActive,
    payload: {
        id,
        ...notes
    }
})

export const addNewNote = ( id, notes ) => ({

    type: types.notesAddNew,
    payload: {
        id,
        ...notes
    }
})


export const setNotes = (notes) => ({

    type: types.notesLoad,
    payload: notes
})

export const startSaveNotes = (note) => {

   return async ( dispatch, getState ) => {

        const { uid } = getState().auth

        if (!note.url) {
            
            delete note.url
        }

        const noteToFirestore = { ...note }
        delete noteToFirestore.id

        const noteRef = doc(db, `${uid}/journal/notes/${note.id}`)
        await updateDoc(noteRef,noteToFirestore);

        dispatch( refreshNote( note.id, noteToFirestore ) )
        Swal.fire( 'Saved', note.title, 'success' )
   }    
}

export const refreshNote = ( id, note ) => ({

    type: types.notesUpdated,

    payload: {

        id, 
        note: {

            id, 
            ...note
        }
    }
})

export const startUploading = ( file ) => {

    return async ( dispatch, getState ) => {

        const { active:activeNote } = getState().notes


        Swal.fire({

            title: 'Uploading...',
            text: 'Please Wait...',
            allowOutsideClick: false,
            allowBeforeOpen: () => {

                Swal.showLoading()
            }
        })

        const fileUrl = await fileUpload( file )
        activeNote.url = fileUrl

        dispatch( startSaveNotes( activeNote ) )

        Swal.close()

    }

} 


export const startDeleting = (id)=>{
    return async(dispatch, getState) => {
 
        const uid = getState().auth.uid;
        const noteRef = doc(db, `${uid}/journal/notes/${id}`)
        await deleteDoc(noteRef);
 
        dispatch(deleteNote(id));
    }
}

export const deleteNote = (id) => ({

    type: types.notesDelete,
    payload: id
})

export const noteLogout = () => ({

    type: types.notesLogoutCleaning,
})

