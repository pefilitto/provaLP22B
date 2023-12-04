import React, { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { buscarMensagens, cadastrarMensagem } from '../../redux/mensagemReducer';
import { buscarUsuario } from '../../redux/usuarioReducer';

export default function FormCadMensagem() {
    const dispatch = useDispatch();
    const usuarios = useSelector((state) => state.usuario.usuarios);
    const mensagens = useSelector((state) => state.mensagem.mensagens);
    const [selectedOption, setSelectedOption] = useState('');
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        dispatch(buscarUsuario());
        dispatch(buscarMensagens());
    }, [dispatch]);

    const handleDropdownChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (selectedOption && inputValue) {
            const novaMensagem = {
                mensagem: inputValue,
                usuario: {
                    id: selectedOption
                },
            }
            dispatch(cadastrarMensagem(novaMensagem));
            dispatch(buscarMensagens())
            setSelectedOption('');
            setInputValue('');
        }
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <Form.Select value={selectedOption} onChange={handleDropdownChange}>
                    <option value="">Selecione um usuário</option>
                    {usuarios.map((usuario) => (
                        <option key={usuario.id} value={usuario.id}>
                            {usuario.nickname}
                        </option>
                    ))}
                </Form.Select>
                <Form.Control
                    type="text"
                    placeholder="Digite algo..."
                    value={inputValue}
                    onChange={handleInputChange}
                    style={{ marginLeft: '10px' }}
                />
                <Button variant="primary" onClick={handleSubmit}>Enviar</Button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', marginTop: '20px', overflowX: 'auto', maxWidth: '100%' }}>
                {mensagens.map((mensagem) => (
                    <div key={mensagem.id} style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '8px', margin: '4px', display: "flex", flexDirection: "column" }}>
                        <div style={{ textAlign: "left" }}>
                            <div>
                                <img
                                    src={mensagem.usuario.urlAvatar}
                                    alt={`Avatar de ${mensagem.usuario.nickname}`}
                                    style={{ width: '25px', height: '25px' }}
                                />
                            </div>
                            <div>Usuário: {mensagem.usuario.nickname}</div>
                            <div>Mensagem: {mensagem.mensagem}</div>
                            <div>{mensagem.dataHora}</div>
                        </div>

                    </div>
                ))}
            </div>
        </div>
    );
}