//rafce, creacion de arrow function, return y exportacion
import {useState, useEffect} from 'react';
import Error from './Error';
//props del app jsx 
const Formulario = ({pacientes, setPacientes, paciente, setPaciente}) => {
  //Hock con el useState es el esatdo de tu aplicacion
  //utilizando array destructuring useState te retorna la variable y funcion
  //variable = nombre
  //funcion = setNombre funcion que modifica el nombre

  //nombre de la variable, funcion que modifica, y valor inicial
  //no poner los hooks dentro de una condicional y no return previo, no pueden ir fuera del componente
  const [nombre, setNombre] = useState('');
  const [propietario, setPropietario] = useState('');
  const [email, setEmail] = useState('');
  const [fecha, setFecha] = useState('');
  const [sintomas, setSintomas] = useState('');

  //Creando alerta, si hay un error
  const [error, setError] = useState(false)
  //Este use effect solo se va a ejecutar cuando paciente haya cambiado
  //Escuchar por los cambios que sucedan cuando algo pueda cambiar
  //object.keys(paciente) comprueba si un objeto hay algo
  useEffect(()=>{
    //En la suma de los keys
      if(Object.keys((paciente).lenght > 0)){
        //Esto es para cuando des editar se llena el formulario de lo que escribio
        setNombre(paciente.nombre)
        setPropietario(paciente.propietario)
        setEmail(paciente.email)
        setFecha(paciente.fecha)
        setSintomas(paciente.sintomas)
      }else{
        console.log('No hay no existe')
      }
      //Leyendo los cambios de paciente
  },[paciente])

  

  const generarId = () => {
    const random = Math.random().toString(36).substring(2);
    const fecha = Date.now().toString(36)

    return random + fecha;
  }


  const handleSubmit = (e) => {
    //Verificar antes de enviar
    e.preventDefault();

    //Validacion del formulario
    //includes si incluye 
    if([nombre,propietario,email,fecha,sintomas].includes('')){
      console.log('Hay al menos un campo vacio')
      //Si los campos tienen un campo vacio aparecera un error con el mensaje que esta en el html
      setError(true)
      return;
    }
    //Estableciendo false antes de que inicie
    setError(false)

    //Objeto de Paciente para almacenarlos en el setPacinetes
    const objetoPaciente ={
      nombre,
      propietario,
      email,
      fecha,
      sintomas,
     
    }
    if(paciente.id){
      //Editando Registro

      objetoPaciente.id = paciente.id

      const pacientesActualizados = pacientes.map(pacienteState => pacienteState.id === 
        paciente.id ? objetoPaciente : pacienteState)

        setPacientes(pacientesActualizados)
        //Limpiando State
        setPaciente({})
    }else{
      //Nuevo Registro
      objetoPaciente.id = generarId()
      setPacientes([...pacientes, objetoPaciente])
    }
      

    //tomar una copia de lo que esta vacio
    //Guardando la informacion en un arreglo
    setPacientes([...pacientes, objetoPaciente])

    //Reiniciar el formulario
    setNombre('')
    setPropietario('')
    setEmail('')
    setFecha('')
    setSintomas('')

  }
  //setNombre('hook')
  //console.log(nombre)

  return (
    <div className="md:w-1/2 lg:w-2/5 mx-5">
        <h2 className='font-black text-3xl text-center'>Seguimiento Pacientes</h2>
        
        <p className='text-lg mt-5 text-center mb-10' >
          Anade Pacientes y {''}
          <span className='text-indigo-600 font-bold'>Administralos</span>
        </p>

        <form onSubmit={handleSubmit} className='bg-white shadow-md rounded-lg py-10 px-5 mb-10'>
            
           {error && <Error>'Todos los campos son obligatorios'</Error>}

            <div className='mb-5'>
              <label htmlFor='mascota'className='block text-gray-700 uppercase font-bold'>
                Nombre Mascota
              </label>
              <input
                    id='mascota' 
                    type="text" 
                    placeholder='Nombre de la Mascota'
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                    value={nombre}
                  //onchange evento de react = registrar un elemento en el html
                  //e = el evento del onchange 
                  //leyendo lo que el usuario esta ingresando
                   // onChange = {(e) => console.log(e.target.value)}
                    //leyendo, lo que el usuario esta escribiendo pero con el hook
                   onChange = {(e) => setNombre(e.target.value)}
              />  
            </div>
        
              <div className='mb-5'>
              <label htmlFor='propietario'className='block text-gray-700 uppercase font-bold'>
                Nombre Propietario
              </label>
              <input
                    id='propietario' 
                    type="text" 
                    placeholder='Nombre del Propietario'
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                    value={propietario}
                    onChange = {(e) => setPropietario(e.target.value)}
              />  
              </div>

              <div className='mb-5'>
              <label htmlFor='email'className='block text-gray-700 uppercase font-bold'>
                Email
              </label>
              <input
                    id='email' 
                    type="email" 
                    placeholder='Email Contacto Propietario'
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                    value={email}
                    onChange = {(e) => setEmail(e.target.value)}
              />  
              </div>

              <div className='mb-5'>
              <label htmlFor='alta'className='block text-gray-700 uppercase font-bold'>
                Alta
              </label>
              <input
                    id='alta' 
                    type="date" 
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                    value={fecha}
                    onChange = {(e) => setFecha(e.target.value)}
              />  
              </div>

              <div className='mb-5'>
              <label htmlFor='sintomas'className='block text-gray-700 uppercase font-bold'>
                Sintomas
              </label>
              <textarea id='sintomas'
                   className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                   placeholder='Describe los Sintomas'
                   value={sintomas}
                   onChange = {(e) => setSintomas(e.target.value)}
              />
              </div>

              <input 
                  type="submit" 
                  className='bg-indigo-600 w-full p-3 text-white uppercase font-bold 
                  hover:bg-indigo-700 cursor-pointer transition-shadow'
                  value={paciente.id ? "Editar Paciente" : "Agrega Paciente"}
              />
        </form>
    </div>
  )
}
export default Formulario

