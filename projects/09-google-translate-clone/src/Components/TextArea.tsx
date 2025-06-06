import { Form } from 'react-bootstrap';
import { SectionType } from '../types.d';


interface Props {
    type: SectionType
    loading?: boolean
    value: string
    onChange: (value: string) => void
}
const commonStyles = { border:0, height: '200px', Resize: 'none' }

const getPlaceholder = ({ type, loading }: {type: SectionType, loading?: boolean }) => {
    if (type === SectionType.From) return 'Introducir texto'
    if (loading === true) return 'Cargando...'
    return 'Traducción'
}

export const TextArea = ({ type, loading, value, onChange }: Props) => {
    const styles = type === SectionType.From
        ? commonStyles
        : { ...commonStyles, backgroundColor: '#f5f5f5' }

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        onChange(event.target.value)
    }

    return (
        <Form.Control
            as='textarea' // qué elemento tiene que renderizar
            placeholder={getPlaceholder({ type, loading })}
            autoFocus={type === SectionType.From}
            disabled={type === SectionType.To}
            style={styles}
            value={value}
            onChange={handleChange}
        />
    )
}
