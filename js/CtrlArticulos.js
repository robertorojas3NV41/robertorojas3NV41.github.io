import {
  getAuth,
  getFirestore
} from "../lib/fabrica.js";
import {
  cod,
  getString,
  muestraError
} from "../lib/util.js";
import {
  tieneRol
} from "./seguridad.js";

const daoArticulo = getFirestore().
  collection("Articulos");
let usuarioId = "";
/** @type {HTMLFormElement} */
const forma = document["forma"];
/** @type {HTMLUListElement} */
const lista = document.
  querySelector("#lista");

getAuth().onAuthStateChanged(
  protege, muestraError);

/** @param {import(
    "../lib/tiposFire.js").User}
    usuario */
async function protege(usuario) {
  if (tieneRol(usuario,
    ["Cliente"])) {
    consulta();
    forma.addEventListener(
      "submit", agrega);
  }
}

/** Agrega un usuario a la base de
 * datos.
 * @param {Event} evt */
async function agrega(evt) {
  try {
    evt.preventDefault();
    const formData =
      new FormData(forma);
    /** @type {string} */
    const nombre = getString(
      formData, "nombre").trim();
    const precio = getString(
      formData, "precio").trim();
    const descripcion = getString(
      formData, "descripcion").trim();
    const modelo = {
      nombre,
      precio,
      descripcion
    };
    /* El modelo se agrega a
     * la colección
     * "Articulos". */
    await daoArticulo.add(modelo);
    forma.texto.value = "";
  } catch (e) {
    muestraError(e);
  }
}
