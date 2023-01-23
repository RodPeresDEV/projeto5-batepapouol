let mensagensChat = [];
let nome = "";
const chat = document.querySelector(".chat");

function logarUsuario() {
  nome = prompt("Qual seu nome?");
  let logar = axios.post(
    "https://mock-api.driven.com.br/api/v6/uol/participants",
    { name: nome }
  );

  logar.then((res) => {
    console.log(res);
    buscarMensagens();
    setInterval(manterConxão, 5000);
    setInterval(buscarMensagens, 5000);
  });
  logar.catch(() => {
    logarUsuario();
  });
}

logarUsuario();

function manterConxão() {
  axios.post("https://mock-api.driven.com.br/api/v6/uol/status", {
    name: nome,
  });
}

//buscando mensagens do servidor
function buscarMensagens() {
  let buscaMsg = axios.get(
    "https://mock-api.driven.com.br/api/v6/uol/messages"
  );
  buscaMsg.then(mostrarTodasMensagens);
  buscaMsg.catch();
}

function mostrarTodasMensagens(resposta) {
  chat.innerHTML = "";
  const todasMensagens = resposta.data;
  for (let i = 0; i < todasMensagens.length; i++) {
    const time = todasMensagens[i].time;
    const from = todasMensagens[i].from;
    const text = todasMensagens[i].text;
    const to = todasMensagens[i].to;
    const type = todasMensagens[i].type;

    if (type === "private-message" && (from === nome || to === nome)) {
      chat.innerHTML += `
                <div class="todas-msgs private" data-test="message">
                    <p> <span class="tempo-chat">(${time})</span> <span class="name-chat">${from}</span>${text}</p>
                </div>`;
    } else if (type === "status") {
      chat.innerHTML += `
                <div class="todas-msgs status" data-test="message">
                    <p> <span class="tempo-chat">(${time})</span> <span class="name-chat">${from}</span>${text}</p>
                </div>`;
    } else {
      chat.innerHTML += `
                <div class="todas-msgs" data-test="message">
                    <p> <span class="tempo-chat">(${time})</span> <span class="name-chat">${from}</span> para <span class="name-chat">${to}:</span>${text}</p>
                </div>`;
    }
  }

  document.querySelector(".todas-msgs:last-child").scrollIntoView();
}

function enviarMensagens() {
  let mensagemDigitada = document.querySelector("input");
  let enviandoMensagem = {
    from: nome,
    to: "Todos",
    text: mensagemDigitada.value,
    type: "message",
  };
  axios
    .post("https://mock-api.driven.com.br/api/v6/uol/messages", enviandoMensagem)
    .then(()=>{
        mensagemDigitada.value = '';
        buscarMensagens()})
    .catch(() => {
      window.location.reload();
    });
}
