const button = document.querySelector('#send');

console.log(button)

button.addEventListener('click', async(event) => {
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

    await createData(persona)

    await reciveData();


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
    cssCard(infoCard);

}; 
reciveData();

const borraPersona = (hash) => {
    console.log(id);
}

const cssCard = (perfilArray) => {
    // Se estan creando los elementos
    let container = document.querySelector("#principal")
    // if(container){
    //     let body = document.querySelector("body");
    //     body.removeChild("#principal");
            

    // }

    container = document.createElement('div');
    container.id = "principal"
    container.className = 'container';

    // se le agrega contenido a los elementos
    perfilArray.forEach(perfil =>{


        const exit = document.createElement('button');
        exit.innerHTML = 'X';

        const id = perfil.id;

        exit.setAttribute("onclick","borraPersona( "+id+"')");



        const tittle = document.createElement ("div");
        tittle.className = "tittle";

        const info = document.createElement('div');
        info.className = 'info';

        const name = document.createElement('h2');
        const birthdate = document.createElement('h3');
        const gender = document.createElement('h3');
        const country = document.createElement('h3');
        const description = document.createElement('h3');

        name.textContent = perfil.firstName + " " + perfil.lastName;
        birthdate.textContent = "Birthdate:" + " " + perfil.birthdate;
        gender.textContent = "Gender:" + " " + perfil.gender;
        country.textContent = "Country:" + " " + perfil.country;
        description.textContent = "Description:" + " " + perfil.description;

        container.appendChild(info);
        info.appendChild(tittle);
        info.appendChild(exit);
        tittle.appendChild(name);
        info.appendChild(birthdate);
        info.appendChild(gender);
        info.appendChild(country);
        info.appendChild(description);


    
    });

    


    document.body.appendChild(container);
};





