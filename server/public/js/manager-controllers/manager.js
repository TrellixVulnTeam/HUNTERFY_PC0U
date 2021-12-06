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

document.querySelector('#managerSearchButton').addEventListener('click', ()=>{
    const listContainer = document.querySelector('.searchOptions')

    if(listContainer.style.display = 'none'){
        listContainer.style.display = 'block'
    }
})

document.querySelector('#closeOptions').addEventListener('click', ()=>{
    const listContainer = document.querySelector('.searchOptions')

    if(listContainer.style.display = 'block'){
        listContainer.style.display = 'none'
    }
})