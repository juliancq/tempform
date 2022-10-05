const loginForm = document.querySelector("form.login");
const cuestionarioForm = document.querySelector("form.cuestionario");
const out = document.querySelector(".out");
const loading = document.querySelector(".loading");
const correctas = ["a", "b", "c", "d", "e"];
let respuestas = [];

let puntuacion = 0;

/* Valida el logueo y activa las preguntas*/
function ingresar(){

    if(!loginForm.reportValidity()) return;

    toggleLoading(true);

    setInterval(()=>{
        toggleLoading(false);
        loginForm.style.display = "none";
        cuestionarioForm.style.opacity = "1";
        cuestionarioForm.style.transform = "translateX(0)";
    }, 1500);

    scroll(0,0);
    
    //Insert bd
}

/* Chequea que se haya completado el form, esconde el boton  y envia las respuestas*/
function enviarRespuestas(){

    if(!cuestionarioForm.reportValidity()) return;

    document.querySelector("#enviar-btn").style.display = "none";

    toggleLoading(true);

    chequearRespuestas();

    setInterval(()=>{
        toggleLoading(false);
    }, 1500);

    console.log({
        nombre: loginForm.nombre.value,
        apellido : loginForm.apellido.value,
        email : loginForm.email.value,
        hpc : loginForm.hpc.value,
        respuestas
    })
}

/* Activa la pantalla de despedida */
function despedir(){
    document.querySelector("span#apellido").innerHTML = loginForm.apellido.value;
    document.querySelector("span#nombre").innerHTML = loginForm.nombre.value;

    out.style.display = "flex";
    out.style.opacity = "1";
}

/* Recupera las respuestas del form */
function getRespuestas(){
    let respuestas = [];

    document.querySelectorAll("form.cuestionario input[type=radio]:checked").forEach(radio => {
        respuestas.push(radio.value);
    }) 
    
    return respuestas;
}

/* Recupera las respuestas del usuario en el form y los compara contra las correctas */
/* Pinta las respuestas y oculta los radiobuttons */
function chequearRespuestas(){

    respuestas = getRespuestas();
    let ok = 0;

    for(let i = 0; i < respuestas.length; i++){

        let pregunta = document.querySelectorAll(".pregunta")[i];

        if(correctas[i] == respuestas[i]){
            pregunta.classList.add("correcta")
            ok++; 
        } else {
            pregunta.classList.add("incorrecta")   
        }

        pregunta.querySelectorAll("input").forEach(radio => {

            if(radio.value == correctas[i]) radio.parentElement.classList.add("correcta");
            if(radio.value != correctas[i] && radio.checked) radio.parentElement.classList.add("incorrecta");
            radio.disabled = true;
            if(radio.value == correctas[i]){

                radio.outerHTML = "<div>✔️</div>"
            }else if(radio.value != correctas[i] && radio.checked){

                radio.outerHTML = "<div>❌</div>"
            }else{

                radio.outerHTML = "<div></div>"
            }
        });
    }

    if(ok != 0){
        mostrarPuntaje(ok);
    }
}

/* Activa/desactiva el loader */
function toggleLoading(status){
    if(status){
        loading.style.display = "flex";
    } else {
        loading.style.display = "none";
    }
}

/* Muestra el puntaje en el encabezado */
function mostrarPuntaje(ok){
    scroll(0,0);
    document.querySelector("#puntaje").innerHTML = `Su puntaje es: ${(ok / correctas.length ) * 100} %`
    document.querySelector("#correctas").innerHTML = `Contestó correctamente ${ok} respuesta/s`
}


/* Extiende la capacidad de clickear el radiobutton a toda la respuesta */
document.querySelectorAll(".respuesta").forEach(res => {

        res.addEventListener("click", e => {

            res.querySelector("input").click();
    })
})