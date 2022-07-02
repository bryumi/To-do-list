let banco = [
    { 'tarefa': 'Estudar Express', 'status': '' },
    {'tarefa': 'Ver Strager Things', 'status': ''}
]

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
    banco.forEach ((item, indice) => criarItem (item.tarefa, item.status, indice));
}

const inserirItem = (evento) => {
    const tecla = evento.key;
    const texto = evento.target.value;

    if (tecla === 'Enter'){
        banco.push( {'tarefa': texto, 'status': ''});
        atualizarTela();

        evento.target.value = ''; //limpar tarefa
    }
}

const removerItem = (indice) => {  //programa a função deletar da lista
    banco.splice (indice, 1);
    atualizarTela()
}

const atualizarItem = (indice) => {

    if (banco[indice].status === '') {
        banco[indice].status = 'checked'
    } else {
        banco[indice].status = ''
    }

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


