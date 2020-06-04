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
    clearTable();
    let filteredPlace = allPlace.filter((val)=>{
        return val.name.toLowerCase().includes(filterText.toLowerCase());
    });
    filteredPlace.forEach((place)=>{
        let newRow = createRow(place);
        let table = document.querySelector("table");
        table.append(newRow);
    })
}

function clearTable()
{
    let table = document.querySelector("table");
    while(table.childElementCount!=1){
        table.deleteRow(1);
    }
}

function createRow(place){

    let name = document.createElement("td");
    let address = document.createElement("td");
    let rating = document.createElement("td");
    let img = document.createElement("td");
    let action = document.createElement("td");

    name.textContent = place.name;
    address.textContent = place.address;
    rating.textContent = place.rating;



    let pic = document.createElement('canvas');
    pic.classList.add("table-image");
    img.append(pic);
    drawImage(place.imgString, pic);

    let btnDiv = document.createElement("div");

    let btnUpdate = document.createElement("button");
    let btnDelete = document.createElement("button");
    btnUpdate.textContent = "Update";
    btnDelete.textContent = "Delete";

    btnUpdate.classList.add("form-button");
    btnUpdate.classList.add("button-blue");

    btnDelete.classList.add("form-button");
    btnDelete.classList.add("button-red");

    makeDeleteButton(btnDelete, place.id);
    makeUpdateButton(btnUpdate, place.id);

    btnDiv.append(btnUpdate);
    btnDiv.append(btnDelete);

    action.append(btnDiv);

    let row = document.createElement("tr");
    row.append(name);
    row.append(address);
    row.append(rating);
    row.append(img);
    row.append(action);

    return row;
}

function makeDeleteButton(btnDelete, id) {
    btnDelete.addEventListener("click", (e)=>{
        let index = allPlace.findIndex((elem)=>elem.id==id);
        allPlace.splice(index, 1);
        savePlaces();
        render();
    })
}

function makeUpdateButton(btnUpdate, id) {
    btnUpdate.addEventListener("click", (e)=>{
        location.assign(`add.html#${id}`);
    })
}


document.querySelector("#search").addEventListener("keyup", (e)=>{
    filterText = e.target.value;
    console.log("Text "+ filterText);
    render();
});

document.querySelector("#sorting").addEventListener("change", (e)=>{
    sorting = e.target.value;
    sortPlaces();
    render();
})
