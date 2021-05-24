$(()=>{
    $('#register').click(()=>{
        const name=$('#name').val()
        const email=$('#email').val()
        const organization=$('organization').val()
        const dob=$('dob').val()
        const password=$('password').val()
        const consfirmPassword=$('#confirm_password').val()
        console.log(name)
    })
})



// const registerButton=document.getElementById('register')
// const submitForm=()=>{
//     const name=document.getElementById('name').value
//     const email=document.getElementById('email').value
//     const organization=document.getElementById('organization').value
//     const dob=document.getElementById('dob').value
//     const password=document
// }

// registerButton.addEventListener('click',submitForm)