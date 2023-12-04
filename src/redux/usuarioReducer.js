import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ESTADO from "../recursos/estado";

const urlBase = "https://backend-bcc-2-b.vercel.app/usuario"

export const cadastrarUsuario = createAsyncThunk("usuario/cadastrar", async (usuario) => {
    const resposta = await fetch(urlBase, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(usuario)
    }).catch(erro => {
        return {
            status: false,
            mensagem: "Ocorreu um erro ao cadastrar usuario: " + erro.message
        }
    });

    if(resposta.ok){
        const dados = await resposta.json();
        return{
            status: dados.status,
            id: dados.id,
            mensagem: dados.mensagem
        }
    }
    else{
        return {
            status: false,
            mensagem: "Ocorreu um erro com a resposta do servidor para cadastrar um usuario!"
        }
    }
})

const initialState = {
    estado: ESTADO.OCIOSO,
    mensagem: "",
    usuarios: []
}

const usuarioSlice = createSlice({
    name: "usuario",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
        .addCase(cadastrarUsuario.pending, (state, action) => {
            state.estado = 'PENDING';
            state.mensagem = 'Cadastrando usuário...';
          })
          .addCase(cadastrarUsuario.fulfilled, (state, action) => {
            if (action.payload.status) {
              state.estado = 'OCIOSO';
              state.mensagem = action.payload.mensagem;
            } else {
              state.estado = 'ERRO';
              state.mensagem = action.payload.mensagem;
            }
          })
          .addCase(cadastrarUsuario.rejected, (state, action) => {
            state.estado = 'ERRO';
            state.mensagem = action.error.message || 'Ocorreu um erro ao cadastrar o usuário.';
          })
    }
})

export default usuarioSlice.reducer;
