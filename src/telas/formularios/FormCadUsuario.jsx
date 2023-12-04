import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { cadastrarUsuario } from '../../redux/usuarioReducer';
import { useDispatch } from 'react-redux';

export default function FormCadUsuario(props) {
    const { setExibirCadUsuario } = props;
    const dispatch = useDispatch();

    const [nickname, setNickname] = useState('');
    const [url, setUrl] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();

        if (nickname && url) {
            dispatch(cadastrarUsuario({ 
                nickname: nickname, 
                urlAvatar: url 
            }));
            console.log("Usuário cadastrado com sucesso");
            setNickname('');
            setUrl('');
            setExibirCadUsuario(false);
        }
    };

    return (
        <div>
            <Form style={{ marginTop: "20px" }} onSubmit={onSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Nickname/Apelido</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Nickname"
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Url do seu avatar</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="URL"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                    />
                </Form.Group>
                <Button variant="primary" type="submit">Cadastrar</Button>
            </Form>
        </div>
    );
}