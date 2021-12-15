
const LINK_GROUP_ERROR = [{"group": "error", "links": [{"name": "the remote links.json cannot be loaded", "url": "javascript:void(0);"}]}];

let linkGroups = null;

window.onload = (event) => {
    //doGetRequest("links.json", setupLinkGroups);
    setupLinkGroups(lg);
};


function doGetRequest(url, json_param_callback) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function() {
        if (this.readyState !== XMLHttpRequest.DONE || this.status !== 200) {
            json_param_callback(null);
            return;
        }
        
        data = JSON.parse(this.responseText);
        json_param_callback(data);
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