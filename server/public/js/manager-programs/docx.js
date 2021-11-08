//using docx library via script tag
async function runDocx(element){
    var parcelid = element.children[0].children[0].children[1].innerHTML
    var adress = element.children[1].children[0].children[1].children[1].children[1].innerHTML
    var n1 =  element.children[1].children[0].children[2].children[0].children[1].innerHTML
    var n2 =  element.children[1].children[0].children[2].children[1].children[1].innerHTML
    var n3 =  element.children[1].children[0].children[2].children[2].children[1].innerHTML
    var n4 =  element.children[1].children[0].children[2].children[3].children[1].innerHTML
    var taxValue = element.children[1].children[0].children[0].children[1].children[1].innerHTML
    //var b64GISImage = element.children[0].children[1].children[0].children[1].src
    var template = element.children[1].children[1].children[3].children[1].value

    const info = await getStr(template, parcelid, taxValue)
    

    neighboorArr = [n1, n2, n3, n4]
    generateEnvelope(adress, parcelid, info[1])
    for (let i = 0; i < neighboorArr.length; i++) {
        neighboorIndex = neighboorArr[i]
        if(neighboorIndex.length > 1){
           generateLetter(neighboorIndex, parcelid, i, info[0])
        }
    }
    
}

async function getStr(template, parcelid, taxValue){
    var str = ''
    const rawResponse = await fetch('/gettemplates')
    const content = await rawResponse.json();
    for (let i = 0; i < content.rows.length; i++) {
        var contentIndex = content.rows[i]
        if(template == contentIndex.templatename){
            str = contentIndex.template
            var envelope = contentIndex.envelopeinfo
        }
    }

    var stringEdit = str.replace(/PARAM-PARCELID/g, parcelid)
    var stringEdit = stringEdit.replace(/PARAM-TAXVALUE/g, taxValue)
    return [stringEdit, envelope]
}

async function generateLetter(adress, parcelid, index, str){
    //let img = new Image()
    //img.src = image

    const doc = new docx.Document({
        sections: [
            {
                children: [
                    new docx.Paragraph({
                        children: [
                            new docx.TextRun({
                                text: `Dear,` 
                            })
                        ]
                    }),
                    new docx.Paragraph({
                        children: [
                            new docx.TextRun({
                                text: `Located at ${adress}` 
                            })
                        ]
                    }),
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