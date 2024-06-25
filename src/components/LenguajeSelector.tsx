import { type FC } from 'react'
import { InputLabel, MenuItem, FormControl, Select } from '@mui/material';

import { type FromLanguage, type Language, SectionType } from '../types.d'
import { AUTO_LANGUAGE, SUPPORTED_LANGUAGES } from '../constants';
type Props =
    | { type: SectionType.From, value: FromLanguage, onChange: (language: FromLanguage) => void }
    | { type: SectionType.To, value: Language, onChange: (language: Language) => void }

const LenguajeSelector: FC<Props> = ({ type, value, onChange: onChangeProp }) => {
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        onChangeProp(event.target.value as Language)
    }
    return (
        <div>
            <FormControl sx={{ m: 1, minWidth: 80, width: '100%' }}>
                          <Select
                    sx={{
                        height: '40px',
                    }}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    // @ts-expect-error 'Necesito tipado'
                    onChange={handleChange}
                    value={value}
                >
                    {type === SectionType.From && <MenuItem value={AUTO_LANGUAGE}>Detectar idioma</MenuItem>}
                    {Object.entries(SUPPORTED_LANGUAGES).map(([key, label]) => (
                        <MenuItem key={key} value={key}>
                            {label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>

    )
}

export default LenguajeSelector