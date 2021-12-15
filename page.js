
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


}