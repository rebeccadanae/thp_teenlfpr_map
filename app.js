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
  			"<tr><td>Average</td><td>"+(d.num)+"</td></tr>"+
  			"</table>";
  	}

      function create_map(){
        d3.csv("map_summer.csv", function(data) {
          var group ="onlyschoolshare_all_all"

          var key = data.columns.slice(1).filter(function(d){
            return d == group
          })

          var northeast_val = data[0][group]*100
          var midwest_val = data[1][group]*100
          var south_val = data[2][group]*100
          var west_val = data[3][group]*100
          var all_vals = [northeast_val, midwest_val, south_val, west_val]
          var val_positions = []
          var val_colors = []
          var min_val = d3.min(all_vals)
          var max_val = d3.max(all_vals)
          var range = max_val - min_val
          var quarter = min_val + range/4
          var midpoint = min_val + range/2
          var three_quarter = max_val - range/4
          var cuts = [min_val, quarter, midpoint, three_quarter, max_val]
          var colors = ["#c4adce", "#9c78ac", "#7e548e", "#5e2c70"]
          for(let i = 0; i <all_vals.length;i ++){

            if(all_vals[i] < quarter){
              val_positions[i] = "bottom fourth"
              val_colors[i] = colors[0]
            }else if (all_vals[i] < midpoint){
              val_positions[i] ="second fourth"
              val_colors[i] = colors[1]
            }else if (all_vals[i] < three_quarter){
              val_positions[i] ="third fourth"
              val_colors[i] = colors[2]
            }else {
              val_positions[i] ="top fourth"
              val_colors[i] = colors[3]
            }

          }
          console.log(all_vals)
          console.log(val_positions)
          console.log(val_colors)
          //console.log(cuts)
          //console.log(data[0].idleshare_all_all)

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
                var color = ""
              if(west.includes(d)){
                region = "west"
                num = west_val
                color = val_colors[3]
              }else if(midwest.includes(d)){
                region = "midwest"
                num = midwest_val
                color = val_colors[1]
              }else if(northeast.includes(d)){
                region = "northeast"
                num = northeast_val
                color = val_colors[0]
              }else{
                region = "south"
                num = south_val
                color = val_colors[2]
              }

              sampleData[d]={region: region, num: num, color:color};
            });
            //console.log(sampleData)
          /* draw states on id #statesvg */
          uStates.draw("#statesvg", sampleData, tooltipHtml);

          d3.select(self.frameElement).style("height", "600px");
        })


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
