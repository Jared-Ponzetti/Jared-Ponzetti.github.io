
const LINK_GROUP_ERROR = [{"group": "error", "links": [{"name": "the remote links.json cannot be loaded", "url": "javascript:void(0);"}]}];

let linkGroups = null;

window.onload = (event) => {
    let s = window.location.search;

    let keyStart = s.indexOf("key=") + 4; if(keyStart < 4) {console.error("No api key"); return;}
    let keyEnd = s.indexOf("&", keyStart);
    let apiKey = keyEnd < 0 ? s.slice(keyStart) : s.slice(keyStart, keyEnd);

    let idStart = s.indexOf("id=") + 3; if(idStart < 3) {console.error("No doc id"); return;}
    let idEnd = s.indexOf("&", idStart);
    let docId = idEnd < 0 ? s.slice(idStart) : s.slice(idStart, idEnd);

    console.log(s, keyStart, keyEnd, apiKey, idStart, idEnd, docId);

    queryGoogleSheets(apiKey, docId);
};

function queryGoogleSheets(apiKey, docId) {
    
    let range = "'Sheet1'!A1:A1";
    let reqURL = new URL(`https://content-sheets.googleapis.com/v4/spreadsheets/${docId}/values/${range}`);
    reqURL.searchParams.append("key", apiKey);

    doGetRequest(reqURL, (json_rsp) => {
        cellA1 = json_rsp.values[0][0];
        setupLinkGroups(JSON.parse(cellA1));
    });
}


function doGetRequest(url, json_param_callback) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function() {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            data = JSON.parse(this.responseText);
            json_param_callback(data);
            return;
        }
    }
    xhr.send();
}

function setupLinkGroups(groups) {
    if (groups === null)
        linkGroups = [];
    else
        linkGroups = groups;

    const groupsHTML = document.getElementById("category-exteriors");
    
    let groupExterior = null;
    let groupText = null;
    let groupInterior = null;
    let linkTag = null;
    let linkText = null;

    for (let group of linkGroups) {

        groupExterior = document.createElement("div");
        groupExterior.setAttribute("class", "category-exterior");
        
        groupText = document.createElement("div");
        groupText.setAttribute("class", "text");
        groupText.textContent = group.name;
        groupExterior.appendChild(groupText);

        groupInterior = document.createElement("div");
        groupInterior.setAttribute("class", "category-interior");
        for (let link of group.links) {

            linkTag = document.createElement("a");
            linkTag.setAttribute("href", link.url);
            groupInterior.appendChild(linkTag);

            linkText = document.createElement("div");
            linkText.setAttribute("class", "text");
            linkText.textContent = link.name;
            linkTag.appendChild(linkText);

        }
        groupExterior.appendChild(groupInterior);

        groupsHTML.appendChild(groupExterior);
    }
}