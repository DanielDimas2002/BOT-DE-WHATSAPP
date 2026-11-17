// Importa a função 'connect' do arquivo de conexão que criamos anteriormente
const { connect } = require("./connection");

/**
 * Função principal assíncrona para iniciar o bot.
 */
async function start() {
    // Aguarda o estabelecimento da conexão e a criação do socket do WhatsApp
    const socket = await connect();
    
    // A função 'load' precisa ser criada.
    console.log("Bot conectado com sucesso! Pronto para carregar os módulos.");
}

// Executa a função de inicialização
start();