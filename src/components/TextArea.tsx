import React from 'react'
import { type FC } from 'react'
import { SectionType } from '../types.d'
import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize';
import { styled } from '@mui/system';
interface Props {
    type: SectionType
    loading?: boolean
    onChange: (value: string) => void
    value: string
}


const TextArea: FC<Props> = ({ type, loading, onChange, value }) => {
    const Textarea = styled(BaseTextareaAutosize)(
        ({ theme }) => `
        min-width: 100px;
        width: 100%;
        font-family: 'IBM Plex Sans', sans-serif;
        font-size: 0.875rem;
        font-weight: 400;
        line-height: 1.5;
        padding: 8px 12px;
        border-radius: 8px;
        border: none;
        color: ${theme.palette.mode === 'dark' ? '#fafafa' : '#fafafa'};
        background-color: ${type === SectionType.To ? '#303134' : 'transparent'};
        
        &:active {
            border: none
          }
      `,
    );
    const getPlaceholder = ({ type, loading }: { type: SectionType, loading?: boolean }) => {
        if (type === SectionType.From) return 'Introducir texto'
        if (loading === true) return 'Cargando...'
        return 'Traducción'
    }
    return (
        <Textarea aria-label="minimum height" minRows={3} placeholder={getPlaceholder({ type, loading })} />
    )
}

export default TextArea