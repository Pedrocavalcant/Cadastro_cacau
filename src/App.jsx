
import { Route, Routes } from "react-router-dom"
import { PlantaProvider } from "./context/PlantaContext"
import CadastroFuncionario from "./pages/cadastroUser1/index.jsx"
import style from "./style.module.css"
import Home from "./pages/home/index.jsx"
import CadastroFuncionario2 from "./pages/cadastroUser2/index.jsx"
import CadastroFazenda from "./pages/cadastroFazenda/index.jsx"
import CadastroPlanta from "./pages/cadastroPlanta/index.jsx"
import CadastroPlanta2 from "./pages/cadastroPlanta2/index.jsx"
import CadastroPlanta3 from "./pages/cadastroPlanta3/index.jsx"
import CadastroPlanta4 from "./pages/cadastroPlanta4/index.jsx"
import PlantaManager from "./pages/PlantaManager/index.jsx"
import Login from "./pages/login/index.jsx"
import NotFound from "./pages/notFound/index.jsx"
import Relatorios from "./pages/relatorios/index.jsx"
import RelatorioFuncionario from "./pages/relatorioFuncionario/index.jsx"
import RelatorioPlanta from "./pages/relatorioPlanta/index.jsx"
import RelatorioFazenda from "./pages/relatorioFazenda/index.jsx"
import PlantaDemo from "./pages/PlantaDemo/index.jsx"

// imports kept minimal; HeaderLogin isn't used here


function App() {

  return (
    <PlantaProvider>    
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/cadastro/funcionario" element={<CadastroFuncionario/>}/>
      <Route path="/cadastro/funcionario/2" element={<CadastroFuncionario2/>}/>
      <Route path="/cadastro/fazenda" element={<CadastroFazenda/>}/>
      <Route path="/cadastro/planta" element={<CadastroPlanta/>}/>
      <Route path="/cadastro/planta/2" element={<CadastroPlanta2/>}/>
      <Route path="/cadastro/planta/3" element={<CadastroPlanta3/>}/>
      <Route path="/cadastro/planta/4" element={<CadastroPlanta4/>}/>
      <Route path="/relatorios" element={<Relatorios/>}/>
      <Route path="/relatorio/funcionario" element={<RelatorioFuncionario/>}/>
      <Route path="/relatorio/planta" element={<RelatorioPlanta/>}/>
      <Route path="/relatorio/fazenda" element={<RelatorioFazenda/>}/>
      <Route path="/demo/plantas" element={<PlantaDemo/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="*" element={<NotFound/>}/> 
    </Routes>
    </PlantaProvider>
  )
}

export default App
