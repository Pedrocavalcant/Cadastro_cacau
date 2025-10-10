
import { Link, Route, Routes } from "react-router-dom"
import CadastroCliente from "./pages/cadastroUser1/index.jsx"
import style from "./style.module.css"
import Home from "./pages/home/index.jsx"
import CadastroCliente2 from "./pages/cadastroUser2/index.jsx"
import CadastroFazenda from "./pages/cadastroFazenda/index.jsx"
import CadastroPlanta from "./pages/cadastroPlanta/index.jsx"
import CadastroPlanta2 from "./pages/cadastroPlanta2/index.jsx"
import CadastroPlanta3 from "./pages/cadastroPlanta3/index.jsx"
import CadastroPlanta4 from "./pages/cadastroPlanta4/index.jsx"
import Login from "./pages/login/index.jsx"
import NotFound from "./pages/notFound/index.jsx"


function App() {

  return (
    <>    
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/cadastro/cliente" element={<CadastroCliente/>}/>
      <Route path="/cadastro/cliente/2" element={<CadastroCliente2/>}/>
      <Route path="/cadastro/fazenda" element={<CadastroFazenda/>}/>
      <Route path="/cadastro/planta" element={<CadastroPlanta/>}/>
      <Route path="/cadastro/planta/2" element={<CadastroPlanta2/>}/>
      <Route path="/cadastro/planta/3" element={<CadastroPlanta3/>}/>
      <Route path="/cadastro/planta/4" element={<CadastroPlanta4/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="*" element={<NotFound/>}/>
    </Routes>
    </>
  )
}

export default App
