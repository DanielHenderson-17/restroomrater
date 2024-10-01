import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { App } from './App.jsx'
import 'leaflet/dist/leaflet.css';


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
      <App />
  </BrowserRouter>

)

