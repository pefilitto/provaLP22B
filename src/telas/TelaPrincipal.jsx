import { useState } from 'react';
import { Container } from 'react-bootstrap';
import FormCadUsuario from './formularios/FormCadUsuario';
import FormCadMensagem from './formularios/FormCadMensagem';
export default function TelaPrincipal() {
    const [exibirCadUsuario, setExibirCadUsuario] = useState(true);
    return (
        <Container>
            {
                exibirCadUsuario ? (
                    <FormCadUsuario
                        setExibirCadUsuario={setExibirCadUsuario}
                    />
                ) : (
                    <FormCadMensagem/>
                )
            }
        </Container>
    )
}