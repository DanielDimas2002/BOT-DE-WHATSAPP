// Importa o módulo nativo 'readline' do Node.js, 
// que permite ler dados vindos do fluxo de entrada padrão (como o teclado do terminal).
const readline = require("readline");

/**
 * Função utilitária para fazer uma pergunta no terminal e aguardar a resposta do usuário.
 * Retorna uma Promise que se resolve com o texto digitado.
 * @param {string} message - A pergunta que será exibida no terminal.
 */
exports.question = (message) => {
    // Cria uma interface de leitura e escrita conectada ao terminal (stdin / stdout).
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    // Retorna uma Promise para transformar a função baseada em callback em assíncrona (com async/await).
    return new Promise((resolve) => {
        // Exibe a mensagem no terminal e aguarda o usuário digitar algo e pressionar Enter.
        rl.question(message, (answer) => {
            // Fecha a interface do readline para liberar o processo do terminal (evita que o script fique travado rodando).
            rl.close(); 
            // Finaliza a Promise entregando a resposta digitada pelo usuário.
            resolve(answer);
        });
    });
};

/**
 * Função utilitária para limpar uma string, mantendo apenas os números.
 * Ideal para formatar números de telefone (removendo traços, parênteses, espaços e letras).
 * @param {string} text - O texto original (ex: "+55 (11) 99999-9999").
 * @returns {string} - Apenas os dígitos numéricos (ex: "5511999999999").
 */
exports.onlyNumbers = (text) => text.replace(/[^0-9]/g, "");