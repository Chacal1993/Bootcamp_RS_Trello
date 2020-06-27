document.getElementById("modal").style.display = "none";


function showModal(padre) {
    document.getElementById('btn_guardar').setAttribute('onclick', 'guardarDatos()')
    let modal = document.getElementById("modal");
    cargarDatos(padre)
    modal.style.display = "block"

}

let PARENT = null;
function showModalNewCard(elemento) {
    PARENT = elemento.parentNode;
    document.getElementById('btn_guardar').setAttribute('onclick', 'guardarNewCard()');
    let modal = document.getElementById("modal");
    modal.style.display = "block";

    editarTarea();
    limpiar()
}

function limpiar() {
    let getElementsEditable = document.getElementsByClassName('editable');
    for (const iterator of getElementsEditable) {
        iterator.value = "";
    }
}


function cerrarModal() {
    let modal = document.getElementById("modal");
    modal.style.display = "none";
    resetEditar();
}

function editarTarea() {
    let getTitleEditar = document.getElementsByClassName('title_active');
    let getInputButtons = document.getElementsByClassName('inactive');
    let getTextArea = document.getElementsByClassName('editable');

    /* recoger el valor del textarea antes de editar*/
    let getValorTextArea = document.getElementsByName('textArea')[0].value;

    for (const iterator of getTextArea) {
        iterator.disabled = false;
    }
    while (getTitleEditar[0]) {
        getTitleEditar[0].classList.add('title_inactive')
        getTitleEditar[0].classList.remove('title_active')
    }
    while (getInputButtons[0]) {
        getInputButtons[0].classList.add('active')
        getInputButtons[0].classList.remove('inactive')
    }
}


function resetEditar() {
    let getTitleInactive = document.getElementsByClassName('title_inactive');
    let getEditable = document.getElementsByClassName('editable');
    let getActive = document.getElementsByClassName('active');

    while (getTitleInactive[0]) {
        getTitleInactive[0].classList.add('title_active');
        getTitleInactive[0].classList.remove('title_inactive')
    }
    for (const iterator of getEditable) {
        iterator.disabled = true;
    }
    while (getActive[0]) {
        getActive[0].classList.add('inactive')
        getActive[0].classList.remove('active')
    }
}

let TITLE_SUB_CARD = null;

function cargarDatos(padreContenedor) {
    /* recibir contenedor del sub_card para obtener si primer hijo*/
    TITLE_SUB_CARD = padreContenedor;
    let getTitleCard = padreContenedor.firstElementChild.innerHTML;
    /* actualizar el título del modal con el title de la sub_card */
    document.getElementById('title_mod').innerHTML = getTitleCard;
    document.getElementById('input_title').value = getTitleCard;
}

function guardarDatos() {
    let getTitleInput = document.getElementById('input_title').value;
    document.getElementById('title_mod').innerHTML = getTitleInput;

    if (TITLE_SUB_CARD != null) {
        TITLE_SUB_CARD.firstElementChild.innerHTML = getTitleInput;
    }
    cerrarModal();
}

function guardarNewCard() {
    let abu = null;
    let newTitle = document.getElementById('input_title').value;
    if (PARENT != null) {
        abu = PARENT.parentNode;

        let newSubCard = abu.querySelector('.card>.sub_card')
        console.log(newSubCard)
        let html = `<div class="card card_task" onclick="showModal(this)"> <h4>${newTitle}</h4> </div>`;

        /* insertar texto plano antes de cerrar newSubCard */
        newSubCard.insertAdjacentHTML('beforeend', html);
        cerrarModal();
    }
}

function moverTarea(id) {
    eliminarTarea(TITLE_SUB_CARD);
    if (id == 'toWork') {
        let getElementWork = document.getElementById('wip');
        let containerElement = getElementWork.querySelector('.card>.sub_card')
        /* insertar un Nodo */
        containerElement.append(TITLE_SUB_CARD)
        console.log(getElementWork);
    } else if (id == 'done') {
        let getElementDone = document.getElementById('dn');
        let contenedor = getElementDone.querySelector('.card>.sub_card');
        contenedor.append(TITLE_SUB_CARD)
    } else {
        let getElemetToDo = document.getElementById('td');
        let contenedorToDo = getElemetToDo.querySelector('.card>.sub_card');
        contenedorToDo.append(TITLE_SUB_CARD);
    }

}

function eliminarTarea(tarea) {
    let padreTarea = tarea.parentNode;
    padreTarea.removeChild(tarea)
}