let addBtn = document.querySelector(".add"); //selected add button
let removeBtn = document.querySelector(".remove");//selected remove button
let modal = document.querySelector(".modal");//access modal container
let mainCont = document.querySelector(".main-container")
let textarea = document.querySelector(".text-area");//access text area of modal
let allPriorityColors = document.querySelectorAll(".priority-color"); //access of colors
let toolBoxColors = document.querySelectorAll(".color"); //access all toolbox color




let colors = ["one", "two", "three", "four"]; //array of colors
let modalPriorityColor = colors[colors.length - 1];//default color

let addFlag = false; //default value of add 
let removeFlag = false; //default valur of remove

let lockClass = "fa-lock";
let unlockClass = "fa-lock-open";

let ticketsArr = []; //array of all the tickets

if(localStorage.getItem("tickets")){
    //retrieve and display tickets
    ticketsArr = JSON.parse(localStorage.getItem("tickets"));
    ticketsArr.forEach((ticketObj)=>{
        createTicket(ticketObj.ticketColor,ticketObj.ticketTask,ticketObj.ticketID);
    })
}

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
    if (removeFlag == true){
        removeBtn.classList.add("highlighter");
    }
    else{
        removeBtn.classList.remove("highlighter");
    }
})
modal.addEventListener("keydown", (e) => {
    let key = e.key;
    if (key === "Shift") {
        createTicket(modalPriorityColor, textarea.value);
        addFlag = false;
        setModalToDefault();
    }
})
function createTicket(ticketColor, ticketTask, ticketID) {
    let id = ticketID || shortid();
    let ticket = document.createElement("div");
    ticket.setAttribute("class", "ticket");
    ticket.innerHTML = `
    <div class="ticket-color ${ticketColor}"></div>
    <div class="ticket-id">#${id}</div>
    <div class="task">${ticketTask}</div>
    <div class="lock">
    <i class="fa-solid fa-lock"></i>
    
</div>`;
    mainCont.appendChild(ticket);

    //create object of ticket and add to array
    if (!ticketID) {
        ticketsArr.push({ ticketColor, ticketTask, ticketID: id });
        localStorage.setItem("tickets",JSON.stringify(ticketsArr));
    }
    handleRemoval(ticket,id);
    handleLock(ticket,id);
    handleColor(ticket,id);

}
function handleRemoval(ticket,id) {
    //removeFlag - > true >remove
   ticket.addEventListener("click",(e)=>{
    if(!removeFlag) return;
    let ticketIdx = getTicketIdx(id);
    ticketsArr.splice(ticketIdx,1);
    let strTicketsArr = JSON.stringify(ticketsArr);
    localStorage.setItem("tickets",strTicketsArr);
    ticket.remove() //UI REMOVAL
   })
}
function handleLock(ticket,id) {
    let ticketLockElem = ticket.querySelector(".lock");
    let ticketLock = ticketLockElem.children[0];
    let tickettaskArea = ticket.querySelector(".task");
    ticketLock.addEventListener("click", (e) => {
        let ticketIdx = getTicketIdx(id);
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
        //modify in local storage
        ticketsArr[ticketIdx].ticketTask=tickettaskArea.innerText;
        localStorage.setItem("tickets",JSON.stringify(ticketsArr));
    })
}
function handleColor(ticket,id) {
    //access ticket color
    //add event listner
    //check color idx n color array
    //on every click increases idx
    let ticketColor = ticket.querySelector(".ticket-color");
    ticketColor.addEventListener("click", (e) => {
        //get ticketIdx from tickets array
        let ticketIdx = getTicketIdx(id);
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
        //modify data in local storage
        ticketsArr[ticketIdx].ticketColor=newTicketColor;
        localStorage.setItem("tickets",JSON.stringify(ticketsArr));
    })
}

for (let i = 0; i < toolBoxColors.length; i++) {
    toolBoxColors[i].addEventListener("click", (e) => {
        let currentToolBoxColor = toolBoxColors[i].classList[0];
        let filteredTickets = ticketsArr.filter((ticketObj, idx) => {
            return currentToolBoxColor === ticketObj.ticketColor;
        })
        let allTicketsCont = document.querySelectorAll(".ticket");
        for (let i = 0; i < allTicketsCont.length; i++) {
            allTicketsCont[i].remove();
        }
        //display new filtered tickets;
        filteredTickets.forEach((ticketObj, idx) => {
            createTicket(ticketObj.ticketColor, ticketObj.ticketTask, ticketObj.ticketID);
        })

    })
    toolBoxColors[i].addEventListener("dblclick", (e) => {
        //remove previous tickets
        let allTicketsCont = document.querySelectorAll(".ticket");
        for (let i = 0; i < allTicketsCont.length; i++) {
            allTicketsCont[i].remove();
        }
        //display all tickets
        ticketsArr.forEach((ticketObj, idx) => {
            createTicket(ticketObj.ticketColor, ticketObj.ticketTask, ticketObj.ticketID);
        })
    })
}
function setModalToDefault() {
    modal.style.display = "none";
    textarea.value = "";
    modalPriorityColor = colors[colors.length - 1];//default color
    allPriorityColors.forEach((priorityColorElem, idx) => { //remove default border class
        priorityColorElem.classList.remove("border");
    })
    allPriorityColors[allPriorityColors.length - 1].classList.add("border");
}

function getTicketIdx(id){
    let ticketIdx = ticketsArr.findIndex((ticketObj)=>{
        return ticketObj.ticketID===id;
    })
    return ticketIdx;
}
