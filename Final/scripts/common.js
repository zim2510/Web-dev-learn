function savePlaces()
{
    let saveValue = JSON.stringify(allPlace);
    localStorage.removeItem("allPlace");
    localStorage.setItem("allPlace", saveValue);
}

function readPlace()
{
    let allPlace = localStorage.getItem("allPlace");
    return allPlace?JSON.parse(allPlace):[];
}

function imgToString(file, place, update=false)
{
    let reader = new FileReader();
    $(reader).on("load", ()=>{
        let imgString = reader.result;
        place.imgString = imgString;
        savePlaces();
        update?alert("Place Updated"):alert("New Place Added");
        location.assign("add.html");
    });
    if(update && !file){
        savePlaces();
        update?alert("Place Updated"):alert("New Place Added");
        location.assign("add.html");
    }
    else reader.readAsDataURL(file);
}

function drawImage(imgString, canvas) {
    let context = canvas.getContext('2d');
    let image = new Image(); 
    $(image).on("load", ()=>{
        canvas.width = image.width;
        canvas.height = image.height;
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
    });
    image.src = imgString;
}