document.querySelector(".add-button").addEventListener('click', async(event)=>{
    event.preventDefault()
    const templateName = document.querySelector("#template-name").value
    const template = formatString(document.querySelector("#new-template").value)
    const envelopeInfo = formatString(document.querySelector("#envelope-info").value)
    const templateJson = await getJson(templateName, template, envelopeInfo)
    postTemplate(templateJson, '/savetemplate')
    alert('Success')
    
})

document.querySelector('.manage-button').addEventListener('click', async(event)=>{
    event.preventDefault()
    const rawResponse = await fetch('/gettemplates')
    const content = await rawResponse.json();
    //console.log(content)
    buildPage()
    showTemplates(content)
})

async function getJson(templateName, template, envelopeInfo){
    var jsonModelParcel = `{"templatename":"${templateName}", "template":"${template}", "envelopeinfo":"${envelopeInfo}"}`
    const parceljson = JSON.parse(jsonModelParcel)
    return parceljson
}



async function postTemplate(json, path) {
    try{
        const options = {
            method: 'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(json)
        }
        
         
        const rawResponse = await fetch(path, options)
        const content = await rawResponse.json();
        return content
        
          
    }
    catch(error){
        console.log(error)
    }
}

async function buildPage(){
    var createItem = `
           <div class="itens-container" style="margin-top:15vh;">  
               
           </div>
    `
    var sectionPrograma = document.querySelector('.program')
    sectionPrograma.innerHTML = createItem
}

function accordion(item){
    var hide = item.children[1]    
    if (hide.style.display === "block") {
        hide.style.display = "none";
    }else{
        hide.style.display = "block";
    }
}

function createItem(templateName, template){
    var itensContainer = document.querySelector('.itens-container')
    var div = document.createElement('div')
    var item = `
        <div class="template-item">
            <h2>${templateName}</h2>
            <h3>${template}</h3>
            <button onclick="deleteTemplate(this)"><i class="fas fa-trash"></i></button>
        </div>
    `
    div.innerHTML = item
    itensContainer.append(div)
}

function showTemplates(json){
    //console.log(json)
    var contentRows = json.rows
    for(var i = 0; i < contentRows.length; i++) {
        var contentIndex = contentRows[i]
        createItem(contentIndex.templatename, contentIndex.template)
    }
}

function formatString(str){
    var stringEdit = str.replace(/\\/g, '')
    var stringEdit = stringEdit.replace(/</g, '')
    var stringEdit = stringEdit.replace(/'/g, '')
    var stringEdit = stringEdit.replace(/"/g, '')
    var stringEdit = stringEdit.replace(/{/g, '')
    var stringEdit = stringEdit.replace(/}/g, '')
    var stringEdit = stringEdit.replace(/`/g, '')
    var stringEdit = stringEdit.replace(/´/g, '')
    
    var stringEdit = stringEdit.replace(/\|/g, '')
    var stringEdit = stringEdit.replace(/\t/g, '')
    var stringEdit = stringEdit.replace(/\b/g, '')
    var stringEdit = stringEdit.replace(/\f/g, '')
    var stringEdit = stringEdit.replace(/\n/g, '')
    var stringEdit = stringEdit.replace(/\r/g, '')
    
    return stringEdit
}



async function deleteTemplate(element){
    const elementName = element.parentElement.children[0].innerHTML
    const elementTemplate = element.parentElement.children[1].innerHTML
    const elementJson = await getJson(elementName, elementTemplate)
    await postTemplate(elementJson, '/deletetemplate').then(
        element.parentElement.style.backgroundColor = "rgb(151, 30, 0)"
        
    ).then(alert("Deleted"))
    

}