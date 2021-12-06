document.querySelector('#insert-parcels').addEventListener('click', async(event)=>{
    event.preventDefault()
    const textAreaCont = document.querySelector('#parcelsList')
    const str = textAreaCont.value
    const arr = str.split('\n')
    var lista = []
    for (let i = 0; i < arr.length; i++) {
        var index = arr[i]
        var item = getList(index, 'gvmolin')
        lista.push(item)
    }
    
    
    console.log(lista)
    postDataManager(lista, '/newlist').then(alert('Success'))
})

function getList(parcel, user){
    const str = `
        {
            "parcel":"${parcel}",
            "user":"${user}"
        }
    `
    const json = JSON.parse(str)
    //console.log(json)
    return json
}