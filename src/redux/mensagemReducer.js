import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ESTADO from "../recursos/estado";

const urlBase = "https://backend-bcc-2-b.vercel.app/mensagem";

export const cadastrarMensagem = createAsyncThunk(
  "mensagem/cadastrar",
  async (mensagem) => {
    const resposta = await fetch(urlBase, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(mensagem),
    }).catch((erro) => {
      return {
        status: false,
        mensagem: "Ocorreu um erro ao inserir a mensagem: " + erro.message,
      };
    });

    if (resposta.ok) {
      const dados = await resposta.json();
      return {
        status: dados.status,
        mensagem: dados.mensagem,
        id: dados.id
      };
    } else {
      return {
        status: false,
        mensagem: "Ocorreu um erro com a resposta do servidor para inserir uma mensagem!",
      };
    }
  }
);

export const excluirMensagem = createAsyncThunk("mensagem/excluir", async (mensagem) => {
  const resposta = await fetch(urlBase, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(mensagem)
  }).catch(erro => {
    return {
      status: false,
      mensagem: "Ocorreu um erro ao excluir uma mensagem: " + erro.message
    }
  });

  if(resposta.ok){
    const dados = await resposta.json();
    return {
      status: dados.status,
      mensagem: dados.mensagem
    }
  }
  else{
    return {
      status: false,
      mensagem: "Ocorreu um erro com a resposta do servidor para excluir uma mensagem!"
    }
  }
});

export const buscarMensagens = createAsyncThunk("mensagem/buscar", async () => {
  try {
    const resposta = await fetch(urlBase, { method: "GET" });
    const dados = await resposta.json();
    if (dados.status) {
      return {
        status: true,
        mensagens: dados.listaMensagens
      };
    } else {
      return {
        status: false,
        mensagem: "Ocorreu um erro ao buscar as mensagens",
      };
    }
  } catch (erro) {
    return {
      status: false,
      mensagem: "Ocorreu um erro ao buscar as mensagens.",
    };
  }
});

const initialState = {
  estado: ESTADO.OCIOSO,
  mensagem: "",
  mensagens: []
}

const mensagemSlice = createSlice({
  name: "mensagem",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(cadastrarMensagem.pending, (state, action) => {
      state.estado = ESTADO.PENDENTE;
      state.mensagem = 'Cadastrando mensagem...';
    })
    .addCase(cadastrarMensagem.fulfilled, (state, action) => {
      if (action.payload.status) {
        state.estado = 'OCIOSO';
        state.mensagem = action.payload.mensagem;
      } else {
        state.estado = ESTADO.ERRO;
        state.mensagem = action.payload.mensagem;
      }
    })
    .addCase(cadastrarMensagem.rejected, (state, action) => {
      state.estado = ESTADO.ERRO;
      state.mensagem = action.error.message || 'Ocorreu um erro ao cadastrar a mensagem.';
    })
    .addCase(excluirMensagem.pending, (state, action) => {
      state.estado = ESTADO.PENDENTE;
      state.mensagem = 'Excluindo mensagem...';
    })
    .addCase(excluirMensagem.fulfilled, (state, action) => {
      if (action.payload.status) {
        state.estado = ESTADO.OCIOSO;
        state.mensagem = action.payload.mensagem;
      } else {
        state.estado = ESTADO.ERRO;
        state.mensagem = action.payload.mensagem;
      }
    })
    .addCase(excluirMensagem.rejected, (state, action) => {
      state.estado = ESTADO.ERRO;
      state.mensagem = action.error.message || 'Ocorreu um erro ao excluir a mensagem.';
    })
    .addCase(buscarMensagens.pending, (state, action) => {
      state.estado = ESTADO.PENDENTE;
      state.mensagem = 'Buscando mensagens...';
    })
    .addCase(buscarMensagens.fulfilled, (state, action) => {
      if (action.payload.status) {
        state.estado = ESTADO.OCIOSO;
        state.mensagem = action.payload.mensagem;
        state.mensagens = action.payload.mensagens;
      } else {
        state.estado = ESTADO.ERRO;
        state.mensagem = action.payload.mensagem;
      }
    })
    .addCase(buscarMensagens.rejected, (state, action) => {
      state.estado = ESTADO.ERRO;
      state.mensagem = action.payload.mensagem || 'Ocorreu um erro ao buscar as mensagens.';
    })
  }
})

export default mensagemSlice.reducer;
