import React, { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { activeNote, startDeleting } from '../../actions/notes'
import { useForm } from '../../hooks/useForm'
import { NotesAppBar } from './NotesAppBar'

export const NoteScreen = () => {

    const dispatch = useDispatch()

    const { active } = useSelector(state => state.notes)

   const [formValue, handleInputChange, reset] = useForm(active)

   const { body, title, id } = formValue

   const activeId = useRef( active.id )

   useEffect(() => {
       
        if (active.id !== activeId.current) {
            reset( active )

            activeId.current = active.id
        }
   }, [active, reset])

   useEffect(() => {

        dispatch( activeNote( formValue.id, { ...formValue } ) )

   }, [formValue])

   const handleDelete= () => {

    dispatch( startDeleting( id ) )
   }

    return (
        <div className="notes__main-content">
            
            <NotesAppBar/>

            <div className="notes__content">

                <input type="text"
                placeholder="Some awesome title"
                className="notes__title-input"
                autoComplete="off"
                name='title'
                 value={ title }
                 onChange={ handleInputChange }/>

                 <textarea 
                 placeholder='Body'
                 className="note__textarea"
                 name='body'
                 value={ body }
                 onChange={ handleInputChange }>
                     
                 </textarea>

               {  
               
                (active.url ) 
                
                &&

               (<div className="notes__image">
                     <img src={active.url }
                     alt="Law" />
                 </div>)
                }
            </div>

            <button 
            className="btn btn-danger"
            onClick={ handleDelete }
            >
                Delete
            </button>

        </div>
    )
}
