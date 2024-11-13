const nodemailer = require("nodemailer");


let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "controledegarantias@gmail.com",
        pass: "ucrzgkxvsylgroox", // Replace with your actual password or use an app password
    },
    tls: {
        rejectUnauthorized: false,
    },
});

let options = {
    from: "controledegarantias@gmail.com",
    to: "joaopauloclementesilva@gmail.com",
    subject: "Aviso de Garantia: Seu produto está prestes a vencer!",
    text: ` Olá, seu produto ${nomeProduto} está a 30 dias de vencer. Por favor, verifique a data de vencimento e se possível, renove seu produto antes que expire.`,
};

const sendEmail = async () => {
    try {
        console.log("enviando E-mail");
        await transporter.sendMail(options); // Corrected method name from sendEmail to sendMail
        console.log("E-mail enviado!");
        process.exit();
    } catch (error) {
        console.log("deu erro =(");
        console.log(error);
    }
};

function verificarVencimento() {
    clientes.forEach(cliente => {
        const diasRestantes = calcularDiasRestantes(cliente.dataVencimento);
        if (diasRestantes === 30) {
            // Enviar o e-mail para o cliente
            console.log(`Enviando e-mail para: ${cliente.nome}`);
            enviarEmail(cliente.email, 'Seu Produto');
        }
    });
}

const clientes = [
    { nome: "João Silva", email: "joao@email.com", dataVencimento: "2024-12-10" },
    { nome: "Maria Oliveira", email: "maria@email.com", dataVencimento: "2024-11-23" },
    { nome: "Carlos Souza", email: "carlos@email.com", dataVencimento: "2024-10-13" }
];

function calcularDiasRestantes(vencimento, hoje) {
    const diffTime = vencimento - hoje;
    const diffDays = Math.ceil(diffTime / (1000 * 3600 * 24)); // converte para dias
    return diffDays;
}

function verificarExpiracaoGarantia(dataVencimento) {
    const hoje = new Date();
    const vencimento = new Date(dataVencimento);
    const diasRestantes = calcularDiasRestantes(vencimento, hoje);

    switch (diasRestantes) {
        case 30:
            console.log('Atenção: Sua garantia expira em 30 dias!');
            enviarNotificacao('Seu produto está com garantia expirada em 30 dias', 'email@cliente.com');
            break;
        case 25:
            console.log('Atenção: Sua garantia expira em 25 dias!');
            enviarNotificacao('Seu produto está com garantia expirada em 25 dias', 'email@cliente.com');
            break;
        case 20:
            console.log('Atenção: Sua garantia expira em 20 dias!');
            enviarNotificacao('Seu produto está com garantia expirada em 20 dias', 'email@cliente.com');
            break;
        case 15:
            console.log('Atenção: Sua garantia expira em 15 dias!');
            enviarNotificacao('Seu produto está com garantia expirada em 15 dias', 'email@cliente.com');
            break;
        case 10:
            console.log('Atenção: Sua garantia expira em 10 dias!');
            enviarNotificacao('Seu produto está com garantia expirada em 10 dias', 'email@cliente.com');
            break;
        case 5:
            console.log('Atenção: Sua garantia expira em 5 dias!');
            enviarNotificacao('Seu produto está com garantia expirada em 5 dias', 'email@cliente.com');
            break;
        default:
            console.log(`Sua garantia expira em ${diasRestantes} dias.`);
            break;
    }
}

function calcularDiasRestantes(vencimento, hoje) {
    const diffTime = vencimento - hoje;
    const diffDays = Math.ceil(diffTime / (1000 * 3600 * 24)); // Converte para dias
    return diffDays;
}


verificarVencimento();

sendEmail();