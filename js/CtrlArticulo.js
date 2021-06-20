import {
  getAuth,
  getFirestore
} from "../lib/fabrica.js";
import {
  eliminaStorage,
  urlStorage
} from "../lib/storage.js";
import {
  muestraError
} from "../lib/util.js";
import {
  muestraUsuarios
} from "./navegacion.js";
import {
  tieneRol
} from "./seguridad.js";
import {
  checksRoles,
  guardaUsuario,
} from "./usuarios.js";

const params =
  new URL(location.href).
    searchParams;
const id = params.get("id");
const daoUsuario = getFirestore().
  collection("Usuario");
const daoArticulos = getFirestore().
  collection("Articulos");
/** @type {HTMLFormElement} */
const forma = document["forma"];
/** @type {HTMLUListElement} */
const listaRoles = document.
  querySelector("#listaRoles");
getAuth().onAuthStateChanged(
  protege, muestraError);

/** @param {import(
    "../lib/tiposFire.js").User}
    usuario */
async function protege(usuario) {
  if (tieneRol(usuario,
    ["Trabajador"])) {
    busca();
  }
}

async function busca() {
  try {
    const doc = await daoArticulos.
      doc(id).
      get();
    if (doc.exists) {
      const data = doc.data();
      forma.addEventListener(
        "submit", guarda);
      forma.eliminar.
        addEventListener(
          "click", elimina);
    }
  } catch (e) {
    muestraError(e);
    muestraUsuarios();
  }
}

/** @param {Event} evt */
async function guarda(evt) {
    new formData(forma);
  try {
    evt.preventDefault();
    const nombre = getString(
      formData, "nombre").trim();
    const precio = getString(
      formData, "precio").trim();
    const descripcion = getString(
      formData, "descripcion").trim();
    await daoArticulos.
      doc(id).
      set({
        descripcion,
        nombre,
        precio
      });
    location.href = "articulos.html";
  } catch (e) {
    muestraError(e);
  }
}

async function elimina() {
  try {
    if (confirm("Confirmar la " +
      "eliminación")) {
      await daoUsuario.
        doc(id).delete();
      await eliminaStorage(id);
      muestraUsuarios();
    }
  } catch (e) {
    muestraError(e);
  }
}
