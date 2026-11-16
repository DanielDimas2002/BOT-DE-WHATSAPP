const {
    default: makeWASocket,
    useMultiFileAuthState,
    fetchLatesBaileysVersion, 
} = require('@whiskeysockets/baileys');
const path = require("path");
const pino = require('pino');

exports.connect = async () => {
    const { state, saveCreds } = await useMultiFileAuthState(
        path.resolve(__dirname, "...", "assets", "auth", "baileys")
    );

    const {version} = await fetchLatesBaileysVersion();

    const socket = makeWASocket({
        printQRInTerminal: false,
        version,
        logger:
    });
};

