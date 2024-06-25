import { useReducer } from 'react'
import { AUTO_LANGUAGE } from '../constants'
import { type FromLanguage, type Language, type Action, type State } from '../types'

// 1. Creo el initialState
const initialState: State = {
    fromLanguage: 'auto',
    toLanguage: 'en',
    fromText: '',
    result: '',
    loading: false
}

// 2. Creo la funcion a reducer la cual va a disparar la accion y devolver el estado
function reducer(state: State, action: Action) {
    const { type } = action

    if (type === 'INTERCHANGE_LANGUAGES') {
        // Escribo la lógica del estado dentro del reducer asi lo evitamos en los componentes
        if (state.fromLanguage === AUTO_LANGUAGE) return state
        const loading = state.fromText !== ''
        return {
            ...state,
            loading,
            result: '',
            fromLanguage: state.toLanguage,
            toLanguage: state.fromLanguage
        }
    }
    if (type === 'SET_FROM_LANGUAGE') {
        if (state.fromLanguage === action.payload) return state
        const loading = state.fromText !== ''
        return {
            ...state,
            fromLanguage: action.payload,
            result: '',
            loading
        }
    }
    if (type === 'SET_TO_LANGUAGE') {
        if (state.toLanguage === action.payload) return state
        const loading = state.fromText !== ''
        return {
            ...state,
            toLanguage: action.payload,
            result: '',
            loading
        }
    }
    if (type === 'SET_FROM_TEXT') {
        const loading = action.payload !== ''
        return {
            ...state,
            loading,
            fromText: action.payload,
            result: ''
        }
    }
    if (type === 'SET_RESULT') {
        return {
            ...state,
            loading: false,
            result: action.payload
        }
    }
    // Si no es nunguno de los tipos devuelvo el estado 
    return state
}

export function useStore() {
    // 3. usar el hook useReducer 
    const [{
        fromLanguage,
        toLanguage,
        fromText,
        result,
        loading
    }, dispatch] = useReducer(reducer, initialState)

    // Creo las funciones dentro de mi hook para poder utilizarlas en los componentes que necesito
    // Estas funciones se crean porque nunca hay que devolver el dispatch o la funcion para actualizar
    // el estado del hook, ya que un hook sirve para encapsular la logica y separarla
    const interchangeLanguages = () => {
        dispatch({ type: 'INTERCHANGE_LANGUAGES' })
    }

    const setFromLanguage = (payload: FromLanguage) => {
        dispatch({ type: 'SET_FROM_LANGUAGE', payload })
    }

    const setToLanguage = (payload: Language) => {
        dispatch({ type: 'SET_TO_LANGUAGE', payload })
    }

    const setFromText = (payload: string) => {
        dispatch({ type: 'SET_FROM_TEXT', payload })
    }

    const setResult = (payload: string) => {
        dispatch({ type: 'SET_RESULT', payload })
    }

    // Al devolver las funciones que cree en vez del dispatch cuando necesite hacer alguna modificacion
    // las partes de mi app que usen el hook nunca se van a enterar ya que la logica cumple con la regla de abstracción 

    return {
        fromLanguage,
        toLanguage,
        fromText,
        result,
        loading,
        interchangeLanguages,
        setFromLanguage,
        setToLanguage,
        setFromText,
        setResult
    }
}