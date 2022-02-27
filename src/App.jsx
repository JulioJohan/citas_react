import { useState, useEffect } from "react"
import Formulario from "./components/Formulario"
import Header from "./components/Header"
import ListadoPacientes from "./components/ListadoPacientes"
function App() {
  //Creando un use State para almacenar nuestros pacientes en un arreglo de objetos
  const [pacientes, setPacientes] = useState([]);
  const [paciente, setPaciente] = useState({});


  
  useEffect(()=>{
    const obtenerLS = () =>{
      //Detecta que hay algo en el storage
      const pacientesLS = JSON.parse(localStorage.getItem('pacientes')) ?? [];
      //Lo colocamos en el STATE
      setPaciente(pacientesLS)
    }

    obtenerLS();
  }, []);

  useEffect(() =>{
    localStorage.setItem('pacientes', JSON.stringify(pacientes))
  }, [pacientes])

  const eliminarPaciente = (id) =>{
    const pacientesActualizados = pacientes.filter(paciente => paciente.id !== id);
    setPaciente(pacientesActualizados)
  }
  //Antes del return es bueno crear todos nuestas funciones e ifs

  //Props de hijo a padre

  //const tomar1Valor = (valor) => {
   // console.log(valor)
  //}
 //TERNARIOS Dentro del return para que exprese que es codigo JavaScript{}
  //En el return estara todo el html
  //despues del return te imprimira todo lo que se puede ver
  return (
    <div className= "container mx-auto mt-20">
      <Header/>
      <div className="mt-12 md:flex">
      <Formulario
      //propiedades
        pacientes={pacientes}
        setPacientes={setPacientes}
        paciente = {paciente}
        setPaciente = {paciente}
      />
      <ListadoPacientes
      pacientes={pacientes}
      setPaciente={setPaciente}
      eliminarPaciente = {eliminarPaciente}
      />
      </div>
      
    </div>
  )
}

export default App


