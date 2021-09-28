document
    .getElementById('Account--navbar--icon')
    .addEventListener('click', () => {
        let Account_navbar = document.getElementById('Account--navbar')
        let blur_account = document.getElementById('blur_account')

        Account_navbar.classList.add('Account--navbar-active')
        blur_account.classList.remove('hidden')
    })
document
    .getElementById('close-account-navbar')
    .addEventListener('click', () => {
        let Account_navbar = document.getElementById('Account--navbar')
        let blur_account = document.getElementById('blur_account')
        Account_navbar.classList.remove('Account--navbar-active')
        blur_account.classList.add('hidden')
    })
