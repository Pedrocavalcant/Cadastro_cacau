
import { Link, Route, Routes } from "react-router-dom"
import CadastroCliente from "./pages/cadastroUser1/index.jsx"
import style from "./style.module.css"
import Home from "./pages/home/index.jsx"


function App() {

  return (
    <>    
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/cadastro/cliente" element={<CadastroCliente/>}/>
    </Routes>
    </>
  )
}

export default App
