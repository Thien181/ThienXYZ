function inits(){
    //console.log("InitX");
    // var date = new Date();
	// var current_hour = date.getHours();
	// var current_min = date.getMinutes();
	// console.log (date.toDateString() + " - " + date.toTimeString());
    //Click somewhere close menu
    // console.log(window.location.origin);
    // console.log($(".home a").attr("href"));
    // console.log($(".hcnHeader a").attr("href"));
    $(".home a").attr("href", window.location.origin +"/");
    $(".hcnHeader a").attr("href", window.location.origin +"/");
    //window.location.href = "hoicaonien.net";
}
function LoadLeftRight(){
    let leftRightPath = window.location.origin + "/MainHTML/Main_Left_Right.json";
    let LeftRightData = {};
        
    loadJSON(leftRightPath,"")
        .then(LeftRightData => {
            //$(".LeftRightPanels").html(listLeftRight(LeftRightData));
            $(".LeftPanel").html(listLeftRight(LeftRightData,"L"));
            $(".RightPanel").html(listLeftRight(LeftRightData,"R"));
        }
    );
}
function loadSlides(){
    let slidePath = window.location.origin + "/MainHTML/MainSlides.json";
    let SlideData = {};
    console.log("Here");
    loadJSON(slidePath,"MainSlides")
        .then(SlideData => {
            $("figure").html(listImages("MainSlides",SlideData));
        }
    );
    LoadLeftRight();
}
async function loadJSON(jsonFile,category){
    let xxxData = {};
    //console.log("category - "  + category);
    const xyz = await $.getJSON(jsonFile , function (dataX) {
        // jsonData = dataX[category];
        if (category != "")
            xxxData = dataX[category];
        else
            xxxData = dataX;
    }); 
    return xxxData;
}

function getVietText(theText){
    var retVal="";
    switch (theText){
        case "ThongBao":
            retVal = "Thông báo";
            break;
        case "TinTuc":
            retVal = "Tin Tức";
            break;
        case "TuongTe":
            retVal = "NZL 2nd trip";
            break;
        case "Hop-Hoi":
            retVal = "Họp Hội";
            break;
        case "Du-Ngoan":
            retVal = "Du ngoạn";
            break;
        case "Day-Centre":
            retVal = "Day centre";
            break;
        case "Van-Nghe":
            retVal = "Văn nghệ";
            break;
        case "Van-Tho":
            retVal = "Văn thơ";
            break;
        case "Sinh-Hoat":
        case "SinhHoat":
            retVal = "Sinh hoạt";
        break;
        case "The-Duc-Duong-Sinh":
            retVal = "Thể Dục Dưỡng Sinh";
            break;
        case "Cac-Khoa-Hoc":
            retVal = "Các Khóa Học";
        break;
        case "KhachThamVEFA":
            retVal = "Khách Thăm Hội";
        break;
        case "ThamViengHoiVien":
            retVal = "Thăm Viếng Hội Viên";
        break;
        case "PhimAnh":
            retVal = "Phim Ảnh";
        break;
        case "Nhac":
            retVal = "Nhạc";
        break;
        default:
            break;
    }
    return retVal;
}

let listLeftRight = (theData,LorR) => {
    //console.log("listLeftRight");
    //console.log(theData)
    var htmlText ="";
    if (LorR=="L"){
        htmlText = '<div class="LRPanels">';
        htmlText = htmlText + '<h2 class="center">' + theData.LeftHeading+ '</h2>';
        htmlText = htmlText + '<p class="LeftRightText">' + theData.LeftContent.replaceAll ('\r\n','<br>') + '</p>';
        htmlText = htmlText + '</div>';
    }
    else{
        let friday = getNextFirstFriday();
        let monthYear = friday.substring(3);
        theData.RightContent = theData.RightContent.replace("$NEXTFRIDAY",friday);
        theData.RightHeading = theData.RightHeading.replace("$MONTHYEAR",monthYear);
        htmlText = '<div class="LRPanels">';
        htmlText = htmlText + '<h2 class="center">' + theData.RightHeading + '</h2>';
        htmlText = htmlText + '<p class="LeftRightText">' + theData.RightContent.replaceAll ('\r\n','<br>') + '</p>';
        htmlText = htmlText + '</div>';
        
    }

    
    return htmlText;
}

let listImages = (category,theData) => {
    var ItemList = [];
    var htmlText = "";
    var root = "C:\\_ThienXYZ"
    // <figure>
    //                                 <img src="../HCN/Images/FrontPage/image-1.jpg" alt="Image">
    //                                 <img src="../HCN/Images/FrontPage/image-2.jpg" alt="Image">
    //                                 <img src="../HCN/Images/FrontPage/HCN Front Page.jpg" alt="Image">
    //                                 <img src="../HCN/Images/FrontPage/image-4.jpg" alt="Image">
    //                                 <img src="../HCN/Images/FrontPage/image-5.jpg" alt="Image">
    //                             </figure>
    console.log(theData)
    let  imgPath = "";
    for (var i=0; i < theData.length; i++){
        imgPath = theData[i].image;
        
        imgPath = imgPath.toString().replace(root,"");
        imgPath = imgPath.replace(/\\/g,"/");
        //shortText = '<img src="..' + imgPath + '" alt="Image">';
        htmlText = htmlText + '<img src="..' + imgPath + '" alt="Image">\n';
        //console.log(shortText);
    }
   
    
    //htmlText = htmlText + constructGridContainer(theData,NumItemsLoad); //' <div class="grid-container">\n' ;

    return htmlText;
}
let listItems = (category,theData,NumItemsLoad=0) => {
    var ItemList = [];
    var htmlText = "";
    var newTab = "";
    
    
   // console.log("Start listItems");
    //console.log("jsonData.length ",theData.length);
    //htmlText = '<div class="hcn-heading hcn-heading1">\n';
    htmlText = '<div class="hcn-heading">\n';
    htmlText = htmlText + getVietText(category) + '\n';
    htmlText = htmlText +  '</div>';

    htmlText = htmlText + constructGridContainer(category,theData,NumItemsLoad); //' <div class="grid-container">\n' ;

    return htmlText;
}

function constructGridContainer(category,theData,NumItemsLoad){
    let ItemCount = 0;
    let IsItemOk = true;
    var htmlText = '<div class="grid-container">\n' ;
    for (var i=0; i < theData.length; i++){
        
                
        ItemList = theData[i].ItemList;

        //console.log("ItemList.length ",ItemList.length);
        
        for (var j=0; j<ItemList.length; j++){
            if (ItemList[j].visible=="Y"){
                IsItemOk = true;
                if (NumItemsLoad==4 && category =="ThongBao"){
                    if (ItemList[j].showAtFront !="Y")
                    {
                        IsItemOk = false;
                    }
                }
                if (IsItemOk){
                    htmlText = htmlText + '<div class="grid-child">\n';
                    switch (ItemList[j].type.toLowerCase()){
                        case "youtube":
                            htmlText = htmlText + '<div class="youtube-container">\n';
                            htmlText = htmlText + '<iframe  class="resp-iframe" src="' + ItemList[j].path + '" gesture="media" allow="encrypted-media" allowfullscreen></iframe>';
                            htmlText = htmlText + '</div>\n';
                            //<div class="youtube-container">
                            //<iframe  class="resp-iframe" src="https://www.youtube.com/embed/EJCQWk1eO7U" gesture="media" allow="encrypted-media" allowfullscreen></iframe>';
                            //</div>
                            break;
                        case "docx":
                        case "doc":
                            htmlText = htmlText + '<div class="front-smallPic">\n';
                            //if (ItemList[j].IsExternalURL=="Y"){
                                htmlText = htmlText + '<a href="javascript:openDocx(\''+ ItemList[j].path + '\',\''+ItemList[j].IsExternalURL + '\');" >\n';
                                
                            //}
                            //else{
                                
                            //    htmlText = htmlText + '<a href="' + ItemList[j].path + '" target="_blank">\n';
                            //}
                            htmlText = htmlText + '<img class="ImgCentre" width="290" height="285" src="' + ItemList[j].image + '" alt="" loading="lazy" >\n';
                            htmlText = htmlText + '</a>\n';
                        htmlText = htmlText + '</div>\n';
                            break;
                        default:
                            htmlText = htmlText + '<div class="front-smallPic">\n';
                                htmlText = htmlText + '<a href="' + ItemList[j].path + '" target="_blank">\n';
                                    htmlText = htmlText + '<img class="ImgCentre" width="290" height="285" src="' + ItemList[j].image + '" alt="" loading="lazy" >\n';
                                htmlText = htmlText + '</a>\n';
                            htmlText = htmlText + '</div>\n';
                            break;
                    }
                        
                    if (ItemList[j].newWindow == "Y"){
                        newTab =  'target="_blank"';
                    }
                    else{
                        newTab = "";
                    }

                    htmlText = htmlText + '<div class="shortInfo">\n';
                        htmlText = htmlText + '<div class="postDate"> ' + calcPostedDays(ItemList[j].postDate) + ' </div>\n';
                        htmlText = htmlText + '<div class = "item-title">\n' ; 
                            //htmlText = htmlText + '<a href="' + ItemList[j].path + '" ' + newTab + '>' + ItemList[j].title + '</a>\n';     
                            switch (ItemList[j].type.toLowerCase()){
                                case "youtube":
                                    if (ItemList[j].IsExternalURL=="Y"){
                                        htmlText = htmlText + '<a href="' + ItemList[j].path + '" ' + newTab + '>' + ItemList[j].title + '</a>\n';
                                    }
                                    break;
                                case "docx":
                                case "doc":
                                    htmlText = htmlText + '<a href="javascript:openDocx(\''+ ItemList[j].path + '\',\'' + ItemList[j].IsExternalURL + '\' );" >' + ItemList[j].title + '</a>\n';
                                    //htmlText = htmlText + '<a href="javascript:openDocx(\''+ ItemList[j].path,ItemList[j].IsExternalURL +'\')" >' + ItemList[j].title + '</a>\n';
                                    break;
                                default:
                                    htmlText = htmlText + '<a href="' + ItemList[j].path + '" ' + newTab + '>' + ItemList[j].title + '</a>\n';
                                    break;
                            }
                            
                        htmlText = htmlText + '</div>\n'; //shortInfo

                        htmlText = htmlText + '<div class = "item-excerpt">\n';
                            htmlText = htmlText + '<p>' + ItemList[j].intro + '</p>\n';
                        htmlText = htmlText + '</div>\n';

                    htmlText = htmlText + '</div>\n'; //shortInfo
                    htmlText = htmlText + '</div>\n'; // grid-child
                    
                    ItemCount++;
                }
            }//endif
            //console.log(" 1 ItemCount ",ItemCount);
            if (NumItemsLoad>0 && ItemCount >= NumItemsLoad) break;
            

        }//for ItemList
        //console.log(" 2 ItemCount ",ItemCount);
        if (NumItemsLoad>0 && ItemCount >= NumItemsLoad) break;

    }// for  theData.length

    htmlText = htmlText + '</div>\n'; // grid-container
    return htmlText;
}

function calcPostedDays(dateStr){
    if (dateStr=="") return "Date not specified.";
    let datePost = new Date(dateStr);
    var one_day = 1000 * 60 * 60 * 24;
    var today = new Date();
    var NumDays = Math.round((today.getTime() - datePost.getTime()) / (one_day),0);
    
    if (NumDays >=20 ) return dateStr;
    
    var wordDay = " day";
    
    if (NumDays > 1)  wordDay = wordDay + "s ";
    
    return NumDays + wordDay + " ago.";
}
// function initClickItems(){
//     let elemClicks = document.getElementsByClassName("item-trigger");
//     for(var i=0; i < elemClicks.length; i++){
//         elemClicks[i].addEventListener("click", function(e){
//             let theId = $(this).attr("id");
            
//             //let aud = $(e.target).closest('i');
//             let clickedItem = $("#"+ theId);
//             let dPath = clickedItem.data("path");
//             let dType = clickedItem.data("type");
//             let newWindow = clickedItem.data("newwindow");
//             //openNewTab(theId);
//         //     console.log("newwindow",newWindow);
//         //    console.log("dPath",dPath);
//             if (newWindow=="Y"){
//                 // alert("newWindow Y " + dPath);
//                 window.open(dPath)
//             }
//             else {
//                 //alert("newWindow N",newWindow);
//                 window.open(dPath,"_self");
//             }
           
//         }, false);
//     }
// }
// function Slides(){
//     window.open(window.location.origin + "/admin/slides.html");
// }
function openDocx(ItemPath,IsExternal){
   //<p><iframe src="https://view.officeapps.live.com/op/embed.aspx?src=http://hoicaoniennsw.net/hoicaonien/hcndocs/TBNGDADULT.docx" width="80%" height="500px"></iframe></p>
    //thePath = "http://hoicaoniennsw.net/hoicaonien/hcndocs/CHVISIT-VE.docx";
    //<iframe class="doc" src="https://docs.google.com/gview?url=http://hoicaoniennsw.net/hoicaonien/hcndocs/CHVISIT-VE.docx&embedded=true"></iframe>

    //thePath = "http://114.77.104.10/_ThongBao/2022/Tradam07.docx";
    //thePath = "";
    //let cmd = 'https://view.officeapps.live.com/op/embed.aspx?src=' + thePath ;
    //let cmd = 'https://view.officeapps.live.com/op/embed.aspx?src=' + thePath ;
    //cmd = "https://docs.google.com/gview?url=http://hoicaoniennsw.net/hoicaonien/hcndocs/CHVISIT-VE.docx&embedded=true"
    //cmd = "https://docs.google.com/gview?url=http://hcnnsw.net/_ThongBao/2022/Tradam07.docx&embedded=true";
    //let cmd = "https://docs.google.com/gview?url=http://hcnnsw.net" + thePath + "&embedded=true";
    //console.log(ItemPath);
    //console.log(IsExternal);

    let domain = "";
    
    if(IsExternal !="Y"){
       domain = "http://hcnnsw.net";
    }
    
    
    let cmd = "https://docs.google.com/gview?url=" + domain + ItemPath + "&embedded=true";
    //console.log(cmd);
    window.open(cmd);

    //<iframe src="https://docs.google.com/gview?url=http://ieee802.org/secmail/docIZSEwEqHFr.doc&embedded=true" frameborder="0">
//</iframe>
}


function getNextFriday(theDate){
    
    while  (theDate.getDay()  != 5){
        theDate.setDate(theDate.getDate() + 1);
    }
    return theDate;
}

function getNextFirstFriday() {
    var dayOfWeek = 5;//friday
    let currDate = new Date();
    let firstDateOfMonth = new Date(currDate.getFullYear(),currDate.getMonth(),1);

    //console.log("1st " + firstDateOfMonth);
    let FridayDate = getNextFriday(firstDateOfMonth);
    //console.log("FridayDate " + FridayDate);
    if (currDate => FridayDate){ //friday is passed or currently friday
        //get the next friday
        firstDateOfMonth =new Date(currDate.getFullYear(),currDate.getMonth()+1,1);
        FridayDate = getNextFriday(firstDateOfMonth);
    }
    
    
    let dd = String(FridayDate.getDate()).padStart(2, '0');
    let mm = String(FridayDate.getMonth() + 1).padStart(2, '0'); //January is 0!
    let  yyyy = FridayDate.getFullYear();
   return dd + '/' + mm + '/' + yyyy;
  } 