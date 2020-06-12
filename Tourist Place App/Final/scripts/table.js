"use strict"

let allPlace = readPlace();
let filterText = "";
let sorting = "asc";

sortPlaces();
render();

function sortPlaces(){
    if(sorting=="asc") allPlace.sort((a, b)=>{
        if(a.rating<b.rating) return -1;
        else if(a.rating===b.rating) return 0;
        else if(a.rating>b.rating) return 1;
    })
    else{
        allPlace.sort((a, b)=>{
            if(a.rating<b.rating) return 1;
            else if(a.rating===b.rating) return 0;
            else if(a.rating>b.rating) return -1;
        })
    }
}

function render(){
    $("tr").remove(".entry");
    let filteredPlace = allPlace.filter((val)=>{
        return val.name.toLowerCase().includes(filterText.toLowerCase());
    });
    filteredPlace.forEach((place)=>{
        let newRow = createRow(place);
        let table = document.querySelector("table");
        table.append(newRow);
    })
}


function createRow(place){

    let name = document.createElement("td");
    let address = document.createElement("td");
    let rating = document.createElement("td");
    let img = document.createElement("td");
    let action = document.createElement("td");
    let btnDiv = document.createElement("div");
    let btnUpdate = document.createElement("button");
    let btnDelete = document.createElement("button");
    let pic = document.createElement('canvas');
    let row = document.createElement("tr");


    $(name).text(place.name);
    $(address).text(place.address);
    $(rating).text(place.rating);
    $(pic).addClass("table-image");
    $(btnUpdate).addClass("form-button button-blue").text("Update");
    $(btnDelete).addClass("form-button button-red").text("Delete");
    $(row).addClass("entry");



    
    img.append(pic);
    drawImage(place.imgString, pic);
    makeDeleteButton(btnDelete, place.id);
    makeUpdateButton(btnUpdate, place.id);

    btnDiv.append(btnUpdate);
    btnDiv.append(btnDelete);
    action.append(btnDiv);
    row.append(name);
    row.append(address);
    row.append(rating);
    row.append(img);
    row.append(action);

    return row;
}

function makeDeleteButton(btnDelete, id) {
    $(btnDelete).click((e)=>{
        let index = allPlace.findIndex((elem)=>elem.id==id);
        allPlace.splice(index, 1);
        savePlaces();
        render();
    })
}

function makeUpdateButton(btnUpdate, id) {
    $(btnUpdate).click((e)=>{
        location.assign(`add.html#${id}`);
    })
}


$("#search").keyup((e)=>{
    filterText = e.target.value;
    console.log("Text "+ filterText);
    render();
});

$("#sorting").change((e)=>{
    sorting = e.target.value;
    sortPlaces();
    render();
})
