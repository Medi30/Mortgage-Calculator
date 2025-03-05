
let repayCheck = document.querySelector("#repayCheck")
let interestCheck = document.querySelector("#interestCheck")
let checkError = document.querySelector("#checkError")
let calcBtn = document.querySelector("#calcbtn")
let clearBtn = document.querySelector("#clearall")
let defRightCont = document.querySelector("#defRightCont")
let resultRightCont = document.querySelector("#resultRightCont")
let repay = document.querySelector("#repay")
let totalRepay = document.querySelector("#totalrepay")
let interestText = document.querySelector("#interestText")
let termDiv = document.querySelector("#termInput")
let mortgageP = document.querySelector("#mortgageP")
let errors = {
    amount: document.querySelector("#amountError"),
    term: document.querySelector("#termError"),
    rate: document.querySelector("#rateError")
}

amount.addEventListener("paste", paste)
amount.addEventListener("keydown", keydown)
amount.addEventListener("click", highlight)
term.addEventListener("paste", paste)
term.addEventListener("keydown", keydown)
term.addEventListener("click", highlight)
rate.addEventListener("paste", paste)
rate.addEventListener("keydown", keydown)
rate.addEventListener("click", highlight)
repayCheck.addEventListener("click", checkbox)
interestCheck.addEventListener("click", checkbox)
calcBtn.addEventListener("click", calculate)
clearBtn.addEventListener("click", clear)


let prevHighlight = null
let prevemblem = null

forMobileRearange()
window.addEventListener("resize", resize);
let mode = window.innerWidth <= 550 ? "phone" : "desktop"; // Set initial mode

function resize() {
    if (window.innerWidth <= 550 && mode !== "phone") {
        console.log("Switched to mobile mode");
        termDiv.insertAdjacentElement("afterend", interestText);
        termDiv.insertAdjacentElement("afterend", errors.term);
        mode = "phone";
    } else if (window.innerWidth > 450 && mode !== "desktop") {
        console.log("Switched to desktop mode");
        mortgageP.insertAdjacentElement("beforeend",interestText)
        errors.rate.insertAdjacentElement("beforebegin",errors.term)
        // Move elements back if necessary
        mode = "desktop";
    }
}

function forMobileRearange(){
    if (window.innerWidth <= 550){
        termDiv.insertAdjacentElement("afterend",interestText)
        termDiv.insertAdjacentElement("afterend",errors.term)
    }else{
        return
    }
        
}

//Input Fields Highlight
function highlight(event){
    if (this.id === "amount"){
        this.parentNode.children[0].classList.add("selectcolor", "selectborder")
        this.classList.add("selectborder")
        }else{
        this.parentNode.children[1].classList.add("selectcolor", "selectborder")
        this.classList.add("selectborder")
        }
    if (prevHighlight && prevHighlight != this){
            prevHighlight.classList.remove("selectborder")
            prevemblem.classList.remove("selectcolor","selectborder")
            if (this.id === "amount"){
                prevHighlight = this
                prevemblem = this.parentNode.children[0]
            }else{
                prevHighlight = this
                prevemblem = this.parentNode.children[1]
            }
    }else{
            prevHighlight = this
            if (this.id === "amount"){
                prevemblem = this.parentNode.children[0]
            }else{
                prevemblem = this.parentNode.children[1]
            }
    }   
}

//Checkboxes Highlight
let selected = null

function checkbox(event){
    this.parentNode.parentNode.classList.add("checkboxdivSelect")
    if (selected && selected != this){
        selected.parentNode.parentNode.classList.remove("checkboxdivSelect")
        selected = this
    }else{
        selected = this
    }
    
}

function hover(event){
    if (event.target.children[0]?.type){
        event.target.parentNode.classList.add("checkbox_h")
    }
    if (event.target.id === "amount"){
        event.target.parentNode.classList.add("input_h")

    }else if (event.target.id === "term" || event.target.id === "rate"){
        event.target.parentNode.classList.add("input_h")
    }

}

function hoveroff(event){
    if (event.target.children[0]?.type){
        event.target.parentNode.classList.remove("checkbox_h")

    }
    if (event.target.id === "amount"){
        event.target.parentNode.classList.remove("input_h")

    }else if (event.target.id === "term" || event.target.id === "rate"){
        event.target.parentNode.classList.remove("input_h")
    }

}

//Only numbers in input
function keydown(event){
    if (event.ctrlKey && event.key === "v"){
        return;

    }
    if (!/^[0-9]$/.test(event.key) && event.key !== "Backspace"){
        if (this.id === "rate" && event.key === "."){
            return
        }
        event.preventDefault()
    }
}
//Paste only numbers
function paste(event){
    let paste = event.clipboardData.getData("text")
    if (!/^[0-9]+$/.test(paste)){
        event.preventDefault()
    }else{
        return
    }
}
//Clear all fields
function clear(){
    defRightCont.classList.remove("hide")
    resultRightCont.classList.add("hide")
    fields.amount.value = ""
    fields.term.value = ""
    fields.rate.value = ""
    if (prevHighlight){
        prevHighlight.classList.remove("selectborder")
        prevemblem.classList.remove("selectcolor", "selectborder")
        prevHighlight = null
        prevemblem = null
    }
    for (key in errors){
        if (key != "term"){
            errors[key].classList.add("hide")
        }else{
            errors[key].classList.add("vishide")
        }
    }
    for (key in fields){
        fields[key].classList.remove("errorborder")
        if (fields[key].id != "amount"){
            fields[key].nextElementSibling.classList.remove("errorcolor", "errorborder","input-group-text-error")
        }else{
            fields[key].previousElementSibling.classList.remove("errorcolor", "errorborder","input-group-text-error")
        }
    }

    if (selected != null){
        selected.parentNode.parentNode.classList.remove("checkboxdivSelect")
        selected.checked = false
        selected = null
    }else{
        checkError.classList.add("hide")
        errorField.check = null
    }

}

//On Calculation Pressed

let fields = {
    amount : document.querySelector("#amount"),
    term: document.querySelector("#term"),
    rate: document.querySelector("#rate"),
}

let errorField = {
    amount: null,
    term: null,
    rate: null,
    check: null
}

function calculate(){
    if (prevHighlight){
        prevHighlight.classList.remove("selectborder")
        prevemblem.classList.remove("selectcolor", "selectborder")
        prevHighlight = null
        prevemblem = null
    }
//Checkbox check
    if(errorField.check){
        checkError.classList.add("hide")
    }
    if (selected === null){
        checkError.classList.remove("hide")
        errorField.check = true
    }


//Field check
    for (key in fields){
        if (fields[key].value === ""){
            errorHandle(key,fields[key])
            errorField[key] = true
        }else{
            if (errorField[key]){
                errorField[key] = null
                if (fields[key].id != "amount"){
                    fields[key].nextElementSibling.classList.remove("errorcolor", "errorborder", "input-group-text-error")
                }else{
                    fields[key].previousElementSibling.classList.remove("errorcolor", "errorborder", "input-group-text-error")
                }
                fields[key].classList.remove("errorborder")
                if (key != "term"){
                    errors[key].classList.add("hide")
                }else{
                    errors[key].classList.add("vishide")
                }
            }
        }
    }
    if (fields.amount.value && fields.term.value && fields.rate.value && selected){
        calculation()
    }
}



//Missing field error
function errorHandle(key,reference){
    if (reference.id != "amount"){
        reference.nextElementSibling.classList.add("errorcolor", "errorborder", "input-group-text-error")
    }else{
        reference.previousElementSibling.classList.add("errorcolor", "errorborder", "input-group-text-error")
    }
    reference.classList.add("errorborder")
    for (key2 in errors){
        if (key === key2){
            if (key2 != "term"){
            errors[key2].classList.remove("hide")
            }else{
            errors[key2].classList.remove("vishide")
            }
        }
    }
}

function calculation(){
    let total = fields.amount.value
    let years = fields.term.value
    let rate = fields.rate.value

    let monthlyRate = rate/100/12
    let totalPayments = years *12
    let monthlyPayment = ((total * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -totalPayments))).toFixed(2);
    let montlystr = monthlyPayment.toString()
    let montlyPaymentComma = Number(monthlyPayment).toLocaleString("en-us")

    repay.textContent = montlyPaymentComma
    
    let totalAmount = ((monthlyPayment * years * 12)).toFixed(2)
    let totalstr = totalAmount.toString()

    let totalSumComma =  Number(totalAmount).toLocaleString('en-us')

    repay.textContent = "$" + montlyPaymentComma
    totalRepay.textContent = "$" + totalSumComma


    if (selected.id === "interestCheck"){
        defRightCont.classList.add("hide")
        resultRightCont.classList.remove("hide")
        document.querySelector("#monthlyRepayCont").classList.add("hide")
    }else{
        defRightCont.classList.add("hide")
        resultRightCont.classList.remove("hide")
        document.querySelector("#monthlyRepayCont").classList.remove("hide")
    }
   
}