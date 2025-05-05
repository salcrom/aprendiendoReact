import 'bootstrap/dist/css/bootstrap.min.css'

import { Container, Row, Col, Button, Stack } from 'react-bootstrap'
import './App.css'
import { useStore } from './hooks/useStore'
import { AUTO_LANGUAGE } from './constants' // Fixed typo: constans -> constants
import { ArrowsIcon } from './Components/Icons'
import { LanguageSelector } from './Components/LanguageSelector'
import { SectionType } from './types.d'
import { TextArea } from './Components/TextArea'
import { useEffect, useState, useRef } from 'react'
import { translate } from './services/translate'

function App() {
  const { 
    loading,
    fromLanguage,
    toLanguage,
    fromText,
    result,
    interchangeLanguages,
    setFromLanguage,
    setToLanguage,
    setFromText,
    setResult,
    setLoading
  } = useStore()

  // Referencia para el botón de traducción manual
  const [isTranslating, setIsTranslating] = useState(false)
  const lastTranslationRef = useRef("")
  const translationTimeoutRef = useRef<number | null>(null)

  // Implementación de traducción automática con debounce
  useEffect(() => {
    // No traducir si no hay texto o si estamos en proceso de traducción manual
    if (fromText === '' || isTranslating) return
    
    // Si el texto actual es igual al último texto traducido, no hacemos nada
    if (fromText === lastTranslationRef.current) return
    
    // Limpiamos cualquier timeout pendiente antes de programar uno nuevo
    if (translationTimeoutRef.current) {
      clearTimeout(translationTimeoutRef.current)
    }
    
    // Programamos la traducción automática después de un tiempo de inactividad
    translationTimeoutRef.current = setTimeout(() => {
      setLoading(true)
      lastTranslationRef.current = fromText
      
      translate({ fromLanguage, toLanguage, text: fromText })
        .then((translatedText) => {
          if (translatedText) {
            setResult(translatedText)
          }
        })
        .catch((error) => {
          console.error('Error al traducir:', error)
          setResult('Error al traducir. Por favor, inténtalo de nuevo más tarde.')
        })
        .finally(() => {
          setLoading(false)
        })
    }, 1000) as unknown as number // Tiempo de espera antes de traducir automáticamente
  }, [fromText, fromLanguage, toLanguage])

  // Función para manejar la traducción manual
  const handleManualTranslate = () => {
    if (fromText === '' || isTranslating || fromText === lastTranslationRef.current) return
    
    setIsTranslating(true)
    setLoading(true)
    
    // Guardamos el texto actual para no volver a traducir lo mismo
    lastTranslationRef.current = fromText
    
    // Limpiamos cualquier traducción automática pendiente
    if (translationTimeoutRef.current) {
      clearTimeout(translationTimeoutRef.current)
    }
    
    // Hacemos la traducción
    translate({ fromLanguage, toLanguage, text: fromText })
      .then((translatedText) => {
        if (translatedText) {
          setResult(translatedText)
        }
      })
      .catch((error) => {
        console.error('Error al traducir:', error)
        setResult('Error al traducir. Por favor, inténtalo de nuevo más tarde.')
      })
      .finally(() => {
        setIsTranslating(false)
        setLoading(false)
      })
  }

  // Limpiamos cualquier timeout pendiente al desmontar el componente
  useEffect(() => {
    return () => {
      if (translationTimeoutRef.current) {
        clearTimeout(translationTimeoutRef.current)
      }
    }
  }, [])

  return (
    <Container fluid>
      <h2>Google Translate</h2>

      <Row>
        <Col>
          <Stack gap={2}>
            <LanguageSelector
              type={SectionType.From}
              value={fromLanguage}
              onChange={setFromLanguage} />
            <TextArea
              loading={loading}
              type={SectionType.From}
              value={fromText}
              onChange={setFromText}
            />
          </Stack>
        </Col>

        <Col xs='auto'>
          <Stack gap={2}>
            <Button 
              variant='link' 
              disabled={fromLanguage === AUTO_LANGUAGE} 
              onClick={interchangeLanguages}
            >
              <ArrowsIcon />
            </Button>
            
            {/* Botón de traducción manual */}
            <Button 
              variant='primary'
              disabled={isTranslating || fromText === '' || fromText === lastTranslationRef.current}
              onClick={handleManualTranslate}
            >
              Traducir
            </Button>
          </Stack>
        </Col>

        <Col>
          <Stack gap={2}>
            <LanguageSelector
              type={SectionType.To}
              value={toLanguage}
              onChange={setToLanguage} />
            <TextArea
              loading={loading}
              type={SectionType.To}
              value={result}
              onChange={setResult}
            />
          </Stack>
        </Col>
      </Row>
    </Container>
  )
}

export default App
