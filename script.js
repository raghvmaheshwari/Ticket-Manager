let addBtn = document.querySelector(".add"); //selected add button
let modal = document.querySelector(".modal");//access modal container
let mainCont = document.querySelector(".main-container")
let textarea = document.querySelector(".text-area");//access text area of modal
let addFlag = false //default value of add button

//event listner on click
addBtn.addEventListener("click", (e) => {
    //Display Modal
    //Generate Ticket
    //AddFlag - true : Modal Display
    //AddFlag - false: Modal None
    addFlag = !addFlag //toggle for add button
    if (addFlag) {
        modal.style.display = "flex";  //clicked on button diplay:set to flex

    }
    else {
        modal.style.display = "none"; //dipslay set to none
    }
})
modal.addEventListener("keydown", (e) => {
    let key = e.key;
    if (key === "Shift") {
        createTicket();
        modal.style.display = "none";
        addFlag = false;
        textarea.value = "";
    }
})
function createTicket() {
    let ticket = document.createElement("div");
    ticket.setAttribute("class", "ticket");
    ticket.innerHTML = `
    <div class="ticket-color"></div>
    <div class="ticket-id">#!232134</div>
    <div class="task">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque quit</div>`;
    mainCont.appendChild(ticket);
}