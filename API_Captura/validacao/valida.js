export function cadastrarNome(nome) {
    const regex = /^[A-Za-zÀ-ÿ\s]+$/; 
    //const isValid = nome.length >= 2 && regex.test(nome);
    //return isValid;
    return typeof nome === 'string' && nome.length >= 2 && regex.test(nome);
}

export function cadastrarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    //const isValid = regex.test(email);
    return typeof email === 'string' && regex.test(email);
}

export function cadastrarTelefone(telefone) {
    const regex = /^\(\d{2}\) \d{5}-\d{4}$/;
    return typeof telefone === 'string' && regex.test(telefone);
}

export function ValidaUsuario(nome, email, telefone) {
    const nomeValido = cadastrarNome(nome);
    const emailValido = cadastrarEmail(email);
    const telefoneValido = cadastrarTelefone(telefone);

    const ValidaUsuario = nomeValido && emailValido && telefoneValido;

    if (ValidaUsuario) {
        return{status: true, mensagem: ''}
    } else {
        return{status: false, mensagem: 'Nome e/ou Email inválido(s).'}
    }
}