function openModal(target) {

    let title = $('#modal-title')[0];
    title.innerText = target? target : 'Nueva tarea';
    console.log(`hello ${title.innerText}`);
    $('#modal').modal('show');
}