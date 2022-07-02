let banco = [
    { 'tarefa': 'Estudar Express', 'status': 'checked' },
    {'tarefa': 'Ver Strager Things', 'status': ''}
]

const criarItem = (tarefa, status) => {
    const item = document.createElement('label');

    item.classList.add('todo-item');
    item.innerHTML = `
                            <input type="checkbox" ${status}>
                            <div>${tarefa}</div>
                            <input type="button" value="X">
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
    banco.forEach (item => criarItem (item.tarefa, item.status));
}

const inserirItem = (evento) => {
    const tecla = evento.key;
    const texto = evento.target.value;

    if (tecla === 'Enter'){
        banco.push( {'tarefa': texto, 'status': ''});
        atualizarTela();

        evento.target.value = '';
    }
}

document.getElementById('new-item').addEventListener('keypress', inserirItem);

atualizarTela();


