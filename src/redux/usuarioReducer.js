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

export const buscarUsuario = createAsyncThunk("usuario/buscar", async () => {
    try{
        const resposta = await fetch(urlBase, { method: "GET" })
        const dados = await resposta.json();
        if(dados.status){
            return {
                status: true,
                listaUsuarios: dados.listaUsuarios
            }
        }
    } catch (erro) {
        return {
            status: false,
            listaUsuarios: []
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
    initialState: initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
        .addCase(cadastrarUsuario.pending, (state, action) => {
            state.estado = ESTADO.PENDENTE;
            state.mensagem = 'Cadastrando usuário...';
          })
          .addCase(cadastrarUsuario.fulfilled, (state, action) => {
            if (action.payload.status) {
              state.estado = ESTADO.OCIOSO;
              state.mensagem = action.payload.mensagem;
            } else {
              state.estado = ESTADO.ERRO;
              state.mensagem = action.payload.mensagem;
            }
          })
          .addCase(cadastrarUsuario.rejected, (state, action) => {
            state.estado = ESTADO.ERRO;
            state.mensagem = action.error.message || 'Ocorreu um erro ao cadastrar o usuário.';
          })
          .addCase(buscarUsuario.pending, (state, action) => {
            state.estado = ESTADO.PENDENTE;
            state.mensagem = 'Buscando usuário...';
          })
          .addCase(buscarUsuario.fulfilled, (state, action) => {
            if (action.payload.status) {
              state.estado = ESTADO.OCIOSO;
              state.usuarios = action.payload.listaUsuarios
              state.mensagem = action.payload.mensagem;
            } else {
              state.estado = ESTADO.ERRO;
              state.mensagem = action.payload.mensagem;
            }
          })
          .addCase(buscarUsuario.rejected, (state, action) => {
            state.estado = ESTADO.ERRO;
            state.mensagem = action.error.message || 'Ocorreu um erro ao buscar o usuário.';
          });
    }
})

export default usuarioSlice.reducer;
