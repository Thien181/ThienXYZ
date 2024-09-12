
function updatemenu() {
  //This is for the little menu      
  if (document.getElementById('responsive-menu').checked == true) {
    document.getElementById('menu').style.borderBottomRightRadius = '0';
    document.getElementById('menu').style.borderBottomLeftRadius = '0';
  }else{
    document.getElementById('menu').style.borderRadius = '10px';
  }
}

$(function() {
    inits();
    jsonData = {};
    let href = location.href;
    console.log("href",href)
    let path = window.location.pathname;
    path= path.substring(1)
    let page = path.split("/").pop();
    if (page=="aboutUs" || page=="contact") return;
    let jsonPath = window.location.origin + "/_" + path +"/" + page + ".json";
   //console.log("path",path);
   //console.log("page",page);
   //console.log("jsonPath",jsonPath);
   
    loadJSON(jsonPath,page)
      .then(jsonData => {
          $(".items-container").html(listItems(page,jsonData));
          //initClickItems();
        }
      );
});