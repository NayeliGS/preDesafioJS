//
//Obtener info en las variables de url
let urlPathEdit = window.location.href ; //obtiene el url completo
let id = window.location.search; //obtiene ' + hash
let hashId = id.replace('?', ''); //obtiene puro hash

const button = document.querySelector('#edit');

console.log(urlPathEdit);
console.log(id);
// obtener la data de firebase:
const getDataById = async (hash) => {
try {
    const datos = await fetch(`https://predesafiojs-default-rtdb.firebaseio.com/${hash}.json`, {
        method: 'GET',
    });
    const objectHash = await datos.json();
    // console.log(dataJson)
    return objectHash
} catch(e) {
    console.error('Error: ', e)
}

}
//getDataById(hashId);

document.addEventListener('DOMContentLoaded', async (e) => {
e.preventDefault();
let object = await getDataById(hashId);
console.log(object)
document.body.innerHTML = `
<h1>Edita el articulo</h1>
<form>
    <label for="firstName">Nombre:</label>
    <input type="text" id="firstName" value="${object.firstName}" name="firstName" required>

    <label for="lastName">Apellido:</label>
    <input type="text" id="lastName" value="${object.lastName}" name="lastName" required>

    <label for="lastName">Agrega URL de una imagen:</label>
    <input type="text" id="urlImg" name="url" value="${object.urlImg}" required>

    <label for="birthdate">Fecha de nacimiento:</label>
    <input type="date" id="birthdate" value="${object.birthdate}" name="birthdate" required>

    <label>Género:</label>
    
    <input type="radio" id="male" name="gender" value="male" required ${object.gender == 'male'?'checked':''}>
    <label for="male">Masculino</label>
    <input type="radio" id="female" name="gender" value="female" required ${object.gender == 'female'?'checked':''}>
    <label for="female">Femenino</label>
    
    <label for="country">País:</label>
    
    <select id="country" name="country" required>
        <option value="">Selecciona un país</option>
        <option value="argentina" ${object.country == 'argentina'?'selected':''}>Argentina</option>
        <option value="brasil" ${object.country == 'brasil'?'selected':''}>Brasil</option>
        <option value="colombia" ${object.country == 'colombia'?'selected':''}>Colombia</option>
        <option value="mexico" ${object.country == 'mexico'?'selected':''}>México</option>
    </select>

    <label for="description">Descripción:</label>
    <textarea id="description" name="description" rows="4" cols="50" required>${object.description}</textarea>

    <span id="error-message" class="error-message"></span>

    <button type="submit" id="edit" >Editar</button>
</form>
`;


const button = document.querySelector('#edit');
console.log(button);

button.addEventListener('click', async(event) => {
    event.preventDefault();
    console.log('Funciona')
    // event.preventDefault();

    const firstName = document.querySelector('#firstName');
    const lastName = document.querySelector('#lastName');
    const urlImgg = document.querySelector('#urlImg');
    const birthdate = document.querySelector('#birthdate');
    const gender = document.querySelector('input[name="gender"]:checked');
    const country = document.querySelector('#country');
    const description = document.querySelector('#description');

    const persona = {
        firstName: firstName.value,
        lastName:lastName.value,
        urlImg: urlImgg.value, 
        birthdate:birthdate.value,
        gender:gender.value,
        country:country.value,
        description:description.value
        
    };
    console.log(persona);
    
    await updateElement(persona);
    await editarPersona();

    let urlPathIndex = `./Formulario.html`;
    window.location.href = urlPathIndex;


    });



});



const updateElement = async (element) => {
try {
     console.log(hashId)
    
    //
    let datosCrudos = await fetch(`https://predesafiojs-default-rtdb.firebaseio.com/${hashId}.json`, {
        method: 'PUT',
        headers: {
            "Content-type": "application/json;charset=UTF-8"
        },
        body: JSON.stringify(element),
    });
} catch (e) {
    console.error('Error: ', e);
}
}

const editarPersona = async(hash) => {
    let urlPathEditar = `./Formulario.html`;
    window.location.href = urlPathEditar;
}