// Importa as funções principais da biblioteca do Baileys para criar a conexão,
// gerenciar o estado de autenticação, buscar a versão mais recente e tratar desconexões.
const {
    default: makeWASocket,
    useMultiFileAuthState,
    fetchLatestBaileysVersion,
    DisconnectReason,
} = require('@whiskeysockets/baileys');

// Importa o módulo 'path' nativo do Node.js para manipular caminhos de diretórios e arquivos de forma segura.
const path = require("path");

// Importa o 'pino' para gerenciar e filtrar os logs gerados pelo Baileys no console.
const pino = require('pino');

// Importa funções utilitárias personalizadas do seu projeto (como a função de ler input do terminal e limpar números).
const { question, onlyNumbers } = require('./utils');

/**
 * Função principal assíncrona responsável por iniciar e manter a conexão com o WhatsApp.
 */
async function connect() {
    // Carrega ou cria o estado de autenticação usando múltiplos arquivos na pasta especificada.
    // O 'path.resolve' define onde os dados da sessão (tokens, chaves) serão salvos.
    const { state, saveCreds } = await useMultiFileAuthState(
        path.resolve(__dirname, "..", "..", "assets", "auth", "baileys")
    );

    // Busca a versão mais recente do WhatsApp Web compatível para evitar erros de protocolo.
    const { version } = await fetchLatestBaileysVersion();

    // Cria a instância do socket do WhatsApp com as configurações definidas.
    const socket = makeWASocket({
        printQRInTerminal: false,       // Desativa o QR Code no terminal (pois vamos usar código de pareamento por número).
        version,                        // Versão do Baileys obtida anteriormente.
        logger: pino({ level: "error" }), // Define o nível de log para exibir apenas erros graves.
        auth: state,                    // Passa o estado de autenticação.
        browser: ["Chrome (Linux)", "", ""], // Simula um navegador para mascarar a conexão.
        markOnlineOnConnect: true,      // Define o bot como online assim que conectar.
    });

    // Verifica se o WhatsApp ainda não foi autenticado/registrado neste dispositivo/sessão.
    if (!socket.auth.creds.registered) {
        // Pede para o usuário digitar o número de telefone no terminal.
        const phoneNumber = await question("Informe o seu número de telefone: ");

        // Valida se o usuário realmente digitou algo.
        if (!phoneNumber) {
            throw new Error("Número de telefone inválido.");
        }

        // Solicita ao Baileys o código de pareamento de 8 dígitos usando apenas os números do telefone informado.
        const code = await socket.requestPairingCode(onlyNumbers(phoneNumber));

        // Exibe o código gerado no terminal para que você possa digitar no seu celular.
        console.log(`Código de pareamento: ${code}`);
    }

    // Ouve eventos de atualização na conexão (ex: quando conecta, desconecta, cai a internet, etc).
    socket.ev.on("connection.update", (update) => {
        const { connection, lastDisconnect } = update;

        // Se a conexão foi fechada/encerrada.
        if (connection === "close") {
            // Verifica se o motivo da queda NÃO foi um logout manual (se caiu por instabilidade, deve reconectar).
            const shouldReconnect = lastDisconnect.error?.output?.statusCode !== DisconnectReason.loggedOut;

            // Se precisar reconectar, chama a função connect novamente de forma recursiva.
            if (shouldReconnect) {
                connect();
            }
        }
    });

    // Ouve eventos de atualização de credenciais e salva automaticamente os arquivos de sessão atualizados.
    socket.ev.on("creds.update", saveCreds);
}

// Exporta a função 'connect' para que possa ser chamada em outros arquivos do seu projeto (ex: index.js principal).
exports.connect = connect;