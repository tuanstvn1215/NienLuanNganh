let product_img_item = document.getElementsByClassName('product-img-item')
for (let index = 0; index < product_img_item.length; index++) {
    const element = product_img_item[index]
    element.addEventListener('mouseenter', (e) => {
        console.log(e.target.src)
        document.getElementById('product-img').src = e.target.src
    })
}
