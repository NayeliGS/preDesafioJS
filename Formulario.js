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

const borraPersona = async(hash) => {

    console.log(hash);
    const response = await fetch(`https://predesafiojs-default-rtdb.firebaseio.com/${hash}.json`,{
        method:'DELETE',
        
    });

    const data = await response.json();

    console.log(data);

    await reciveData();
}

const cssCard = (perfilArray) => {
    
    let container = document.querySelector("#principal")
    if(container){
        container.remove();
    }

    container = document.createElement('div');
    container.id = "principal"
    container.className = 'container';

    perfilArray.forEach(perfil =>{


        const exit = document.createElement('button');
        exit.innerHTML = 'X';

        const id = perfil.id;

        exit.setAttribute("onclick","borraPersona('"+id+"')");
        exit.setAttribute("className","bottonRed");
        exit.className = "exit";


        const buttonexit = document.createElement ("div");
        buttonexit.className = "buttonexit";
        
        const tittle = document.createElement ("div");
        tittle.className = "tittle";

        const info = document.createElement('div');
        info.className = 'info';

        const name = document.createElement('h2');
        const birthdate = document.createElement('h4');
        const gender = document.createElement('h4');
        const country = document.createElement('h4');
        const description = document.createElement('h4');

        name.textContent = perfil.firstName + " " + perfil.lastName;
        birthdate.textContent = "Birthdate:" + " " + perfil.birthdate;
        gender.textContent = "Gender:" + " " + perfil.gender;
        country.textContent = "Country:" + " " + perfil.country;
        description.textContent = "Description:" + " " + perfil.description;

        container.appendChild(info);
        info.appendChild(buttonexit);
        buttonexit.appendChild(exit);
        info.appendChild(tittle);
        tittle.appendChild(name);
        info.appendChild(birthdate);
        info.appendChild(gender);
        info.appendChild(country);
        info.appendChild(description);


    
    });

    


    document.body.appendChild(container);
};





