
var currCaseId = -1;

function getCases(){
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4){
            var jsonArray = JSON.parse(xhr.responseText);
            // console.log(jsonArray);
        }
    };
    xhr.open("POST", "./GetCases");
    xhr.send();
}


function switchToCase(){
    let element = document.getElementById("listOfCases");
    if(element.innerHTML == '' || element.innerHTML == null){
        let main = document.getElementById("mainContainer");
        main.innerHTML = '<div id = "noCasesBox"><img src = "page.png" id ="lapImage"><p>Test Case</p><p id = "detailsOfCase">A powerful built-in test case editor and builder along with a record and playback tool is a game changer. We\'ve got them both. So, why wait?</p><button onclick= "addCase()" id = "newCreateButton"><i class="fa-regular fa-plus"></i> Create Test Case</button></div>';
    }
    else{
        document.getElementById("mainContainer").innerHTML = '<div id = "showCaseNameBox"><div id = "textCaseName"></div><div id = "createANewCase" onclick="addCase()"><i class="fa-regular fa-plus"></i> <span>Create Test Case</span></div></div><div id = "actionBox"><div id = "actions"><div class="action center" onclick="run()"><i class="fa-regular fa-circle-play"></i></div><div class="action center" onclick="save()"><i class="fa-solid fa-floppy-disk"></i></div><div class="action center" onclick="edit()"><i class="fa-solid fa-file-pen"></i></div></div><div id = "saveStatus">Not Save</div><div id = "textApi" class="center"><span class="material-symbols-outlined">webhook</span>&nbspAPI</div></div><div id = "allRequestBox"><div id = "addRequestBox"><div id = "addRequestButton" class="center" onclick="createRequest()">+ Add Request</div></div></div>';
    }
}

function switchToCase(caseId){

}



function addCase(){
    let element = document.createElement("div");
    element.setAttribute("id","addCaseBox");
    let caseBox = document.createElement("div");
    caseBox.setAttribute("id","childBox");
    caseBox.innerHTML = '';
    let cancelBox = document.createElement("div");
    cancelBox.setAttribute("id", "cancelBox");

    cancelBox.innerHTML = "<p>Test Case Details</p><i class='fa-sharp fa-regular fa-xmark' id = 'cancelButton' onclick = 'cancel()'></i>";
    caseBox.appendChild(cancelBox);

    let inputBox = document.createElement("div");
    inputBox.setAttribute("id", "inputBoxes");

    inputBox.innerHTML = '<label>Name</label><input type = "text" id = "caseName" placeholder = "Enter name" class = "fildes"><label>Link Name</label><input type = "text" id = "linkName" placeholder = "Enter link Name" class = "fildes"><label>Description</label><textarea id = "des" placeholder="Description cannot exceed 1000 characters" class = "fildes"></textarea>';

    let createBox = document.createElement("div");
    createBox.setAttribute("id", "createBox");

    createBox.innerHTML = '<div id = "childCreateBox"><button onclick= "create()" class = "buttons" id = "create">Create</button><button onclick="cancel()" id = "cancel" class = "buttons" id = "cancel">Cancel</button></div>';


    caseBox.appendChild(inputBox);
    caseBox.appendChild(createBox);
    element.appendChild(caseBox);
    document.body.appendChild(element);
}

function changeURL(element){
    let inputs = element.parentNode.parentNode;
    let url = inputs.previousElementSibling.previousElementSibling.previousElementSibling.childNodes[1];
    // console.log(url);
    // if(url.previousElementSibling.value == "GET"){
    let urlValue = url.value.split("?");
    // console.log(url);
    // console.log(inputs);
    url.value = urlValue[0] + "?";
    for(let i =0; i<inputs.childElementCount; i++){
        url.value += inputs.childNodes[i].childNodes[0].value+"=";
        url.value += inputs.childNodes[i].childNodes[1].value;
        // console.log(inputs.childNodes[i].childNodes);
        url.value += "&";
    }
    // }
}

function changeParams(url){
    let inputs = url.parentNode.nextElementSibling.nextElementSibling.nextElementSibling;
    // if(url.previousElementSibling.value == "GET"){
        let urlValue = url.value.split("?");
        if(urlValue.length == 2){
            let keyValueSet = urlValue[1].split("&");
            inputs.innerHTML = "";
            for(let i=0; i<keyValueSet.length; i++){
                let keyValue = keyValueSet[i].split("=");
                if(keyValue.length == 1){
                    keyValue.push("");
                }
                inputs.innerHTML += '<div class = "inputsChild"><input class = "inputKey" placeholder = "Enter Name" oninput = "changeURL(this)" value = '+keyValue[0]+'><input class = "inputValue" placeholder = "Enter Value" oninput = "changeURL(this)" value = '+keyValue[1]+'><div class = "inputBoxRemove center"><i class="fa-sharp fa-regular fa-xmark" style = "font-weight: 600"  onclick="removeInput(this.parentElement)"></i></div></div>';
            }
        }
    // }
    
}

function removeResult(element){
    element.parentNode.parentNode.parentNode.remove();
}


function removeInput(element){
    element.previousElementSibling.value = "";
    element.previousElementSibling.previousElementSibling.value = "";
    changeURL(element.childNodes[0].parentNode);
    element.parentNode.remove();
}

function addInput(element){
    // console.log(element);
    element.parentElement.previousElementSibling.innerHTML += '<div class = "inputsChild"><input class = "inputKey" placeholder = "Enter Name" oninput = "changeURL(this)" value = ""><input class = "inputValue" placeholder = "Enter Value" oninput = "changeURL(this)" value = ""><div class = "inputBoxRemove center"><i class="fa-sharp fa-regular fa-xmark" style = "font-weight: 600"  onclick="removeInput(this.parentElement)"></i></div></div>';
}

function removeRequest(element){
    if(confirm("Do you want to remove this request ?")){
        element.parentNode.parentNode.parentNode.remove();
    }
    
}

function changeAPITypeText(element){
    let value = element.value;
    // console.log(element.parentNode.parentNode.previousElementSibling.childNodes[0].nextElementSibling.childNodes);
    element.parentNode.parentNode.previousElementSibling.childNodes[0].childNodes[1].innerHTML = value;
}

function createRequest(element){
    element = element.parentElement;
    let ele = document.createElement("div");
    ele.className = "request";
    ele.innerHTML = '<div class = "requestNameBox"><div class = "requestNameAndApiType"><p class = "textRequestName">Request'+document.getElementById("allRequestBox").childElementCount+'</p><p class = "apiTypeText">GET</p></div><div class = "deleteRequestBox center"><i class="fa-sharp fa-regular fa-xmark" style = "font-weight: 600"  onclick="removeRequest(this)"></i></div></div><div class="opertionBox"><div class = "optionsForRqOrVarBox"><div class="option center"><span class = "op">Request</span></div></div><div class = "urlBox"><select class="apiType" onchange="changeAPITypeText(this)"><option value = "GET">GET</option><option value = "POST">POST</option></select><input type = "text" class = "rq-url" oninput = "changeParams(this)"></div><div class = "optionForParam"><div class = "option center"><span class = "op">Param</span></div></div><div class = "nameValueBox"><div class = "textName">Name</div><div class = "textValue">Value</div><div class = "textRemove"></div></div><div class = "inputs"></div><div class = "addInputsBox"><div class="addInput center" onclick="addInput(this)">+ Params</div></div></div>';
    element.parentNode.insertBefore(ele, element);
}


function cancel(){
    document.getElementById("addCaseBox").remove();
}

function create(){

    let element = document.getElementById("listOfCases");

    var caseName = document.getElementById("caseName").value;
    var linkName = document.getElementById("linkName").value;
    var description = document.getElementById("des").value;

    if(caseName.length < 1){
        alert("Plese Enter the Name");
        return;
    }
    else if(linkName < 1){
        alert("Plese Enter the Link Name");
        return;
    }
    else{
        var xhr = new XMLHttpRequest();
    }
}

function run(){
    let requestName = [];
    let allRequest = document.getElementById("allRequestBox");
    let allElements = allRequest.childNodes;
    let allRequests = [];
    for(let i=3; i<allElements.length-2; i++){
        let request = allElements[i];
        var requestObject = {};
        requestName.push(request.childNodes[0].childNodes[0].childNodes[0].innerHTML);
        requestObject["url"] = request.childNodes[1].childNodes[1].childNodes[1].value;
        requestObject["methodType"] = request.childNodes[1].childNodes[1].childNodes[0].value;
        // console.log(requestObject["url"]);
        let params = {};
        let inputs = request.childNodes[1].childNodes[4];
        for(let j=0; j<inputs.childElementCount; j++){
            let key = inputs.childNodes[j].childNodes[0].value;
            let value = inputs.childNodes[j].childNodes[1].value;
            params[key] = value;
        }
        requestObject["params"] = JSON.stringify(params);
        // console.log(requestObject);
        allRequests.push(requestObject);
    }

    if(allRequests.length == 0){
        alert("Plese Create A Request");
        return;
    }
    else{
        let successCount = 0;
        let failCount = 0;
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function(){
            if(xhr.readyState == 4){
                var jsonArray = JSON.parse(xhr.responseText);
                let allResultBox  = document.createElement("div");
                allResultBox.setAttribute("id", "allResultBox"); 
                allResultBox.innerHTML += '<div id = "results"><div id = "cancelBoxForResult"><div id = "resultCountBox"><div class = "count"><span class = "text">TOTAL</span><p id = "totalCount">10</p></div><div class = "count" style="color: #05c505;"><span class = "text">SUCCEEDED</span><p id = "successCount">10</p></div><div class = "count" style ="color:#e01d1d"><span class = "text">FAILED</span><p id = "failCount">0</p></div></div><i class="fa-sharp fa-regular fa-xmark" style = "font-weight: 600;"  onclick="removeResult(this)"></i></div><div id = "allResults"></div></div>';
                document.body.appendChild(allResultBox);
                let allResult  = document.getElementById("allResults");
                console.log(jsonArray);
                for(let i=0; i<jsonArray.length; i++){

                    if(jsonArray[i].statusCode == 200){
                        allResult.innerHTML += '<div class = "result"><div class = "dueAndStatusBox"><div class = "statusBox"><p>'+requestName[i]+'</p><p style = "color:#05c505">'+(jsonArray[i].statusCode==undefined ?"500":jsonArray[i].statusCode)+'</p></div><div class = "dueBox"><p>Duration</p><p>'+jsonArray[i].duration+'</p></div></div><div id = "optionForResultBox"><div class = "optionForResult center" onclick="switchToBody(this)">Body</div><div class = "optionForResult center" onclick="switchToHeader(this)">Header</div></div><p class = "resultDetails">'+jsonArray[i].result+'</p><div class = "headerBox"><div class="headerList"><div class = "headerLeft">Method Type</div><div class = "headerMid">:</div><div class = "headerRight">'+allRequests[i].methodType+'</div></div><div class="headerList"><div class = "headerLeft">URL</div><div class = "headerMid">:</div><div class = "headerRight">'+allRequests[i].url+'</div></div><div class="headerList"><div class = "headerLeft">Params</div><div class = "headerMid">:</div><div class = "headerRight">'+allRequests[i].params+'</div></div></div></div>';
                        successCount++;
                    }
                    else{
                        allResult.innerHTML += '<div class = "result"><div class = "dueAndStatusBox"><div class = "statusBox"><p>'+requestName[i]+'</p><p style = "color:#e01d1d">'+(jsonArray[i].statusCode==undefined ?"500":jsonArray[i].statusCode)+'</p></div><div class = "dueBox"><p>Duration</p><p>'+jsonArray[i].duration+'</p></div></div><div id = "optionForResultBox"><div class = "optionForResult center" onclick="switchToBody(this)">Body</div><div class = "optionForResult center" onclick="switchToHeader(this)">Header</div></div><p class = "resultDetails">'+jsonArray[i].result+'</p><div class = "headerBox"><div class="headerList"><div class = "headerLeft">Method Type</div><div class = "headerMid">:</div><div class = "headerRight">'+allRequests[i].methodType+'</div></div><div class="headerList"><div class = "headerLeft">URL</div><div class = "headerMid">:</div><div class = "headerRight">'+allRequests[i].url+'</div></div><div class="headerList"><div class = "headerLeft">Params</div><div class = "headerMid">:</div><div class = "headerRight">'+allRequests[i].params+'</div></div></div></div>';
                        failCount++;
                    }
                }
                document.getElementById("totalCount").innerHTML = successCount+failCount;
                document.getElementById("failCount").innerHTML = failCount;
                document.getElementById("successCount").innerHTML = successCount;

            }
        };
        xhr.open("POST", "./Run", false);
        xhr.setRequestHeader("Content-type", "application/json");
        console.log(JSON.stringify(allRequests));
        xhr.send(JSON.stringify(allRequests));
    }
}

function switchToBody(element){
    element.parentNode.nextElementSibling.style.display = "flex";
    element.parentNode.nextElementSibling.nextElementSibling.style.display = "none";
}

function switchToHeader(element){
    element.parentNode.nextElementSibling.style.display = "none";
    element.parentNode.nextElementSibling.nextElementSibling.style.display = "flex";
}