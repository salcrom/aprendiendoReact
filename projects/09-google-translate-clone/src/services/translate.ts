import OpenAI from 'openai'
import type { ChatCompletionMessageParam } from 'openai/resources/chat/completions'
import { SUPPORTED_LANGUAGES } from '../constans'
import { type FromLanguage, type Language } from '../types.d'

// No publicar esto o se colará la API en el cliente
// Esto lo hacemos porque en este curso nos enfocamos
// en REACT y TYPESCRIPT
// SE DEBE CREAR UNA API PARA ESTO

const apiKey = import.meta.env.VITE_OPENAI_API_KEY
const openai = new OpenAI({ apiKey, dangerouslyAllowBrowser: true })

export async function translate({
    fromLanguage,
    toLanguage,
    text,
}:{
    fromLanguage: FromLanguage,
    toLanguage: Language,
    text: string
}){
    if (fromLanguage === toLanguage) return text
    if (text.length === 0) return text
    const messages: ChatCompletionMessageParam[] = [
        {
            role: "system",
            content: 'You are a AI that translate text. You receive a text from the user. Do not answer, just translate the text. The original language is surrounded by `{{` and `}}`. You can also receive {{auto}} which means that you have to detect the language. The language you translate to is surrounded by `[[` and `]]`',
        },
        {
            role: "user",
            content: 'Hola Mundo {{Español}} [[English]]'
        },
        {
            role: "assistant",
            content: 'Hello World'
        },
        {
            role: "user",
            content: 'How are you? {{auto}} [[Deutch]]'
        },
        {
            role: "assistant",
            content: 'Wie geht es dir?'
        },
        {
            role: "user",
            content: 'Bon dia, com esta? {{auto}} [[Español]]'
        },
        {
            role: "assistant",
            content: 'Buenos días, ¿cómo estás?'
        },
    ]

    const fromCode = fromLanguage === 'auto' ? 'auto' : SUPPORTED_LANGUAGES[fromLanguage]
    const toCode = SUPPORTED_LANGUAGES[toLanguage]

    const userMessage: ChatCompletionMessageParam = {
        role: "user",
        content: `${text} {{${fromCode}}} [[${toCode}]]`
    }

    const completion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [...messages, userMessage],
    })
    
    return completion.choices[0]?.message?.content
}
