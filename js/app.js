// *********************************  VARIABLES  ************************************
const listaCursos = document.querySelector('#lista-cursos');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const carrito = document.querySelector('#carrito');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
let articulosCarrito = [];

registrarEventListeners();

// ********************************* EVENTOS ************************************

function registrarEventListeners() {
  // AGREGAR CURSOS AL CARRITO
  listaCursos.addEventListener('click', agregarCurso); // Cuando agregas un curso al carrito
  // ELIMINAR CURSOS DEL CARRITO
  carrito.addEventListener('click', eliminarCurso);
  // VACIAR CARRITO DE COMPRAS
  vaciarCarritoBtn.addEventListener('click', () => {
    articulosCarrito = []; // ASÍ RESETEAMOS EL ARREGLO

    carritoHTML();
  })
};

// *************************************** FUNCIONES ****************************************

// ***************************** FUNCION AGREGA CURSO DEL CARRITO ***************************
function agregarCurso(e) {
  e.preventDefault();
  if (e.target.classList.contains('agregar-carrito')) { // Prevenir Event Bubbling con Delegacion
    const cursoSeleccionado = e.target.parentElement.parentElement; // Traversing

    leerDatosCurso(cursoSeleccionado);
  };
};

// *************************** FUNCION ELIMINA CURSO DEL CARRITO ******************************
function eliminarCurso(e) {
  if (e.target.classList.contains('borrar-curso')) { // Delegación
    const cursoId = e.target.getAttribute('data-id');
    // Elimina del arreglo articulosCarrito por el data-id
    articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);
    carritoHTML(); // volvemos iterar sobre el carrito y mosrtar su HTML

  };

};
// **************************  FUNCION LEE CONTENIDO DEL HTML  *******************************

// Lee el Contenido del HTML al que le dimos Click y extrae información
function leerDatosCurso(curso) {
  // Crear un Objeto con el contenido del curso actual
  const infoCurso = {
    imagen: curso.querySelector('img').src,
    titulo: curso.querySelector('h4').textContent,
    precio: curso.querySelector('.precio span').textContent,
    id: curso.querySelector('a').getAttribute('data-id'),
    cantidad: 1
  }

  // ******************** REVISA SI UN ELEMENTO YA EXISTE EN EL CARRITO *********************
  const existe = articulosCarrito.some(elemento => elemento.id === infoCurso.id)
  if (existe) {
    // Actualizamos la cantidad
    const cursos = articulosCarrito.map(elemento => {
      if (elemento.id === infoCurso.id) {
        elemento.cantidad++;
        return elemento; // RETORNA EL OBJETO ACTUALIZADO
      } else {
        return elemento; // RETORNA LOS OBJETOS QUE NO SON DUPLICADOS PERO SON IMPORTANTES
      }
    });
    articulosCarrito = [...cursos];

  } else {
    // Agregamos el curso al carrito
    articulosCarrito = [...articulosCarrito, infoCurso] // spread operator con corchetes!

  };

  carritoHTML();

};

// ********************** FUNCION MUESTRA EL CARRITO DE COMPRAS EN EL HTML ***********************
function carritoHTML() {
  //limpiar HTML previo
  limpiarHTML();


  articulosCarrito.forEach(elemento => {
    const { imagen, titulo, precio, id, cantidad } = elemento;
    const row = document.createElement('tr');
    row.innerHTML = `
    <td>
      <img src="${imagen}" width="100">
    </td>
    <td>${titulo}</td>
    <td>${precio}</td>
    <td>${cantidad}</td>
    <td>
      <a href="#" class="borrar-curso" data-id="${id}"> X </a>
    </td>
    `;
    // Agrega el HTML del carrito em el tbody
    contenedorCarrito.appendChild(row);

  });

};

// ******************************************************************************************

function limpiarHTML() {
  contenedorCarrito.innerHTML = '';

  // while (contenedorCarrito.firstChild) {
  //   contenedorCarrito.removeChild(contenedorCarrito.firstChild)

  // }
}


