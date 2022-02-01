//using docx library via script tag
async function runDocx(parcelid, adress, n1adr, n1name, n2adr, n2name){
    var parcelid = element.children[0].children[0].children[1].innerHTML
    var adress = element.children[1].children[0].children[1].children[1].children[1].innerHTML

    var n1adr =  element.children[1].children[0].children[2].children[0].children[1].innerHTML
    var n1name =  element.children[1].children[0].children[2].children[0].children[2].innerHTML
    var n1 = [n1adr, n1name]

    var n2adr =  element.children[1].children[0].children[2].children[1].children[1].innerHTML
    var n2name =  element.children[1].children[0].children[2].children[1].children[2].innerHTML
    var n2 = [n2adr, n2name]

    var n3adr =  element.children[1].children[0].children[2].children[2].children[1].innerHTML
    var n3name =  element.children[1].children[0].children[2].children[2].children[2].innerHTML
    var n3 = [n3adr, n3name]

    var n4adr =  element.children[1].children[0].children[2].children[3].children[1].innerHTML
    var n4name =  element.children[1].children[0].children[2].children[3].children[2].innerHTML
    var n4 = [n4adr, n4name]

    var taxValue = element.children[1].children[0].children[0].children[1].children[1].innerHTML
    var template = element.children[1].children[1].children[3].children[2].children[1].value
    
    const neighboorArr = [n1, n2, n3, n4]
    
    var info = await getTemp(template)

    generateEnvelope(adress, parcelid, info[1])
    for (let i = 0; i < neighboorArr.length; i++) {
        neighboorIndex = neighboorArr[i]
        
        var neighboorName = neighboorIndex[0]
        var neighboorAddr = neighboorIndex[1]

        var editedStr = await editStr(info[0], parcelid, taxValue, neighboorName, neighboorAddr)
        console.log(editedStr)

        if(neighboorIndex[0].length > 1){
           generateLetter(parcelid, i, editedStr)
        }
    }

    await letterLog(template, parcelid)


}

async function letterLog(template, parcel){

    var infoString = `
    {
        "parcelid":"${parcel}",
        "template":"${template}"
    }
    `
    const json = JSON.parse(infoString)
    console.log(json)
    await postDataManager(json, '/saveletterlog')
}

async function runDocxAll(element){
    var parcelid = element.children[0].children[0].children[1].innerHTML
    var adress = element.children[1].children[0].children[1].children[1].children[1].innerHTML

    var n1adr =  element.children[1].children[0].children[2].children[0].children[1].innerHTML
    var n1name =  element.children[1].children[0].children[2].children[0].children[2].innerHTML
    var n1 = [n1adr, n1name]

    var n2adr =  element.children[1].children[0].children[2].children[1].children[1].innerHTML
    var n2name =  element.children[1].children[0].children[2].children[1].children[2].innerHTML
    var n2 = [n2adr, n2name]

    var n3adr =  element.children[1].children[0].children[2].children[2].children[1].innerHTML
    var n3name =  element.children[1].children[0].children[2].children[2].children[2].innerHTML
    var n3 = [n3adr, n3name]

    var n4adr =  element.children[1].children[0].children[2].children[3].children[1].innerHTML
    var n4name =  element.children[1].children[0].children[2].children[3].children[2].innerHTML
    var n4 = [n4adr, n4name]

    var taxValue = element.children[1].children[0].children[0].children[1].children[1].innerHTML
    var template = document.querySelector('#templateforall').value
    
    const neighboorArr = [n1, n2, n3, n4]
    
    var info = await getTemp(template)

    generateEnvelope(adress, parcelid, info[1])
    for (let i = 0; i < neighboorArr.length; i++) {
        neighboorIndex = neighboorArr[i]
        
        var neighboorName = neighboorIndex[0]
        var neighboorAddr = neighboorIndex[1]

        var editedStr = await editStr(info[0], parcelid, taxValue, neighboorName, neighboorAddr)
        console.log(editedStr)

        if(neighboorIndex[0].length > 1){
           generateLetter(parcelid, i, editedStr)
        }
    }

}
                                                                                                                                                    

async function getTemp(template){
    var str = ''
    const rawResponse = await fetch('/gettemplates')
    const content = await rawResponse.json();
    for (let i = 0; i < content.rows.length; i++) {
        var contentIndex = content.rows[i]
        if(template == contentIndex.templatename){
            var str = contentIndex.template
            var envelope = contentIndex.envelopeinfo
        }
    }
    return [str, envelope]
}

async function editStr(str, parcelid, taxValue, neighboorName, neighboorAddr){
    var stringEdit = str.replace(/PARAM-PARCELID/g, parcelid)
    var stringEdit = stringEdit.replace(/PARAM-NAME/g, neighboorName)
    var stringEdit = stringEdit.replace(/PARAM-ADDRESS/g, neighboorAddr)
    var stringEdit = stringEdit.replace(/PARAM-TAXVALUE/g, taxValue)
    return stringEdit
}

async function generateLetter(parcelid, index, str){
    //let img = new Image()
    //img.src = image

    const doc = new docx.Document({
        sections: [
            {
                children: [
                    new docx.Paragraph({
                        children: [
                            new docx.TextRun({
                                text: str
                            })
                        ]
                    }),
                ],
            },
        ],
    })

    
    createDocument(doc, docx, parcelid, index, 'letter')
}


async function generateEnvelope(adress, parcelid, envelopeinfo){
    const doc = new docx.Document({
        sections: [
            {
                properties: {
                    page: {
                        size: {
                            orientation: docx.PageOrientation.PORTRAIT,
                            height: docx.convertMillimetersToTwip(198,25),
                            width: docx.convertMillimetersToTwip(456.25),
                        },
                    },
                },
                children: [
                    new docx.Paragraph({
                        children: [
                            new docx.TextRun({
                                text: `${envelopeinfo}` 
                            })
                        ]
                    }),
                    new docx.Paragraph({
                        children: [
                            new docx.TextRun({
                                text: `\n\n\n\n${adress}` 
                            })
                        ]
                    }),   
                ]
            },
        ],
    })
    
    createDocument(doc, docx, parcelid, '1', 'envelope')
}

async function createDocument(doc, docx, parcelid, index, type){
    docx.Packer.toBlob(doc).then( blob => {
        saveAs(blob, `${parcelid}-${type}-${index}.docx`)
    })
}







/**/