/**
 * Carrega e retorna um conjunto de funções utilitárias comuns 
 * vinculadas ao socket atual e à mensagem recebida.
 * @param {Object} param0 - Objeto contendo o socket e a mensagem web.
 * @param {import('@whiskeysockets/baileys').WASocket} param0.socket - Instância do socket do Baileys.
 * @param {Object} param0.webMessage - Objeto da mensagem recebida do WhatsApp.
 * @returns {Object} Um objeto contendo métodos auxiliares para interagir com o chat.
 */
exports.loadCommonFunctions = ({ socket, webMessage }) => {
    // É aqui que você centraliza funções que serão usadas repetidas vezes pelos comandos,
    // como responder mensagens, enviar mídias, verificar o remetente, etc.
    
    return {
        // Exemplo conceitual do que você pode colocar aqui dentro futuramente:
        // reply: (text) => socket.sendMessage(webMessage.key.remoteJid, { text }, { quoted: webMessage }),
        // sender: webMessage.key.participant || webMessage.key.remoteJid
    };
};