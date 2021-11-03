//using docx library via script tag
async function runDocx(element){
    console.log(element)
    var parcelid = element.children[0].children[0].children[1].innerHTML
    var adress = element.children[1].children[0].children[1].children[1].children[1].innerHTML
    var n1 =  element.children[1].children[0].children[2].children[0].children[1].innerHTML
    var n2 =  element.children[1].children[0].children[2].children[1].children[1].innerHTML
    var n3 =  element.children[1].children[0].children[2].children[2].children[1].innerHTML
    var n4 =  element.children[1].children[0].children[2].children[3].children[1].innerHTML
    var taxValue = element.children[1].children[0].children[0].children[1].children[1].innerHTML
    var b64GISImage = element.children[0].children[1].children[0].children[1].src
    var template = element.children[1].children[1].children[3].children[0].value
    console.log(template)

    var str = getStr(parcelid, taxValue, template)
    console.log(str)

    neighboorArr = [n1, n2, n3, n4]
    generateEnvelope(adress, parcelid)
    for (let i = 0; i < neighboorArr.length; i++) {
        neighboorIndex = neighboorArr[i]
        if(neighboorIndex.length > 1){
            generateLetter(neighboorIndex, parcelid, i, str)
        }
    }
    
}

function getStr(parcelid, taxValue, template){
    var str1 = `We’re the Jacobers and a few months ago, I acquired the property ${parcelid} next door with the intention of one day building my beautiful dream home. My wife and I  loved the area so much for its landscape, trails, peacefulness, and everything else it  has to offer. We 
    also saw in it an opportunity for a very good investment, since many other people are looking to settle here exactly for the same reasons that made us love the place  so much. 
    Unfortunately, we have changed our plans and we’re planning to put our property on the market for sale given that the land market is really hot, and we won’t have  problems finding a buyer; however, we would like to offer YOU the opportunity to buy  it before we put it online. You see, I for one care who will eventually move next to me  and that is why I consider it’s just right to offer the property to you first. 
    Besides, you might have plans to have a bigger backyard, enjoy a little more privacy, or just want to hold on to it for future appreciation. Anyways, I’m sure you’ll see in this  the same great opportunity as I once have. 
    If you are interested in buying it, please let me know as we’re planning to list this property in the upcoming weeks. We’re open to your reasonable cash offer, or even  $${taxValue} down and payments as low as $97.00/month with no credit check. 
    Please feel free to contact me through the email support@thelanddepot.com or text me a message on the phone (501) 451-4696, and I will call you back at your  convenience. 
    Best Regards, 
    Marcos Jacober.
    ` 

    var str2 = `A Few days ago, I started the process of acquiring the property (${parcelid}), which is
    directly linked to yours. I was planning to build something on it, but due to Covid, I was forced to
    change my plans.
    Since I won’t have much use for it right now, I would like to know if you would be willing to
    purchase it from me in order to you have a bigger back yard, maybe you would like to have your
    property line extended, maybe you wanna build something else, maybe you wanna have more
    privacy or just hold on to it for future appreciation. It seems it would be beneficial for both of us.
    Given the proximity of this property to yours according to the GIS website as you can also see in
    the picture below.
    (the property in blue is yours and the one in red is ours)
    When the acquisition process is done, I'll list the property in the market. My intention with this letter
    is to give you the first right of refusal.
    If you are interested in exercise your right of refusal and are planning to secure your first position,
    
    send an email or leave a message, just make sure to mention the parcel number (${parcelid}). 
    I'm willing to sell this property to you below market value, and I'll be open to any reasonable
    
    offer. I could even provide you with an Owner's finance with low down payments ($${taxValue}) and
    installments with no credit check.
    Keep in mind that I will only be able to sell it to you once my acquisition process is done, so for
    now, I just wanna check your interest in the property. Feel free to contact me through my email
    jacober.marcos76@gmail.com or call/text the number (724) 647-2269 make sure to mention the
    parcel number (${parcelid}) and I'll call at my earliest convenience.
    Best Regards,
    Marcos Jacober`

    if(template == 1){
        console.log('ummmmmmmm')
        return str1
        
    }
    if(template == 2){
        console.log('doisssssssssss')
        return str2
        
    }
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


async function generateEnvelope(adress, parcelid){
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
                                text: `MARCOS JACOBER` 
                            })
                        ]
                    }),
                    new docx.Paragraph({
                        children: [
                            new docx.TextRun({
                                text: `K-4 CALLE PETUNIA` 
                            })
                        ]
                    }),
                    new docx.Paragraph({
                        children: [
                            new docx.TextRun({
                                text: `SAN JUAN - 00927` 
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

function dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {type:mime});
}





/**/