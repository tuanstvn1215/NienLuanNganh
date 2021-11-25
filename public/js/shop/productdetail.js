let product_img_item = document.getElementsByClassName('product-img-item')
for (let index = 0; index < product_img_item.length; index++) {
    const element = product_img_item[index]
    element.addEventListener('mouseenter', (e) => {
        console.log(e.target.src)
        document.getElementById('product-img').src = e.target.src
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
    localStorage.removeItem('Cart')
    localStorage.setItem('Cart', JSON.stringify(Cart))
}
document.getElementById('buynow_btn').addEventListener('click', () => {
    product_addtocart()
    setTimeout(() => {
        window.location.replace(`/cart`)
    }, 2000)
})
document.getElementById('addtocart_btn').addEventListener('click', () => {
    product_addtocart()
})

async function product_addtocart() {
    let product_id = document.getElementById('product_id').value
    console.log(document.getElementById('product_id').value)
    fetch(`/product/findOne?id=${product_id}`, {
        method: 'get',
        headers: {
            'content-type': 'application/json',
            Cookie: document.cookie,
        },
    })
        .then((response) => response.json())
        .then((data) => {
            addtoCart(
                {
                    img: data.img[0],
                    name: data.name,
                    price: data.price,
                    discount: 0,
                },
                product_id
            )
            const modal_manage = document.getElementById('modal-manage')
            modal_manage.getElementsByClassName('modal-header')[0].innerHTML =
                'Thông báo'
            modal_manage.getElementsByClassName('modal-body')[0].style.display =
                'block'
            modal_manage.getElementsByClassName(
                'modal-body'
            )[0].innerHTML = `<div>Thêm thành công vào giỏ hàng</div>`
            modal_manage.getElementsByClassName(
                'modal-footer'
            )[0].innerHTML = `                                      
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Đóng</button>`
            $('#modal-manage').modal('show')
        })
}
let product = {}
window.onload = function () {
    let stars = document.getElementsByName('rate')

    for (let index = 0; index < stars.length; index++) {
        const element = stars[index]
        element.addEventListener('click', (e) => {
            let star_Value = e.target.value
            let product_id = document.getElementById('product_id').value
            // document.getElementById(
            //     'result-rate'
            // ).innerText = `Bạn vừa đánh giá ${star_Value} sao cho sản phẩm`

            fetch(
                `/product/rate?product_id=${product_id}&stars=${star_Value}`,
                {
                    method: 'post',
                    headers: {
                        'content-type': 'application/json',
                        Cookie: document.cookie,
                    },
                }
            )
                .then((response) => response.json())
                .then((data) => {
                    const modal_manage = document.getElementById('modal-manage')
                    modal_manage.getElementsByClassName(
                        'modal-header'
                    )[0].innerHTML = 'Thông báo'
                    modal_manage.getElementsByClassName(
                        'modal-body'
                    )[0].style.display = 'block'
                    modal_manage.getElementsByClassName(
                        'modal-body'
                    )[0].innerHTML = `<div>${data.message}</div>`
                    modal_manage.getElementsByClassName(
                        'modal-footer'
                    )[0].innerHTML = `                                      
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Đóng</button>`
                    $('#modal-manage').modal('show')
                })
        })
    }
}
document.getElementById('btn-send-msg').addEventListener('click', () => {
    let product_id = document.getElementById('product_id').value
    let message = document.getElementById('txtreview').value
    fetch(`/product/comment`, {
        method: 'post',
        headers: {
            'content-type': 'application/json',
            Cookie: document.cookie,
        },
        body: JSON.stringify({ product: product_id, message: message }),
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.code == 403) {
                const modal_manage = document.getElementById('modal-manage')
                modal_manage.getElementsByClassName(
                    'modal-header'
                )[0].innerHTML = 'Thông báo'
                modal_manage.getElementsByClassName(
                    'modal-body'
                )[0].style.display = 'block'
                modal_manage.getElementsByClassName(
                    'modal-body'
                )[0].innerHTML = `<div>Vui lòng đăng nhập</div>`
                modal_manage.getElementsByClassName(
                    'modal-footer'
                )[0].innerHTML = `                                      
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Đóng</button>`
                $('#modal-manage').modal('show')
            }
            if (data.code == 200) {
                window.location.replace('/product/show?id=' + product_id)
            }
        })
})
