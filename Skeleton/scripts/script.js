let allPlace = JSON.parse(localStorage.getItem("allPlace"));
if(allPlace==null) allPlace = [];

let Place = function(name, address, rating, type) {
    this.name = name;
    this.address = address;
    this.rating = rating;
    this.type = type;
}

function savePlaces()
{
    let saveValue = JSON.stringify(allPlace);
    localStorage.removeItem("allPlace");
    localStorage.setItem("allPlace", saveValue);
}

let form = document.querySelector("#addPlace");
form.addEventListener("submit", (e)=>{
    e.preventDefault();
    let newPlace = new Place(e.target.elements[0].value, e.target.elements[1].value, e.target.elements[2].value, e.target.elements[3].value);
    alert("New Place Added");
    e.target.reset();
    console.log(newPlace);
    allPlace.push(newPlace);
    savePlaces();
})