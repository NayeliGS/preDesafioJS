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
            age:item[1].age,
            name: item[1].name
        }
        return object;
    })

    console.log(infoCard);
    
}; 
reciveData();




