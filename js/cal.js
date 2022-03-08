class Calculator{
    constructor(previousOperandTextElement,currentOperandTextElement){
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
    }

    clear(){
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = ''
    }

    delete(){
       this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

    appendNumber(number){
        if(number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()

    }

    chooseOperation(operation){
        if(this.currentOperand === '') return
        if(this.previousOperand !== ''){
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }

    compute(){
        let computation
        const prev = parseFloat(this.previousOperand)
        const curr = parseFloat(this.currentOperand)
        if(isNaN(prev) || isNaN(curr)) return
        switch(this.operation)
        {
            case '+':
                computation = prev + curr
                break

            case '-':
                computation = prev - curr
                break
            
            case '*':
                computation = prev * curr
                break
            
            case '÷':
                computation = prev / curr
                break
            
            default:
                return
            
        }
        this.currentOperand = computation
        this.operation = ''
        this.previousOperand = ''
    }

    getDisplayNumber(number){
        const floatNumber = parseFloat(number)
        if(isNaN(floatNumber)) return ''
        return floatNumber.toLocaleString('en')
    }


    updateDisplay(){
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand)
        if(this.operation !== null){
            this.previousOperandTextElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        }      
    }
}





const num = document.querySelectorAll('[data-number]')
const op = document.querySelectorAll('[data-operation]')
const del = document.querySelector('[data-delete]')
const allclear = document.querySelector('[data-all-clear]')
const equalsButton = document.querySelector('[data-equals]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

const calculator = new Calculator(previousOperandTextElement,currentOperandTextElement)



num.forEach(button =>{
    button.addEventListener('click', () =>{
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})


op.forEach(button =>{
    button.addEventListener('click', () =>{
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

allclear.addEventListener('click', button =>{
    calculator.clear()
    calculator.updateDisplay()
})

equalsButton.addEventListener('click', button =>{
    calculator.compute()
    calculator.updateDisplay()
})

del.addEventListener('click', button =>{
    calculator.delete()
    calculator.updateDisplay()
})
