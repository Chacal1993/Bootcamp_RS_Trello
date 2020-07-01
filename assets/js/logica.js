/* referencia al contenedor padre de las tareas */
let PADRE_SELECCIONADO = null;
let TAREA_SELECCIONADA = null;

function showModal(elementClicked) {
    TAREA_SELECCIONADA = elementClicked;
    /* obtener elemento por el id */
    let idModal = document.getElementById('modal');
    /* cambiar estilo a un elemento */
    idModal.style.display = 'block';

    /* obtener padre de un elemento */
    let nodoPadre = elementClicked.parentNode;

    /* donde estoy (card) */
    let abu = nodoPadre.parentNode;

    PADRE_SELECCIONADO = abu;

    selectButtonStatus(abu);

    let title = elementClicked.innerText;
    idModal.querySelector('#title_mod').innerHTML = title;
    idModal.querySelector('#input_title').value = title;

}

function cerrarModal() {
    let idModal = document.getElementById('modal');
    idModal.style.display = 'none';

    /* reestablecer botones */
    let btnTd = document.getElementById('toDo');
    btnTd.style.display = 'block';
    let btnWip = document.getElementById('toWork');
    btnWip.style.display = 'block';
    let btnDone = document.getElementById('done');
    btnDone.style.display = 'block';


    reset();

    TAREA_SELECCIONADA = null;

}

/* seleccionar botones que se muestran de acuerdo al componente donde se encuentran */
function selectButtonStatus(contenedor) {
    if (contenedor.id === 'td') {
        let btnTd = document.getElementById('toDo');
        btnTd.style.display = 'none';
    } else if (contenedor.id === 'wip') {
        let btnWip = document.getElementById('toWork');
        btnWip.style.display = 'none';
    } else {
        let btnDone = document.getElementById('done');
        btnDone.style.display = 'none';
    }
}

function editarTarea() {
    mostrarOcultar('inactive', 'active', 'title_active', 'title_inactive');
    /* hacer editable los textos */
    editable(false);
}

function mostrarOcultar(inactive, active, title_act, title_inact) {
    let elementosInactivos = document.getElementsByClassName(inactive);
    while (elementosInactivos[0]) {
        elementosInactivos[0].classList.add(active);
        elementosInactivos[0].classList.remove(inactive);
    }
    /* selecciono los elementos con clase title-active */
    let elementActives = document.getElementsByClassName(title_act);
    while (elementActives[0]) {
        elementActives[0].classList.add(title_inact);
        elementActives[0].classList.remove(title_act);
    }

}

function editable(valor) {
    let elementEditable = document.getElementsByClassName('editable');

    for (const iter of elementEditable) {
        iter.disabled = valor; //poner en falso
    }
}
/* volver funciones al estado inicial */
function reset() {
    mostrarOcultar('active', 'inactive', 'title_inactive', 'title_active');
    editable(true);
}

function guardarDatos() {
    /* caso que la tarea ya está creada */
    if (TAREA_SELECCIONADA != null) {
        let input = document.getElementById('input_title').value;

        let textarea = document.getElementsByTagName('textarea')[0].value;
        /* actualizar valor en el DOM */
        document.getElementById("title_mod").innerHTML = input;

        /* actualizar el titulo de la tarea */
        /* acceder al titulo de la tarea por el padre global */
        PADRE_SELECCIONADO.querySelector('.card_task>h4').innerHTML = input;
        reset();
    } else {
        console.log('guardando nueva')
        guardarNewCard();
    }

}

function moverTarea(idBoton) {
    if (idBoton === 'toWork') {
        let contendorDestino = document.getElementById('wip');

        let cardDestino = contendorDestino.querySelector('.card > .sub_card');
        cardDestino.append(TAREA_SELECCIONADA);
    } else if (idBoton === 'toDo') {
        let contendorDestino = document.getElementById('td');

        let cardDestino = contendorDestino.querySelector('.card > .sub_card');
        cardDestino.append(TAREA_SELECCIONADA);
    } else {
        let contendorDestino = document.getElementById('dn');

        let cardDestino = contendorDestino.querySelector('.card > .sub_card');
        cardDestino.append(TAREA_SELECCIONADA);
    }
    cerrarModal();
}

function eliminarTarea() {
    /* obtengo el padre que contiene esa tarea y le indico que la elimine */
    let padreTarea = TAREA_SELECCIONADA.parentNode;
    padreTarea.removeChild(TAREA_SELECCIONADA);
    cerrarModal();
}

function showModalNewCard(boton) {

    limpiar();
    PADRE_SELECCIONADO = boton.parentNode;
    let modal = document.getElementById('modal');
    modal.style.display = 'block';

    editable(false);
    mostrarOcultar('inactive', 'active', 'title_active', 'title_inactive');

}

function guardarNewCard() {
    let input = document.getElementById('input_title').value;

    let textarea = document.getElementsByTagName('textarea')[0].value;
    /* actualizar valor en el DOM */
    document.getElementById("title_mod").innerHTML = input;

    /* crear la tarea a insertar */
    let html = `<div class="card card_task" onclick="showModal(this)"><h4>${input}</h4> </div>`;

    /* donde insertamos */
    let padre = PADRE_SELECCIONADO.parentNode;
    console.log(padre)
    /* insertando en el contenedor de tarjeta al final */
    let insertar = padre.querySelector('.card>.sub_card');
    insertar.insertAdjacentHTML('beforeend', html);


    cerrarModal();

}

function limpiar() {
    document.getElementById('input_title').value = '';

    document.getElementsByTagName('textarea')[0].value = '';
}