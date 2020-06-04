"use strict"

let allPlace = readPlace();
let maxId = Number(localStorage.getItem("count"));
let hash = location.hash.substr(1);
let form = document.querySelector("#addPlace");
let validTypeName = ["Beach", "Hills", "Fountain", "Landmark"];

if(maxId==null) maxId = 0;

if(hash){
    let index = allPlace.findIndex((elem)=>elem.id==hash);
    form.elements[0].value = allPlace[index].name;
    form.elements[1].value = allPlace[index].address;
    form.elements[2].value = allPlace[index].rating;
    form.elements[3].value = allPlace[index].type;
}

let Place = function(name, address, rating, type) {
    this.name = name;
    this.address = address;
    this.rating = rating;
    this.type = type;
    this.id = ++maxId;
}


form.addEventListener("submit", (e)=>{
    e.preventDefault();
    let placeType = form.elements[3];
    if(!validTypeName.includes(placeType.value)){
        alert("Provide proper type name please\n");
    }
    else if(form.elements[4].files[0].size>200*1024){
        alert("File is too big. Maximum allowed size is 200KB.");
    }
    else{
        placeType.setCustomValidity("");
        if(!hash){
            let newPlace = new Place(e.target.elements[0].value, e.target.elements[1].value, e.target.elements[2].value, e.target.elements[3].value);
            allPlace.push(newPlace);
            imgToString(e.target.elements[4].files[0], newPlace);
        }
        else{
            let index = allPlace.findIndex((elem)=>elem.id==hash);
            allPlace[index].name = form.elements[0].value;
            allPlace[index].address = form.elements[1].value;
            allPlace[index].rating = form.elements[2].value;
            allPlace[index].type = form.elements[3].value;
            imgToString(form.elements[4].files[0], allPlace[index], true);
        }
    }
})