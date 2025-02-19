export function cadastrarNome(nome) {
    const regex = /^[A-Za-zÀ-ÿ\s]+$/; 
    return typeof nome === 'string' && nome.length >= 2 && regex.test(nome);
}

export function cadastrarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return typeof email === 'string' && regex.test(email);
}

export function cadastrarTelefone(telefone) {
    const regex = /^\(\d{2}\) \d{5}-\d{4}$/;
    return typeof telefone === 'string' && regex.test(telefone);
}