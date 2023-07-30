const button = document.querySelector('#send');

console.log(button)

button.addEventListener('click', (event) => {
    event.preventDefault();    

    const firstName = document.querySelector('#firstName');
    const lastName = document.querySelector('#lastName');
    const birthdate = document.querySelector('#birthdate');
    const gender = document.querySelector('input[name="gender"]:checked');
    const country = document.querySelector('#country');
    const description = document.querySelector('#description');

      const persona = {
        firstName: firstName.value,
        lastName:lastName.value,
        birthdate:birthdate.value,
        gender:gender.value,
        country:country.value,
        description:description.value
    };
    console.log(persona)

    createData(persona)
    
});

/////////////////////////////// DATOS ALMACENADOS EN FIREBASE //////////////////////////////////////

const createData = async(persons) => {

    const dataBase = await fetch("https://predesafiojs-default-rtdb.firebaseio.com/.json", { 
        method: "POST",
        headers: {
            "Content-type": "application/json;charset=UTF-8"
        },
        body: JSON.stringify(persona),
    });
}; 

// const consultarTodos = async() => {
    
//     pintarDom(ArrayTodod)
// }







