"use strict"

let allPlace = readPlace();
let maxId = Number(localStorage.getItem("count"));
let hash = $(location).attr("hash").substr(1);
let form = $(document).find("#addPlace")[0];
let validTypeName = ["Beach", "Hills", "Fountain", "Landmark"];

if(maxId==null) maxId = 0;

if(hash){
    let index = allPlace.findIndex((elem)=>elem.id==hash);
    $(form[0]).val(allPlace[index].name); 
    $(form[1]).val(allPlace[index].address);
    $(form[2]).val(allPlace[index].rating);
    $(form[3]).val(allPlace[index].type);
}

let Place = function(name, address, rating, type) {
    this.name = name;
    this.address = address;
    this.rating = rating;
    this.type = type;
    this.id = ++maxId;
    localStorage.setItem("count", maxId);
}


$(form).submit((e)=>{
    e.preventDefault();
    let placeType = form[3];

    if(!validTypeName.includes(placeType.value)){
        alert("Provide proper type name please\n");
    }
    else if(form.elements[4].files[0] && form.elements[4].files[0].size>200*1024){
        alert("File is too big. Maximum allowed size is 200KB.");
    }
    else{
        if(!hash){
            let newPlace = new Place($(form[0]).val(), $(form[1]).val(), $(form[2]).val(), $(form[3]).val());
            allPlace.push(newPlace);
            imgToString(form[4].files[0], newPlace);
        }
        else{
            let index = allPlace.findIndex((elem)=>elem.id==hash);

            allPlace[index].name = $(form[0]).val();
            allPlace[index].address = $(form[1]).val();
            allPlace[index].rating = $(form[2]).val();
            allPlace[index].type = $(form[3]).val();
            imgToString(form.elements[4].files[0], allPlace[index], true);
        }
    }
})