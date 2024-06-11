import Context from './context';
import {useState} from 'react'


function GlobalState(props){

  const [selectedBuild, setSelectedBuild]=useState('')
  const [selectedClass, setSelectedClass]=useState('All')
  const [marker, setMarker]=useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const root = document.documentElement;
  
    const paleta = {
    textoClaro: getComputedStyle(root).getPropertyValue('--color-texto'),
    primario: getComputedStyle(root).getPropertyValue('--color-primario'),
    primarioClaro: getComputedStyle(root).getPropertyValue('--color-primario-claro'),
    primarioOscuro: getComputedStyle(root).getPropertyValue('--color-primario-oscuro'),
    secundario: getComputedStyle(root).getPropertyValue('--color-secundario'),
    secundarioClaro: getComputedStyle(root).getPropertyValue('--color-secundario-claro'),
    secundarioOscuro: getComputedStyle(root).getPropertyValue('--color-secundario-oscuro'),
    terciario: getComputedStyle(root).getPropertyValue('--color-terciario'),
    terciarioClaro: getComputedStyle(root).getPropertyValue('--color-terciario-claro'),
    terciarioOscuro: getComputedStyle(root).getPropertyValue('--color-terciario-oscuro')
    };

  return (
    <Context.Provider value={{
      paleta:paleta,
      selectedBuild:selectedBuild,
      setSelectedBuild:setSelectedBuild,
      selectedClass:selectedClass,
      setSelectedClass:setSelectedClass,
      marker:marker,
      setMarker:setMarker,
      sidebarOpen:sidebarOpen,
      setSidebarOpen:setSidebarOpen,
    }}>
        {props.children}
    </Context.Provider>
  )
}
export default GlobalState;