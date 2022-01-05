import { types } from "../components/types/types"

export const setError = ( err ) => ({

    type: types.uisetError,
    payload: err
})

export const removeError = ( err ) => ({

    type: types.uiRemoveError,
    payload: err
})

export const startLoading =() => ({

    type: types.uiStartLoading
})

export const finishLoading =() => ({

    type: types.uiFinishLoading
})