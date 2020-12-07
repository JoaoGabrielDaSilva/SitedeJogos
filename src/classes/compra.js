import Login from './login'

let index = 0
export default class Compra {
    constructor(name, price, src) {
        this.name = name
        this.price = price
        this.src = src
        this.purchaseIndex = 0
        this.total = 0
        this.valido = false
        this.desconto = 0
    }

    atualizarCarrinho(descount, controle) {

        if (typeof this.price === 'string') {
            this.price = this.price.replace('R$', '')
        }

        

        if (controle) {
            this.total = this.total - descount
        } else {
            this.price = parseInt(this.price)
            this.total += this.price
        }

        
        const sum = document.getElementById('purchase-sum')
        sum.querySelector('h1').innerText = `TOTAL: R$${this.total},00`
        this.desconto = 0
    }

    adicionarProduto() {
        this.createItem()
        this.createInfo()
        this.atribuirEventos()
        this.atualizarCarrinho()

        this.valido = false

    }

    createItem() {
        const form = document.getElementById('purchase-form')
        const item = document.createElement('div')

        //

        const remove = document.createElement('i')
        remove.setAttribute('class', 'fas fa-times')

        item.appendChild(remove)

        //
        item.setAttribute('class', 'item')
        form.appendChild(item)
    }

    removeItem(event) {
        let descount = event.path[1].getElementsByTagName('h1')[1].innerText

        descount = descount.replace('R$', '')

        descount = parseInt(descount)

        this.atualizarCarrinho(descount, true)

        event.path[1].classList.add('d-none')
        while(index < 0) {
            index--
        }
        
        
    }

    limparCarrinho() {

        const form = document.getElementsByClassName('purchase-clear')
        const itens = document.getElementsByClassName('item')

        for (let i = 0; i < form.length; i++) {
            itens[i].remove()
        }

        const sum = document.getElementById('purchase-sum')
        sum.querySelector('h1').innerText = `TOTAL: R$0,00`

        this.total = 0
        index = 0
    }

    createInfo() {

        const item = document.getElementsByClassName('item')[index]

        //Product Border
        const game = document.createElement('div')
        const image = document.createElement('img')
        image.setAttribute('class', 'imagem')
        image.setAttribute('src', `${this.src}`)
        game.setAttribute('class', 'game')
        game.appendChild(image)

        //Product Info
        const gameInfo = document.createElement('div')
        gameInfo.setAttribute('class', 'info-game')
        const name = document.createElement('h1')
        const price = document.createElement('h1')



        name.innerText = `${this.name}`
        price.innerText = `${this.price}`
        gameInfo.appendChild(name)
        gameInfo.appendChild(price)

        if (item) {
            item.appendChild(game)
            item.appendChild(gameInfo)
        } 
        index++
    }

    atribuirEventos() {

        const remove = document.getElementsByClassName('fas fa-times')

        for (let x of remove) {
            x.addEventListener('click', (event) => this.removeItem(event))
        }

        const endPurchase = document.getElementById('button-end-purchase')
        endPurchase.addEventListener('click', () => {console.log('OBRIGADO POR COMPRAR')})

        const clearCart = document.getElementById('clearCart')
        clearCart.addEventListener('click', () => this.limparCarrinho())

    }

}