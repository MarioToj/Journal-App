
import { getAuth, onAuthStateChanged } from '@firebase/auth'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Routes, Route } from 'react-router-dom'
import { JournalScreen } from '../components/journal/JournalScreen'
import { AuthRouter } from './AuthRouter'
import { login } from '../actions/auth'
import { PublicRoute } from './PublicRoute'
import { PrivateRoute } from './PrivateRoute'
import { loadNotes } from '../helpers/loadNotes'
import { setNotes } from '../actions/notes'


export const AppRouter = () => {

    const [checking, setChecking] = useState(true)

    const [isLoggedIn, setIsLoggedIn] = useState(false)

    const dispatch = useDispatch()

    useEffect(() => {
        
        const auth = getAuth();
        onAuthStateChanged(auth, async (user) =>{

            if (user?.uid) {
                dispatch(login( user.uid, user.displayName ))
                setIsLoggedIn(true)

                const notes = await loadNotes( user.uid )
                dispatch( setNotes( notes ) )

            }else{

                setIsLoggedIn(false)
            }
            
            setChecking( false )

        })
        
    }, [ dispatch, setChecking ])

    if (checking) {
       
       return ( <h1>Espere...</h1>)
    }

    return (

        <Routes>

                <Route
                    path="/*"
                    element={
                        <PublicRoute isAuth={isLoggedIn}>
                            <AuthRouter />
                        </PublicRoute>
                            }
                />

            
            <Route path='/' element={
            <PrivateRoute isAuth={ isLoggedIn }>

                <JournalScreen/>
            </PrivateRoute>}/>


            <Route path='*' element={<AuthRouter/>}/>

        </Routes>

    )
}


