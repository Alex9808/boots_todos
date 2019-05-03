let tasks = [
    {
        desc: 'Modificar este ejemplo',
        completed: false,
    },
    {
        desc: 'Aprender a usar bootstrap',
        completed: false,
    }
];
let editing = -1;
$(function () {
    updateTasks();
    $('#modal').on('hide.bs.modal', function (e) {
        $('#completed-check')[0].checked = false;
        $('#description-input')[0].value = '';
        editing = -1;
    })
});

function openModal(target) {
    let title = $('#modal-title')[0];
    title.innerText = target !== undefined ? 'Editar tarea ' + (target + 1) : 'Nueva tarea';
    if (target !== undefined) {
        $('#completed-check')[0].checked = tasks[target].completed;
        $('#description-input')[0].value = tasks[target].desc;
        editing = target;
    }
    $('#modal').modal('show');
}

function addTask() {
    let checked = $('#completed-check')[0];
    let desc = $('#description-input')[0];
    if (editing === -1)
        tasks.push({
            completed: checked.checked,
            desc: desc.value
        });
    else tasks[editing] = {
        completed: checked.checked,
        desc: desc.value
    };
    $('#modal').modal('hide');
    checked.checked = false;
    desc.value = '';
    editing = -1;
    updateTasks();
}

function removeTask(id) {
    tasks.splice(id, 1);
    updateTasks();
}

function updateTasks() {
    let el = $('#tasks-area')[0];
    el.innerHTML = '';
    for (let i = 0; i < tasks.length; i++) {
        el.innerHTML += getTaskTemplate(tasks[i], i);
    }
}

const completeTask = (id, checked) => {
    tasks[id].completed = checked;
    updateTasks();
};
getActionButtons = id => {
    return `<td>
                <button onclick="removeTask(${id})" class="btn btn-danger rounded-circle fab" data-toggle="tooltip" data-placement="bottom"
                        title="Eliminar">
                    <i class="material-icons">delete</i>
                </button>
                <button onclick="openModal(${id})" class="btn btn-warning rounded-circle fab" data-toggle="tooltip" data-placement="bottom"
                        title="Editar">
                    <i class="material-icons">edit</i>
                </button>
            </td>`;
};
getTaskTemplate = (task, id) => {
    return `<tr>
                <th scope="row">${id + 1}</th>
                <td>${task.completed ? `<strike>${task.desc}</strike>` : task.desc}</td>
                <td><input onchange="completeTask(${id}, this.checked)" type="checkbox" ${task.completed ? 'checked' : ''} value="completed"/></td>
                ${getActionButtons(id)}
            </tr>`;
};