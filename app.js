"use strict";
!(function() {
  function analytics(action) {
    var label =
      1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : "null";
    window.dataLayer.push({
      event: "Interactive",
      category: "Interactive",
      action: action,
      label: label
    });
  }


  function app() {

    if (/Edge/.test(navigator.userAgent)) {
      var X = navigator.userAgent;
      var Y = "Edge/"
      var Z = Number(X.slice(X.indexOf(Y) + Y.length));
      if(Z < 18){
        var title = document.getElementById("title");
       title.innerHTML = "This interactive requires an up-to-date version of Microsoft Edge. Make sure you have the latest version installed or use another modern browser (i.e. Firefox, Chrome, Safari, or Opera).";
       title.style.color = "red";
      }

}

    //userAgent in IE7 WinXP returns: Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1; .NET CLR 2.0.50727)
  //userAgent in IE11 Win7 returns: Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko

  if (navigator.userAgent.indexOf('MSIE') != -1)
   var detectIEregexp = /MSIE (\d+\.\d+);/ //test for MSIE x.x
  else // if no "MSIE" string in userAgent
   var detectIEregexp = /Trident.*rv[ :]*(\d+\.\d+)/ //test for rv:x.x or rv x.x where Trident string exists

  if (detectIEregexp.test(navigator.userAgent)){ //if some form of IE
    var title = document.getElementById("title");
   title.innerHTML = "This interactive requires a modern browser (Firefox, Chrome, Safari, Opera, or Edge)";
   title.style.color = "red";
  }
  else{
  }

    function currencyFormat(num) {
  return '$' + num.toFixed().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

d3.selection.prototype.moveToFront = function() {
      return this.each(function(){
        this.parentNode.appendChild(this);
      });
    };



    function tooltipHtml(n, d){	/* function to create html content string in tooltip div. */
  		return "<h4>"+n+"</h4><table>"+
  			"<tr><td>Region</td><td>"+(d.region)+"</td></tr>"+
  			"<tr><td>Average</td><td>"+(d.avg)+"</td></tr>"+
  			"<tr><td>High</td><td>"+(d.high)+"</td></tr>"+
  			"</table>";
  	}

      function create_map(){
        d3.csv("map_summer.csv", function(data) {
          console.log(data);
        })

        var west = ["HI", "AK", "WA", "MT", "ID", "WY", "CO", "NM", "AZ", "UT", "NV", "CA", "UT", "OR"]
        var midwest = ["ND", "MN", "WI", "MI", "OH", "IN", "IL", "MO", "IA", "SD", "NE", "KS"]
        var northeast = ["ME", "NH", "VT", "NY", "PA", "NJ", "CT", "MA", "RI"]
        var sampleData ={};	/* Sample random data. */
        ["HI", "AK", "FL", "SC", "GA", "AL", "NC", "TN", "RI", "CT", "MA",
        "ME", "NH", "VT", "NY", "NJ", "PA", "DE", "MD", "WV", "KY", "OH",
        "MI", "WY", "MT", "ID", "WA", "DC", "TX", "CA", "AZ", "NV", "UT",
        "CO", "NM", "OR", "ND", "SD", "NE", "IA", "MS", "IN", "IL", "MN",
        "WI", "MO", "AR", "OK", "KS", "LS", "VA"]
          .forEach(function(d, i){
              var region=""
              var num =""
            if(west.includes(d)){
              region = "west"
              num = 25
            }else if(midwest.includes(d)){
              region = "midwest"
              num = 50
            }else if(northeast.includes(d)){
              region = "northeast"
              num = 75
            }else{
              region = "south"
              num = 100
            }

            sampleData[d]={region: region, color:d3.interpolate("#c4adce", "#5e2c70")(num/100)};
          });
          //console.log(sampleData)
        /* draw states on id #statesvg */
        uStates.draw("#statesvg", sampleData, tooltipHtml);

        d3.select(self.frameElement).style("height", "600px");
      }
    create_map()



    /*
    function changeIt(){
      startup = false;
      //get rid of everything
      d3.selectAll("#layer, #legend_square, #legend_text, #graphLabel1, #graphLabel2").remove()
      d3.selectAll("#yaxis").remove()
      d3.selectAll("#xaxis").remove()
        var time_form = document.getElementById("time_frame")
        var time_form_val;
        for(var i=0; i<time_form.length; i++){
            if(time_form[i].checked){
              time_form_val = time_form[i].id;}}

      var gender = document.getElementById("gender").value;
      var race = document.getElementById("race").value;

        if(time_form_val == "summer"){
          season = "Summer"
          dataName = "sandchart_summer.csv"
          graphLabel1 = "All genders, all races, summer"
          }else{
            season = "School Year"
          dataName = "sandchart_ay.csv"
          graphLabel1 = "All genders, all races, school year"
          };

        suffix1 = genders_short[gender]
        suffix2 = races_short[race]
        graphLabel2 = genders_long[gender]+", "+races_long[race]+", "+season

          create_graph();
                }

    var dataTime = d3.select("#time_frame")
          dataTime.on("change", changeIt)

    var dataGender = d3.select("#gender")
          dataGender.on("change", changeIt)

    var dataRace = d3.select("#race")
          dataRace.on("change", changeIt)
    */





  }

  document.addEventListener(
    "readystatechange",
    function() {
      "interactive" === document.readyState && app(),
        "complete" === document.readyState;
    },
    !1
  );
})();
