let addBtn = document.querySelector(".add"); //selected add button
let removeBtn = document.querySelector(".remove");//selected remove button
let modal = document.querySelector(".modal");//access modal container
let mainCont = document.querySelector(".main-container")
let textarea = document.querySelector(".text-area");//access text area of modal
let allPriorityColors = document.querySelectorAll(".priority-color"); //access of colors




let colors = ["one", "two", "three", "four"]; //array of colors
let modalPriorityColor = colors[colors.length - 1];//default color

//Listner for modal priority coloring
allPriorityColors.forEach((colorElem, idx) => {  //loop on all colors
    colorElem.addEventListener("click", (e) => {    //on click apply border
        allPriorityColors.forEach((priorityColorElem, idx) => { //remove default border class
            priorityColorElem.classList.remove("border");
        })
        colorElem.classList.add("border"); //apply border class

        modalPriorityColor = colorElem.classList[0]; //setting the selected color 
    })
})

let addFlag = false; //default value of add 
let removeFlag = false; //default valur of remove

let lockClass = "fa-lock";
let unlockClass = "fa-lock-open";

//event listner on click
addBtn.addEventListener("click", (e) => {
    //Display Modal
    //Generate Ticket
    //AddFlag - true : Modal Display
    //AddFlag - false: Modal None
    addFlag = !addFlag; //toggle for add button
    if (addFlag) {
        modal.style.display = "flex";  //clicked on button diplay:set to flex

    }
    else {
        modal.style.display = "none"; //dipslay set to none
    }
})
removeBtn.addEventListener("click", (e) => {
    removeFlag = !removeFlag;
})
modal.addEventListener("keydown", (e) => {
    let key = e.key;
    if (key === "Shift") {
        createTicket(modalPriorityColor, textarea.value, shortid());
        modal.style.display = "none";
        addFlag = false;
        textarea.value = "";
    }
})
function createTicket(ticketColor, ticketTask, ticketID) {
    let ticket = document.createElement("div");
    ticket.setAttribute("class", "ticket");
    ticket.innerHTML = `
    <div class="ticket-color ${ticketColor}"></div>
    <div class="ticket-id">#${ticketID}</div>
    <div class="task">${ticketTask}</div>
    <div class="lock">
    <i class="fa-solid fa-lock"></i>
    
</div>`;
    mainCont.appendChild(ticket);
    handleRemoval(ticket);
    handleLock(ticket);
    handleColor(ticket);

}
function handleRemoval(ticket) {
    //removeFlag - > true >remove
    if (removeFlag) ticket.remove();
}
function handleLock(ticket) {
    let ticketLockElem = ticket.querySelector(".lock");
    let ticketLock = ticketLockElem.children[0];
    let tickettaskArea = ticket.querySelector(".task");
    ticketLock.addEventListener("click", (e) => {
        if (ticketLock.classList.contains(lockClass)) {
            ticketLock.classList.remove(lockClass);
            ticketLock.classList.add(unlockClass);
            tickettaskArea.setAttribute("contenteditable", "true");
        }
        else {
            ticketLock.classList.remove(unlockClass);
            ticketLock.classList.add(lockClass);
            tickettaskArea.setAttribute("contenteditable", "false");

        }
    })
}
function handleColor(ticket) {
    let ticketColor = ticket.querySelector(".ticket-color");
    ticketColor.addEventListener("click", (e) => {
        let currentTicketColor = ticketColor.classList[1];
        //Get ticket color idx
        let currentTicketColoridx = colors.findIndex((color) => {
            return currentTicketColor === color;
        })
        currentTicketColoridx++;
        let newTicketColoridx = currentTicketColoridx % colors.length;
        let newTicketColor = colors[newTicketColoridx];
        ticketColor.classList.remove(currentTicketColor);
        ticketColor.classList.add(newTicketColor);
    })
}



