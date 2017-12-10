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
getNewData(curDate=curDate);


window.addEventListener("load", function(){

  //Bij klikken op vorige
  document.getElementById("vorige").onclick = function(){
    // dag aftrekken van curdate:
    curDate.setDate(curDate.getDate() - 1);
    getNewData(curDate=curDate);

  };

  //Bij klikken op volgende


});


