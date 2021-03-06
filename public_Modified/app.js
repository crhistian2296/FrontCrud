console.log('holaaa');
/*=================INTERFAZ================= */
/* Botones CRUD */
let create = document.getElementById('create');
let read = document.getElementById('read');
let update = document.getElementById('update');
let deleted = document.getElementById('delete');

/* Formularios CRUD */
var formularioCreate = document.getElementById('createForm');
var formularioUpdate = document.getElementById('updateForm');
var formularioRead = document.getElementById('getForm');
var formularioDelete = document.getElementById('deleteForm');


/* Campos input */
let nombre = document.getElementById('nombre');
let apellido = document.getElementById('apellido');
let id = document.getElementById('id');

/* Funciones onclik */
create.onclick = function () {
  formularioCreate.style.display = 'block';
  formularioUpdate.style.display = 'none';
  formularioRead.style.display = 'none';
  formularioDelete.style.display = 'none';

  nombre.style.display = 'block';
  apellido.style.display = 'block';
  id.style.display = 'block';
}

read.onclick = function () {
  formularioCreate.style.display = 'none';
  formularioUpdate.style.display = 'none';
  formularioRead.style.display = 'block';
  formularioDelete.style.display = 'none';

  nombre.style.display = 'none';
  apellido.style.display = 'none';
  id.style.display = 'none';
}

update.onclick = function () {
  formularioCreate.style.display = 'none';
  formularioUpdate.style.display = 'block';
  formularioRead.style.display = 'none';
  formularioDelete.style.display = 'none';

  nombre.style.display = 'block';
  apellido.style.display = 'block';
  id.style.display = 'block';
}

deleted.onclick = function () {
  formularioCreate.style.display = 'none';
  formularioUpdate.style.display = 'none';
  formularioRead.style.display = 'none';
  formularioDelete.style.display = 'block';


  nombre.style.display = 'none';
  apellido.style.display = 'none';
  id.style.display = 'block';
}

/*=================BASE DE DATOS================= */

/* CREATE */
formularioCreate.addEventListener('submit', function (e) {
  e.preventDefault();
  console.log('creaste con un click');
  let datos = new FormData(formularioCreate);
  let nombreestudiante = datos.get('nombre');
  let apellidoestudiante = datos.get('apellido');
  let idestudiante = datos.get('identificacion');

  let myHeaders = new Headers();

  const options = {
    method: 'POST',
    headers: myHeaders,
    body: new URLSearchParams({
      'nombre': nombreestudiante,
      'apellido': apellidoestudiante,
      'numid': idestudiante
    }),
  }

  fetch('/basedatos/insertarestudiante', options)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    });
});

/* UPDATE */
formularioUpdate.addEventListener('submit', function (e) {
  e.preventDefault();
  console.log('actualizaste con un click');
  let datos = new FormData(formularioUpdate);
  let nombreestudiante = datos.get('nombre');
  let apellidoestudiante = datos.get('apellido');
  let idestudiante = datos.get('identificacion');

  let myHeaders = new Headers();

  const options = {
    method: 'PUT',
    headers: myHeaders,
    body: new URLSearchParams({
      'nombre': nombreestudiante,
      'apellido': apellidoestudiante,
      'numid': idestudiante
    }),
  }

  fetch('/basedatos/actualizarestudiante', options)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    });
});

/* READ */
formularioRead.addEventListener('submit', function (e) {
  e.preventDefault();
  console.log('leiste con un click');

  let myHeaders = new Headers();

  const options = {
    method: 'GET',
    headers: myHeaders,
  }

  fetch('/basedatos/consultarestudiantes', options)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);

      var codigoHTML = `
        <fieldset id="submit">
          <button name="consultar" type="submit" id="consultar-submit" data-submit="...Sending">Consultar</button>
        </fieldset>
        <table>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Identificacion</th>
          </tr>`;
      for (let i = 0; i < data.length; i++) {
        codigoHTML += `
          <tr>
            <td>${data[i].nombre}</td>
            <td>${data[i].apellido}</td>
            <td>${data[i].numid}</td>
          </tr>`;
      }
      codigoHTML += `</table>`;
      formularioRead.innerHTML = codigoHTML;
    });
});

/* DELETE */
formularioDelete.addEventListener('submit', function (e) {
  e.preventDefault();
  console.log('eliminaste con un click');
  let datos = new FormData(formularioDelete);
  let idestudiante = datos.get('identificacion');

  let myHeaders = new Headers();

  const options = {
    method: 'DELETE',
    headers: myHeaders,
    body: new URLSearchParams({
      'numid': idestudiante
    }),
  }

  fetch('/basedatos/eliminarestudiante', options)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    });
});