function getNewData(curDate){
  var FormatedDate = curDate.getFullYear() + "-" + (curDate.getMonth() + 1) + "-" + curDate.getDate();
  var url = "https://api.nasa.gov/planetary/apod?date=" + FormatedDate + "&api_key=gp1Sp3vLy0HtwvN1mkp6bfC8abfqFFbnUIRX9WOP";
  
  $.ajax({
    url: url,
    success: function(result){
    if("copyright" in result) {
      $("#copyright").text("Image Credits: " + result.copyright);
    }
    else {
      $("#copyright").text("Image Credits: " + "Public Domain");
    }
    
    if(result.media_type == "video") {
      $("#API_img_id").css("display", "none"); 
      $("#API_vid_id").attr("src", result.url);
    }
    else {
      $("#API_vid_id").css("display", "none"); 
      $("#API_img_id").attr("src", result.url);
    }
    $("#reqObject").text(url);
    $("#returnObject").text(JSON.stringify(result, null, 4));  
    $("#API_explaination").text(result.explanation);
    $("#API_Title").text(result.title);
    console.info(result);
  }
  });
}

//Bij laden van document --> Datum van vandaag
var curDate = new Date()
getNewData(curDate);


var vandaag = new Date().toISOString().split('T')[0];


function checkCurrentDate(HuidigeDatum){
  HuidigeDatum = HuidigeDatum.toISOString().split('T')[0];
  if (HuidigeDatum == vandaag){
    $("#volgende").css("cursor", "not-allowed");
    $("#volgende").css("background-color", "#7eaacf");
    $("#volgende").attr('disabled', 'disabled');

  }
  else{
    $("#volgende").css("cursor", "pointer");
    $("#volgende").css("background-color", "#1a5fac");
    $("#volgende").removeAttr("disabled")
  }
}

//Laden van webpagina
window.addEventListener("load", function(){
  //bij het laden wordt gecontroleerd of je op "Volgende" mag klikken
  checkCurrentDate(curDate)
  
  //  - Bij klikken op vorige
  document.getElementById("vorige").onclick = function(){
    // dag aftrekken van curdate:
    curDate.setDate(curDate.getDate() - 1);
    getNewData(curDate=curDate);

    //Na een klik op vorige wordt gecontroleerd of je op "Volgende" mag klikken
    checkCurrentDate(curDate)
  };

  //  - Bij klikken op volgende
  document.getElementById("volgende").onclick = function(){
    // dag aftrekken van curdate:
    curDate.setDate(curDate.getDate() + 1);
    getNewData(curDate=curDate);

    //Na een klik op volgende wordt gecontroleerd of je nogmaals op "Volgende" mag klikken
    checkCurrentDate(curDate)
    checkCurrentDate(curDate)
  };

  
});


