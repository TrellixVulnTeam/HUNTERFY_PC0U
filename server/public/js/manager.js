var botaoLogoff = document.querySelector('#logoff')
botaoLogoff.addEventListener('click', async()=>{
    try{
        console.log('clicado')
        const logoff = await fetch('/logoff')
        //const json = await logoff.json()
        if(logoff.ok = true){
            location.reload()
        }
    }
    catch(error){
        console.log(error)
    }
})