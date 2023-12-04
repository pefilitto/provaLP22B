import { BrowserRouter, Routes, Route } from "react-router-dom";
import TelaPrincipal from "../telas/TelaPrincipal";
export default function Rotas(){
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<TelaPrincipal/>}></Route>
            </Routes>
        </BrowserRouter>
    )
}