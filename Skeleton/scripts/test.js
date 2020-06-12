let allPlace = JSON.parse(localStorage.getItem("allPlace"));
let x = 1;
let render = function()
{
    allPlace.forEach((place, index)=>{
        let name = document.createElement("td");
        let address = document.createElement("td");
        let rating = document.createElement("td");
        let img = document.createElement("td");
        let action = document.createElement("td");

        name.textContent = place.name;
        address.textContent = place.address;
        rating.textContent = place.rating;

        let row = document.createElement("tr");
        row.appendChild(name);
        row.appendChild(address);
        row.appendChild(rating);

        let pic = document.createElement("img");
        pic.setAttribute("src", "images/placeholder.png");
        pic.classList.add("table-image");
        img.appendChild(pic);
        row.appendChild(img);

        let btndiv = document.createElement("div");
        let btnUpdate = document.createElement("button");
        let btnDelete = document.createElement("button");
        btnUpdate.textContent = "Update";
        btnDelete.textContent = "Delete";

        btnUpdate.classList.add("form-button");
        btnUpdate.classList.add("button-red");

        btnDelete.classList.add("form-button");
        btnDelete.classList.add("button-blue");

        btnDelete.id = index;

        btnDelete.addEventListener("click", (e)=>{
            console.log(e.target.id);
            allPlace.splice(e.target.id, 1);
            let D = document.querySelector("#innerThings");
            D.appendChild(btnUpdate);

        });

        btndiv.appendChild(btnUpdate);
        btndiv.appendChild(btnDelete);

        action.appendChild(btndiv);

        row.append(action);

        let table = document.querySelector("table");
        table.appendChild(row);

        console.log(table.childElementCount);

        while(x==1 && table.childElementCount>1){
            table.deleteRow(1);
        }

        x = 2;
        render();

    })
}

render();