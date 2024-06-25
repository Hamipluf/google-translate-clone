import './App.css';
import Grid from '@mui/material/Unstable_Grid2'
import { ArrowsIcon } from './components/ico';
import { IconButton, Divider } from '@mui/material';
import LenguajeSelector from './components/LenguajeSelector';
import { useStore } from './hooks/useStore';
import { SectionType } from './types.d';
import { AUTO_LANGUAGE } from './constants';
import TextArea from './components/TextArea';

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
    setResult
  } = useStore()
  return (
    <main>
      <h1 
        style={
          {
            fontSize: '1.5rem',
            fontWeight: 'bold',
            color: '#fff',
            margin: '1rem 0',
            
          }
        }
      >Google Translate Clone</h1>

      <Grid container spacing={3}>
        <Grid justifyItems={'center'} alignItems={'center'}>
          <LenguajeSelector
            type={SectionType.From}
            value={fromLanguage}
            onChange={setFromLanguage} />
          <TextArea onChange={setFromText} type={SectionType.From} value={fromText} loading={loading} />
        </Grid>
        <Grid xs='auto'>
          <IconButton disabled={fromLanguage === AUTO_LANGUAGE} onClick={interchangeLanguages} aria-label="Swap" size="small">
            <ArrowsIcon />
          </IconButton>
        </Grid>
        <Grid justifyItems={'center'} alignItems={'center'} >
          <LenguajeSelector
            type={SectionType.To}
            value={toLanguage}
            onChange={setToLanguage} />
          <TextArea onChange={setFromText} type={SectionType.To} value={result} loading={loading} />
        </Grid>
      </Grid>
      <Divider sx={{
        margin: '1rem 0',
        backgroundColor: '#303134',
      }}/>
    </main >


  )
}

export default App
