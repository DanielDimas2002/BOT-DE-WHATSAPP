const { TIMEOUT_IN_MILLISECONDS_BY_EVENT } = require('./config');
const { onMessagesUpsert } = require("./middlewares/onMessagesUpsert");

/**
 * Função responsável por carregar os ouvintes de eventos do socket do Baileys.
 * @param {import('@whiskeysockets/baileys').WASocket} socket - Instância do socket do WhatsApp.
 */
exports.load = (socket) => {
    // Ouve o evento de novas mensagens ('messages.upsert') disparado pelo Baileys.
    // Desestruturamos diretamente o parâmetro recebido para extrair o array 'messages'.
    socket.ev.on("messages.upsert", ({ messages }) => {
        
        // Aguarda o tempo configurado (em milissegundos) antes de processar a mensagem.
        // Isso é útil para evitar sobrecarga ou simular um tempo de resposta mais natural.
        setTimeout(() => {
            onMessagesUpsert({ socket, messages });
        }, TIMEOUT_IN_MILLISECONDS_BY_EVENT);
        
    });
};