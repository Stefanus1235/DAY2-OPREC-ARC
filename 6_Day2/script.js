
// Kelas Kalkulator yang berisi fungsi-fungsi matematik dan tombol lainnya serta penyajian operand
class Kalkulator {
    constructor(preoperandtext, currentoperandtext) {
        this.preoperandtext = preoperandtext
        this.currentoperandtext = currentoperandtext
        this.clearer()
    }       
// Fungsi tombol AC, yaitu sebagai pembersih
clearer() {
    this.preoperand = ''
    this.currentoperand = ''
    this.operator = undefined

}

// Fungsi tombol delete, menghilangkan angka terakhir
del() {
    this.currentoperand = this.currentoperand.toString().slice(0,-1)
}

// Fungsi menambahkan angka
addnumber(number) {
    if (number == '') return 
    if (number == '.' && this.currentoperand.includes('.')) return 
    this.currentoperand = this.currentoperand.toString() + number.toString()
}

// Fungsi mengeset operator matematika yang tersedia
chooseoperator(operator) {
    if (this.currentoperand == '') return
    if (this.preoperand != ''){
        this.count()
    }
    this.operator = operator
    this.preoperand = this.currentoperand + (" ").toString() + operator
    this.currentoperand = ''
}

// Fungsi menghitung operasi aritmatika
count() {
    let countresult
    let pre = parseFloat(this.preoperand)
    let current = parseFloat(this.currentoperand)
    if (isNaN(pre) || isNaN(current)) return
    switch (this.operator) {
        case '+':
            countresult = pre + current
            break 
        case '-':
            countresult = pre - current
            break 
        case '*':
            countresult = pre * current
            break 
        case '÷':
            countresult = pre / current
            break
        case '^':
            countresult = pre ** current
            break
        case '√':
            countresult = pre ** (1/current)
            break
        default: 
            return
    }
    this.currentoperand = countresult
    this.operator = undefined

}

// Fungsi tombol '=', seperti count, tapi preoperand dihapus
result() {
    this.count()
    this.preoperand = ''
}

// Fungsi untuk mengupdate tampilan operand
visualupdate() {
    this.currentoperandtext.innerText = this.currentoperand
    this.preoperandtext.innerText = this.preoperand        
}
}

// Set variabel Javascript yang menghubungkan dengan attribut data calculator.html
const numberbutton = document.querySelectorAll('[data-number]')
const operatorbutton = document.querySelectorAll('[data-operator]')
const resultbutton = document.querySelector('[data-result]')
const deletebutton = document.querySelector('[data-delete]')
const acbutton = document.querySelector('[data-clear]')
const preoperandtext = document.querySelector('[data-preoperand]')
const currentoperandtext = document.querySelector('[data-currentoperand]')

// Pengaitan variabel 'kalkulato'r dengan kelas 'Kalkulator' untuk menghasilkan kalkulator fungsional.
const kalkulator = new Kalkulator(preoperandtext, currentoperandtext)

// Untuk setiap tombol angka yang ditekan, currentoperand menambahkan angka tersebut ke bagian paling kanan
numberbutton.forEach(button => {
    button.addEventListener('click', () => {
        kalkulator.addnumber(button.innerText)
        kalkulator.visualupdate()
    })
})

// Pemilihan operator didampingi visual update.
operatorbutton.forEach(button => {
    button.addEventListener('click', () => {
        kalkulator.chooseoperator(button.innerText)
        kalkulator.visualupdate()
    })
})

// Tampilan hasil akhir dengan tombol '='
resultbutton.addEventListener('click', button => {
    kalkulator.result()
    kalkulator.visualupdate()
    preoperand = ''
})

// Penghapusan operand dengan tombol AC
acbutton.addEventListener('click', button => {
    kalkulator.clearer()
    kalkulator.visualupdate()
})

deletebutton.addEventListener('click', button => {
    kalkulator.del()
    kalkulator.visualupdate()
})