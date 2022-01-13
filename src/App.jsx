import { useEffect, useState } from "react"
import Formulario from "./components/Formulario"
import Header from "./components/Header"
import { ListadoPacientes } from "./components/ListadoPacientes"

function App() {
  const [pacientes, setPacientes] = useState([])
  const [paciente, setPaciente] = useState({})

  const addPaciente = (paciente) => {
    setPacientes([
      ...pacientes,
      paciente
    ])
  }

  const updatePaciente = (pacienteActualizado) => {
    setPacientes(
      pacientes.map(paciente => paciente.id !== pacienteActualizado.id ? paciente : pacienteActualizado)
    )
    setPaciente({})
  }

  const eliminarPaciente = (id) => {
    const respuesta = confirm('Deseas eliminar este paciente?')
    if (respuesta) {
      setPacientes(
        pacientes.filter(paciente => paciente.id !== id)
      )
    }
  }

  useEffect(() => {
    const pacientesLS = JSON.parse(localStorage.getItem('pacientes')) ?? []
    setPacientes(pacientesLS)
  }, [])

  useEffect(() => {
    localStorage.setItem('pacientes', JSON.stringify(pacientes))
  }, [pacientes]);

  return (
    <div className="container mx-auto mt-20">
      <Header />
      <div className="mt-12 md:flex">
        <Formulario
          addPaciente={addPaciente}
          updatePaciente={updatePaciente}
          paciente={paciente}
        />
        <ListadoPacientes pacientes={pacientes} setPaciente={setPaciente} eliminarPaciente={eliminarPaciente} />
      </div>
    </div>
  )
}

export default App
