function accordion(element){
    
    if(element.parentElement.children[1].style.display == "none"){
        element.parentElement.children[1].style.display = "block"
    }
    else {
        element.parentElement.children[1].style.display = "none"
    }
}

function convertToBase64(element) {
    
    //Read File
    var selectedFile = element.files;
    //Check File is not Empty
    if (selectedFile.length > 0) {
        // Select the very first file from list
        var fileToLoad = selectedFile[0];
        // FileReader function for read the file.
        var fileReader = new FileReader();
        var base64;
        // Onload of file read the file content
        fileReader.onload = function(fileLoadedEvent) {
            base64 = fileLoadedEvent.target.result;
            // Print data in console
            element.src = `${base64}`
        };
        // Convert data to base64
        fileReader.readAsDataURL(fileToLoad);
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
    var stringEdit = stringEdit.replace(/;/g, '')
    var stringEdit = stringEdit.replace(/:/g, '')
    var stringEdit = stringEdit.replace(/\|/g, '')
    var stringEdit = stringEdit.replace(/\t/g, '')
    var stringEdit = stringEdit.replace(/\b/g, '')
    var stringEdit = stringEdit.replace(/\f/g, '')
    var stringEdit = stringEdit.replace(/\n/g, '')
    var stringEdit = stringEdit.replace(/\r/g, '')
    var stringEdit = stringEdit.replace(/./g, '')
    var stringEdit = stringEdit.replace(/-/g, '')

    
    return stringEdit
}