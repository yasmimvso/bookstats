import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx' // importações de componntes principais

// a main é onde iremos redenrizar as todas as páginas
// teremos 4 páginas visuais no geral: principal, cadastro / login , página pesquisa filtrada / dashboard page
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />  
  </StrictMode>,
)
