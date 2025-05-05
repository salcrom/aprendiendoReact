import { Form } from "react-bootstrap"
import { AUTO_LANGUAGE, SUPPORTED_LANGUAGES } from "../constans"
import { SectionType, type FromLanguage, type Language } from "../types.d"

type Props = 
    | { type: SectionType.From, value:FromLanguage, onChange: (value: FromLanguage) => void }
    | { type: SectionType.To, value:Language, onChange: (value: Language) => void }
    

export const LanguageSelector: React.FC<Props> = ({ onChange, type, value }) => {
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        onChange(event.target.value as Language)
    }

    return (
        <Form.Select aria-label="Selecciona el idioma" onChange={handleChange} value={value}>
            { type === 'from' && <option value={AUTO_LANGUAGE}>Detectar idioma</option>}
            
            {
                Object.entries(SUPPORTED_LANGUAGES).map(([key, literal]) => (
                    <option key={key} value={key}>
                        {literal}
                    </option>
                ))
            }
        </Form.Select>
    )
}
