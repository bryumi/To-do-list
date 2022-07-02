const criarItem = (text, status='') => {
    const item = document.createElement('label');

    item.classList.add('todo-item');
    item.innerHTML = `
                            <input type="checkbox" ${status}>
                            <div>${text}</div>
                            <input type="button" value="X">
                    `
    document.getElementById('todolist').appendChild(item);
}