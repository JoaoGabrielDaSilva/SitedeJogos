import Compra from './compra'

export default class Login {
    constructor() {
        this.login = null
        this.password = null
        localStorage.setItem('login', 'admin@admin')
        localStorage.setItem('password', 1234)
        this.atribuirEventos()
        this.compra = null
    }

    slideShow() {
        let sliders  = document.querySelectorAll('#sliders li');
        let current  = 0;
        let total    = sliders.length - 1;
        window.setInterval(function(){
	        let index =  current ? current - 1 : total;
	        sliders[index].className  = '';
	        sliders[current].className  = 'slider-active';
	        current = current >= total ? 0 : current+1; 	
        }, 2000);
    }

    entrar() {

        this.login = document.getElementById('input-login').value
        this.password = document.getElementById('input-password').value

        if (this.checkEntrar(this.login, this.password)) {

            this.showFields()

            this.slideShow()

            this.compra = new Compra

        } else {
            
            const login = document.getElementById('input-login')
            const password = document.getElementById('input-password')

            document.getElementById('erro-input').classList.remove('d-none')

            this.atribuirEventos()
        }
    }

    checkEntrar(login, password) {

        let validoLogin = false
        let validoPassword = false

        const inputLogin = document.getElementById('input-login')
        const Inputpassword = document.getElementById('input-password')

        if (login && login === localStorage.getItem('login')) {

            inputLogin.style.border = '1px solid transparent'

            validoLogin = true
        } else {
            inputLogin.style.border = '1px solid red'
        }

        if (password && password === localStorage.getItem('password')) {
            Inputpassword.style.border = '1px solid transparent'
            validoPassword = true
        } else {
            Inputpassword.style.border = '1px solid red'
        }

        if (validoLogin && validoPassword) {
            return true
        } else {
            return false
        }
    }

    showFields() {

        const form = document.getElementsByClassName('container')[0]
        form.classList.add('d-none')
        form.classList.add('.login-hide')

        const navbar = document.getElementById('navbar')
        navbar.classList.remove('d-none')

        const slider = document.getElementById('sliders')
        slider.classList.remove('d-none')

        const productsPromo = document.getElementsByClassName('products-promo')[0]
        productsPromo.classList.remove('d-none')

        const FigureStarWars = document.getElementById('action-figures')
        FigureStarWars.classList.remove('d-none')

        const bookMenu = document.getElementsByClassName('book-menu')[0]
        bookMenu.classList.remove('d-none')

        const ps5 = document.getElementsByClassName('ps5-div')[0]
        ps5.classList.remove('d-none')

        const footer = document.getElementById('footer')
        footer.classList.remove('d-none')
    }

    hideFields(controle) {

        if (controle) {
            const purchase = document.getElementsByClassName('purchase')[0]
            purchase.classList.remove('d-none')
        }

        const form = document.getElementsByClassName('container')[0]
        form.classList.add('d-none')
        form.classList.add('.login-hide')

        const navbar = document.getElementById('navbar')
        navbar.classList.add('d-none')

        const slider = document.getElementById('sliders')
        slider.classList.add('d-none')

        const productsPromo = document.getElementsByClassName('products-promo')[0]
        productsPromo.classList.add('d-none')

        const FigureStarWars = document.getElementById('action-figures')
        FigureStarWars.classList.add('d-none')

        const bookMenu = document.getElementsByClassName('book-menu')[0]
        bookMenu.classList.add('d-none')

        const ps5 = document.getElementsByClassName('ps5-div')[0]
        ps5.classList.add('d-none')

        const footer = document.getElementById('footer')
        footer.classList.add('d-none')
    }

    purchaseScreen(event, ps5) {

        const purchase = document.getElementsByClassName('purchase')[0]
        purchase.classList.remove('d-none')
        

        this.hideFields()

        const item = event.path[2]

        

        if (ps5 === true) {
            const ps5 = document.getElementsByClassName('ps5-div')[0]

            this.compra.name = ps5.getAttribute('data-name')
            this.compra.price = ps5.getAttribute('data-price')
            this.compra.src = ps5.getAttribute('data-source')

            this.compra.adicionarProduto() 
        } else {
            const name = item.getAttribute('data-name')
            const price = item.getAttribute('data-price')
            const src = item.getAttribute('data-source')
        
            this.compra.name = name
            this.compra.price = price
            this.compra.src = src
            this.compra.adicionarProduto() 
        }
    }

    atribuirEventos() {
        const botaoLogin = document.getElementById('input-button')
        botaoLogin.addEventListener('click', (event) => this.entrar(event))

        for (let button of document.getElementsByClassName('purchase-button')) {
            button.addEventListener('click', (event) => {
                this.purchaseScreen(event)
            })
        }

        const arrowBack = document.getElementsByClassName('fa-arrow-left')[0]

        arrowBack.addEventListener('click', (event) => {
            this.showFields()
        })

        const cart = document.getElementById('cart-icon')
        cart.addEventListener('click', (event) => this.hideFields(event, true))

        const ps5 = document.getElementById('buy-ps5')
        ps5.addEventListener('click', (event) => this.purchaseScreen(event, true))
    }

}