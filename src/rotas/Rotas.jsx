import { BrowserRouter, Routes, Route } from "react-router-dom";
import TelaPrincipal from "../telas/TelaPrincipal";
export default function Rotas(){
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/provaLP22B" element={<TelaPrincipal/>}></Route>
            </Routes>
        </BrowserRouter>
    )
}