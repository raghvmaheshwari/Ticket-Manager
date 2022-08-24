let addBtn = document.querySelector(".add"); //selected add button
let modal =document.querySelector(".modal");//access modal container
let addFlag = false //default value of add button
//event listner on click
addBtn.addEventListener("click",(e)=>{ 
    //Display Modal
    //Generate Ticket
    //AddFlag - true : Modal Display
    //AddFlag - false: Modal None
    addFlag=!addFlag //toggle for add button
    if(addFlag){
        modal.style.display="flex";  //clicked on button diplay:set to flex

    }
    else{
        modal.style.display="none"; //dipslay set to none
    }
})