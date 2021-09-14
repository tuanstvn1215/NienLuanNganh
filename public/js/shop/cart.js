updateCart()
function sumtotal_cart() {
    let final_price = document.getElementsByClassName('final-price')
    let prices = Array.from(final_price, (final_price) =>
        parseFloat(final_price.textContent.replace('.', ''))
    )
    console.log(prices)
}
sumtotal_cart()
let qty_decrese = document.getElementsByClassName('qty-decrese')
let qty_increse = document.getElementsByClassName('qty-increse')
for (let index = 0; index < qty_decrese.length; index++) {
    const element = qty_decrese[index]
    element.addEventListener('click', () => {
        sumtotal_cart()
    })
}
for (let index = 0; index < qty_increse.length; index++) {
    const element = qty_increse[index]
    element.addEventListener('click', () => {
        sumtotal_cart()
    })
}

let objtest = {
    img: 'https://upanh.cf/kuha9aoc7o.jpg',
    name: 'nước rửa tay',
    price: 5500,
    discount: 10,
}
function addtoCart(obj, id) {
    let Cartstr = localStorage.getItem('Cart')
    let Cart
    if (!Cartstr) Cart = []
    else {
        Cart = [].concat(JSON.parse(Cartstr))
    }
    let flag = false
    for (let index = 0; index < Cart.length; index++) {
        const element = Cart[index]
        if (element.id == id) {
            flag = true
            element.quantity += 1
        }
    }
    if (!flag) {
        Cart.push({ id: id, obj: obj, quantity: 1 })
    }
    localStorage.clear()
    localStorage.setItem('Cart', JSON.stringify(Cart))
}

localStorage.getItem('cart')
