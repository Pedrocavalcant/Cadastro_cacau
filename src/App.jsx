
import { Link, Route, Routes } from "react-router-dom"
import CadastroCliente from "./pages/cadastroUser1/index.jsx"
import style from "./style.module.css"
import Home from "./pages/home/index.jsx"
import CadastroCliente2 from "./pages/cadastroUser2/index.jsx"
import CadastroFazenda from "./pages/cadastroFazenda/index.jsx"
import CadastroPlanta from "./pages/cadastroPlanta/index.jsx"


function App() {

  return (
    <>    
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/cadastro/cliente" element={<CadastroCliente/>}/>
      <Route path="/cadastro/cliente/2" element={<CadastroCliente2/>}/>
      <Route path="/cadastro/fazenda" element={<CadastroFazenda/>}/>
      <Route path="/cadastro/planta" element={<CadastroPlanta/>}/>
    </Routes>
    </>
  )
}

export default App
