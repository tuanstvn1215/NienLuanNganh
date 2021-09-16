localStorage.clear()
var test2 = {
    img: 'https://upanh.cf/kuha9aoc7o.jpg',
    name: 'nước rửa tay',
    price: 5500,
    discount: 10,
}
var test3 = {
    img: 'https://upanh.cf/kuha9aoc7o.jpg',
    name: 'nước rửa chân',
    price: 6000,
    discount: 10,
}
addtoCart(test2, '1')
addtoCart(test3, '2')
addtoCart(test3, '3')
addtoCart(test3, '4')
updateCart()
function sumtotal_cart() {
    let Cartstr = localStorage.getItem('Cart')
    let Cart
    let prices = 0
    let discounts = 0
    if (!Cartstr) Cart = []
    else {
        Cart = [].concat(JSON.parse(Cartstr))
    }
    Cart.forEach((item) => {
        let price = parseInt(item.obj.price)
        let quantity = parseInt(item.quantity)
        let discount = parseInt(item.obj.discount)
        prices += price * quantity
        discounts += ((price * discount) / 100) * quantity
    })
    return { prices: prices, discounts: discounts }
}
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
    updateCart()
}
function increseCart(id) {
    let Cart = JSON.parse(localStorage.getItem('Cart'))
    Cart.forEach((item) => {
        if (item.id == id) {
            item.quantity += 1
        }
        localStorage.clear()
        localStorage.setItem('Cart', JSON.stringify(Cart))
        updateCart()
    })
}
function decreseCart(id) {
    let Cart = JSON.parse(localStorage.getItem('Cart'))
    Cart.forEach((item) => {
        if (item.id == id) {
            if (item.quantity > 0) item.quantity += -1
        }
    })
    localStorage.clear()
    localStorage.setItem('Cart', JSON.stringify(Cart))
    updateCart()
}
function removeCart(id) {
    let Cart = JSON.parse(localStorage.getItem('Cart'))
    Cart.forEach((item) => {
        if (item.id == id) {
            let pos = Cart.indexOf(item)
            Cart.splice(pos, 1)
        }
    })
    localStorage.clear()
    localStorage.setItem('Cart', JSON.stringify(Cart))
    updateCart()
}

localStorage.getItem('cart')
function updateCart() {
    let seller = document.getElementById('seller')
    let Cart = JSON.parse(localStorage.getItem('Cart'))
    seller.innerHTML = ''
    Cart.forEach((item) => {
        let price = parseInt(item.obj.price)
        let discount = parseInt(item.obj.discount)
        let quantity = parseInt(item.quantity)
        seller.innerHTML += `<div class="item-product-cart">
                                <div class="item-inner">
                                    <div class="row content-cart">
                                        <div class="product-cart-item-1">
                                            <div class="item-product-inner">
                                                <div class="item-product-img-checkbox">
                                                    <label for="" class="img-checkbox">
                                                        <input type="checkbox" class="check">
                                                    </label>
                                                </div>
                                                <div class="img-product">
                                                    <a href="#" class="intended-img">
                                                        <img src="${
                                                            item.obj.img
                                                        }"
                                                            alt="Nước Rửa Tay Lifebuoy 500g Sữa Dưỡng ẩm Giúp Chăm Sóc Và Bảo Vệ Khỏi 99.9% Vi Khuẩn Trên Tay">
                                                    </a>
                                                </div>
                                                <div class="content-product">
                                                    <a href="#" class="intended-content">
                                                        ${item.obj.name}
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="product-cart-item-2">
                                            <span class="real-price">${
                                                price - discount
                                            }</span>đ
                                            <del class="discout-price">${price}</del>đ
                                        </div>
                                        <div class="product-cart-item-3">
                                            <div class="qty">
                                                <div class="btn-qty">
                                                    <span class="qty-decrese" onclick="decreseCart('${
                                                        item.id
                                                    }')">
                                                        <i class="fas fa-minus" ></i>
                                                    </span>
                                                    <input type="tel" class="qty-input" value=${quantity}>
                                                    <span class="qty-increse" onclick="increseCart('${
                                                        item.id
                                                    }')">
                                                        <i class="fas fa-plus"></i>
                                                    </span>
                                                </div>
                                            </div>
                                            <span class="qty-limit">
                                                Chỉ còn 2 sản phẩm
                                            </span>
                                        </div>
                                        <div class="product-cart-item-4">
                                            <div class="final-price"><span class='final-price-value'>${
                                                price * quantity -
                                                ((price * discount) / 100) *
                                                    quantity
                                            }</span><span>đ</span></div>
                                        </div>
                                        <div class="product-cart-item-5">
                                            <i class="far fa-trash-alt remove" onclick="removeCart('${
                                                item.id
                                            }')"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>`
    })
    let { prices, discounts } = sumtotal_cart()
    document.getElementById('prices-value-discount').innerText = discounts + 'đ'
    document.getElementById('prices-value-before').innerText = prices + 'đ'
    document.getElementById('prices-value-final').innerText =
        prices - discounts + 'đ'
}
