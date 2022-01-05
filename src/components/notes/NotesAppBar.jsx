import React from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { startSaveNotes, startUploading } from '../../actions/notes'

export const NotesAppBar = () => {

    const dispatch = useDispatch()

    const { active } = useSelector(state => state.notes)

    const handleSave = () => {

       
        dispatch( startSaveNotes( active ) )
    }

    const handlePicture = () => {

        document.querySelector( '#fileSelector' ).click()
    }

    const hanldeFileChange = (e) => {

        const file = e.target.files[0]

        if (file) {
            
            dispatch( startUploading( file ) )
        }
    }
 
    return (
        <div className="notes__appbar">
            
            <span>23 julio 2021</span>

            <input type="file"
            id='fileSelector'
            name="file"
            style={{ display: 'none' }}
            onChange={ hanldeFileChange } />

            <div>
                <button 
                onClick= { handlePicture }
                className="btn">
                    picture
                </button>

                <button 
                onClick={ handleSave }
                className="btn">
                    Save
                </button>
            </div>
        </div>
    )
}
