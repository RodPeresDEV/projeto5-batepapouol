//let nome = prompt("Qual seu nome?");
let mensagensChat = [];


const chat = document.querySelector('.chat');

console.log(chat)
buscarMensagens();
//buscando mensagens do servidor
function buscarMensagens() {
    let buscaMsg = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
    buscaMsg.then(mostrarTodasMensagens);
    buscaMsg.catch();
}

function mostrarTodasMensagens(resposta) {
    console.log(resposta.data);

    const todasMensagens = resposta.data;
    for (let i = 0; i < todasMensagens.length; i++) {
        const time = todasMensagens[i].time;
        const from = todasMensagens[i].from;
        const text = todasMensagens[i].text;
        const to = todasMensagens[i].to;
        const type = todasMensagens[i].type;

        if ( type === 'private-message') {
            
            chat.innerHTML += `<li class="todas-msgs private" data-test="message"><span class="tempo-chat">(${time})</span> <span class="name-chat">${from}</span> ${text}</li>`;
        } else if ( type === 'status' ) {
            chat.innerHTML += `<li class="todas-msgs status" data-test="message"><span class="tempo-chat">(${time})</span> <span class="name-chat">${from}</span> ${text}</li>`;
        } else {
            chat.innerHTML += `<li class="todas-msgs" data-test="message"><span class="tempo-chat">(${time})</span> <span class="name-chat">${from}</span> para <span class="name-chat">${to}:</span> ${text}</li>`;
        }
        
        console.log(todasMensagens[i].text);
    } 

}

function naoMostrouMensagens(res) {
    console.log('Mensagens não carregadas')
}



function msgEnviada(res) {
//    console.log("A mensagem foi recebida pelo servidor");

}

//verificação usuário online
//function verificandoOnline() {
//    let ping = axios.post('https://mock-api.driven.com.br/api/v6/uol/status', nomeUsuario);
//    ping.then(estaOn);
//    ping.catch(estaOff);
//}

//setInterval(verificandoOnline, 5000)
