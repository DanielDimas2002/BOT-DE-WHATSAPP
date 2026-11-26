/**
 * Evento acionado sempre que novas mensagens chegam (ou são atualizadas) no WhatsApp.
 * @param {Object} param0 - Objeto contendo o socket da conexão e a lista de mensagens recebidas.
 * @param {import('@whiskeysockets/baileys').WASocket} param0.socket - Instância do socket do Baileys.
 * @param {Array} param0.messages - Array com as mensagens recebidas.
 */
exports.onMessagesUpsert = async ({ socket, messages }) => {
    // Se o array de mensagens estiver vazio, encerra a execução imediatamente para evitar erros.
    if (!messages.length) {
        return;
    }

    // Pega a primeira mensagem do array (geralmente a mais recente recebida).
    const webMessage = messages[0];

    // Carrega funções utilitárias comuns injetando o socket e a mensagem atual para facilitar o uso nos comandos.
    const commonFunctions = loadCommonFunction({ socket, webMessage });

    // Executa o sistema de comandos dinâmicos, passando as funções e dados da mensagem.
    await dynamicCommand(commonFunctions);
};