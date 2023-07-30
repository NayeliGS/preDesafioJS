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

    reciveData();


});


const createData = async(persons) => {
   
    const dataBase = await fetch("https://predesafiojs-default-rtdb.firebaseio.com/.json", { 
        method: "POST",
        headers: {
            "Content-type": "application/json;charset=UTF-8"
        },
        body: JSON.stringify(persons),
    });
}; 



const reciveData = async() => {

    const recive = await fetch("https://predesafiojs-default-rtdb.firebaseio.com/.json", { 
        method: "GET",
    });
    const data = await recive.json();

    const array = Object.entries(data);

    const infoCard = array.map((item)=>{
        console.log(item[0]);
        const object = {
            id:item[0],
            birthdate:item[1].birthdate,
            country: item[1].country,
            description: item[1].description,
            firstName: item[1].firstName,
            gender: item[1].gender,
            lastName: item[1].lastName,
        }
        return object;
    })

    console.log(infoCard);
    
    infoCard.forEach(card =>{
        cssCard(card);
    })

}; 
reciveData();


const cssCard = (perfil) => {
    // Se estan creando los elementos
    const container = document.createElement('div');
    const info = document.createElement('div');
    const name = document.createElement('h2');
    

    // se le agrega contenido a los elementos
    
    name.textContent = perfil.firstName + " " + perfil.lastName;


    // se agregan clases a los elementos
    container.className = 'container';
    info.className = 'info';


// Esta inyectando los elementos en el lugar correspondiente
 

    container.appendChild(info);
    info.appendChild(name);
    

    document.body.appendChild(container);
};





