import { getCookie } from '/js/admin/function.js'
function fileupload(event) {
    let files = Array.from(event.target.files)
    let avatar = document.getElementById('avatar')
    var img = document.getElementById('temp_img')
    let list_img = files.reduce((pre, cur) => {
        return `${pre}<img id = 'temp_img' src = "${URL.createObjectURL(
            cur
        )}" alt = "" height = "100px" >`
    }, ``)
    let img_list = document.getElementById('img_list')
    img_list.innerHTML = list_img
    console.log(list_img)
}
document.getElementById('btn-add-category').addEventListener('click', () => {
    const modal_manage = document.getElementById('modal-manage')
    modal_manage.getElementsByClassName('modal-header')[0].innerHTML = 'Thêm'
    modal_manage.getElementsByClassName('modal-body')[0].style.display = 'block'
    modal_manage.getElementsByClassName('modal-body')[0].innerHTML = `
                                <label for="">Thêm Loại Hàng Hóa</label>
                                <input type="text" class="form-control CategoryName" name="CategoryName" id="input_add_product" aria-describedby="helpId" placeholder="">
                                <br>
                                <span class="btn btn-success btn_add_product" >Thêm</span>`
    $('#modal-manage').modal('show')
    const btn_add_product =
        modal_manage.getElementsByClassName('btn_add_product')[0]
    btn_add_product.addEventListener('click', () => {
        const categoryname =
            modal_manage.getElementsByClassName('CategoryName')[0].value
        fetch('/admin/productCategory/create', {
            method: 'post',
            headers: {
                'content-type': 'application/json',
                Cookie: document.cookie,
            },
            body: JSON.stringify({ categoryname: categoryname }),
        })
            .then((response) => response.json())
            .then((data) => {
                const modal_confirm = document.getElementById('')
            })
            .catch()
    })
})

console.log(getCookie('_id'))
document.getElementById('btn-add-provider').addEventListener('click', () => {
    const exampleModalLong = $('#exampleModalLong')
})
