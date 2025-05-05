import { useReducer } from 'react'

import { Action, FromLanguage, Language, State } from '../types.d'
import { AUTO_LANGUAGE } from '../constans'

// Estado inicial
const initialState: State = {
  fromLanguage: 'auto',
  toLanguage: 'en',
  fromText: '',
  result: '',
  loading: false
}

// Reducer para manejar las acciones
function reducer(state: State, action: Action) {
  const { type } = action

  if (type === 'INTERCHANGE_LANGUAGES') {
    // Si el idioma de origen es "auto", no podemos intercambiar
    if (state.fromLanguage === AUTO_LANGUAGE) return state

    // Intercambiamos idiomas y textos
    return {
      ...state,
      fromLanguage: state.toLanguage,
      toLanguage: state.fromLanguage as Language,
      fromText: state.result,
      result: state.fromText
    }
  }

  if (type === 'SET_FROM_LANGUAGE') {
    return {
      ...state,
      fromLanguage: action.payload,
      // Si cambiamos a "auto", limpiamos el resultado
      result: action.payload === state.toLanguage ? '' : state.result
    }
  }

  if (type === 'SET_TO_LANGUAGE') {
    return {
      ...state,
      toLanguage: action.payload,
      // Si el nuevo idioma destino es igual al de origen, limpiamos el resultado
      result: action.payload === state.fromLanguage ? '' : state.result
    }
  }

  if (type === 'SET_FROM_TEXT') {
    return {
      ...state,
      loading: true,
      fromText: action.payload,
      // Limpiamos el resultado si se cambia el texto de origen
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

  if (type === 'SET_LOADING') {
    return {
      ...state,
      loading: action.payload
    }
  }

  return state
}

// Hook personalizado que exportamos
export function useStore() {
  const [state, dispatch] = useReducer(reducer, initialState)

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

  const interchangeLanguages = () => {
    dispatch({ type: 'INTERCHANGE_LANGUAGES' })
  }

  const setLoading = (payload: boolean) => {
    dispatch({ type: 'SET_LOADING', payload })
  }

  return {
    ...state,
    setFromLanguage,
    setToLanguage,
    setFromText,
    setResult,
    interchangeLanguages,
    setLoading
  }
}
