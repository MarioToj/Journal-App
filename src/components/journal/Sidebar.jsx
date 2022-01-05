

import React from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { logoutAction } from '../../actions/auth'
import { startNewNote } from '../../actions/notes'
import { JournalEntries } from './JournalEntries'

export const Sidebar = () => {

    const { name } = useSelector(state => state.auth)

    const dispatch = useDispatch()

    const handleLogout = () => {

        dispatch( logoutAction() )
    }

    const hanldeAddNew = () => {

        dispatch( startNewNote() )
    }

    return (
        
        <aside className="journal__sidebar">

            <div className="journal__sidebar-navbar">

                <h3 className="mt-5">
                    <i className="far fa-moon"></i>
                    <span>{ name }</span>

                </h3>

                <button 
                onClick= { handleLogout }
                className="btn">
                    Logout
                </button>

            </div>

            <div 
            className="journal__new-entry"
            onClick= { hanldeAddNew }>
                <i className="far fa-calendar-plus fa-5x"></i>
                <p className="mt-5"> New Entry</p>
            </div>

            <JournalEntries/>

        </aside>

    )
}
