/* let banco = [
    { 'tarefa': 'Estudar Express', 'status': '' },
    {'tarefa': 'Ver Strager Things', 'status': ''}
]; */



const getBanco = () => JSON.parse(localStorage.getItem('todolist')) ?? [];  //recebe os dados  recem colocados no banco no localStorage
//JSON.parse() transforma o dado para um objeto javascript
/* When receiving data from a web server, the data is always a string.
Parse the data with JSON.parse(), and the data becomes a JavaScript object */

const setBanco = (banco) => localStorage.setItem('todolist', JSON.stringify(banco));//envia os dados no banco do localStorage
/* When sending data to a web server, the data has to be a string.
Convert a JavaScript object into a string with JSON.stringify(). */


const criarItem = (tarefa, status, indice) => {
    const item = document.createElement('label');

    item.classList.add('todo-item');
    item.innerHTML = `
                            <input type="checkbox" ${status} data-indice = ${indice}>
                            <div>${tarefa}</div>
                            <input type="button" value="X" data-indice = ${indice}>
                    `
    document.getElementById('todolist').appendChild(item);
}

const limparTarefa = () => {
    const todolist = document.getElementById('todolist');
    while (todolist.firstChild){
        todolist.removeChild(todolist.lastChild);
    }
}

const atualizarTela = () => {
    limparTarefa()
    const banco = getBanco();
    banco.forEach ((item, indice) => criarItem (item.tarefa, item.status, indice));
}

const inserirItem = (evento) => {
    const tecla = evento.key;
    const texto = evento.target.value;

    if (tecla === 'Enter'){
        const banco = getBanco();
        banco.push( {'tarefa': texto, 'status': ''});
        setBanco(banco);
        atualizarTela();

        evento.target.value = ''; //limpar tarefa
    }
}

const removerItem = (indice) => {  //programa a função deletar da lista
    const banco = getBanco ();
    banco.splice (indice, 1);
    setBanco(banco);
    atualizarTela()
}

const atualizarItem = (indice) => {
    const banco = getBanco();
    
    if (banco[indice].status === '') {
        banco[indice].status = 'checked'
    } else {
        banco[indice].status = ''
    }
    setBanco(banco);

    /* banco[indice].status = banco[indice].status == '' ? 'cheked' : ''; */
    atualizarTela()
}
const clickItem = (evento) => {
    const elemento = evento.target;
    
    if (elemento.type === 'button') {
        const indice = elemento.dataset.indice;
        removerItem(indice);
    } else if (elemento.type === 'checkbox') {
        const indice = elemento.dataset.indice;
        atualizarItem (indice);
    }
}

document.getElementById('new-item').addEventListener('keypress', inserirItem);
document.getElementById('todolist').addEventListener('click', clickItem);


atualizarTela();


