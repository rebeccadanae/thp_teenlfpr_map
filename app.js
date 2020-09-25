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

    var startup = true
    var selection = "idleshare_all_all_summer"
    var long_selection = "All Genders, All Races, Summer"
    var season = "Summer"
    var colors = ["#1affe0", "#00ccb1", "#007363", "#00332c"]
    var legend_cats = ["0-10", "10-20", "20-30", "30+"]
    var legend_title = "neither in the labor force nor enrolled in school"
    var tooltip = d3.select("div.tooltip");
    var region_data;
    var state_data;
    var state_map;
    var svg = d3.select("#statesvg")

    var genders_short = ["all", "fem", "male"];
    var genders_long = ["All Genders", "Female", "Male"];
    var races_short = ["all", "black", "hisp", "white"];
    var races_long = ["All Races", "Black", "Hispanic", "White"];
    var status_short = ["idle", "onlyschool","both", "onlywork"]
    var status_long = ["neither in the labor force nor enrolled in school", "enrolled in school and not in the labor force","in the labor force and in school", "in the labor force and not enrolled in school"]
var purple = ["#c4adce", "#9c78ac", "#7e548e", "#5e2c70"]
var teal = ["#1affe0", "#00ccb1", "#007363", "#00332c"]
var blue = ["#4de1ff", "#00add0", "#005566", "#002b33"]
var green = ["#ace481", "#69be28", "#467e1b", "#172a09"]
var status_colors = [teal, blue, purple, green]
var margin = {top: 10, left: 10, bottom: 10, right: 10}
  , width = parseInt(d3.select('#statesvg').style('width'))
  , width = width - margin.left - margin.right
  , mapRatio = .5
  , height = width * mapRatio;

  var projection     = d3.geoAlbersUsa()
  .scale(width)
  .translate([width / 2, height / 2]);
  var path            =   d3.geoPath( projection );


      function create_map(){
          d3.json("states.json", function(d) {
          state_data = d;

          d3.json("regions.json", function(d) {
          region_data = d;
          var all_vals = []
          for(let i = 0; i<d.features.length; i++){
            all_vals[i] = region_data.features[i].properties[selection]
          }
          var min_val = d3.min(all_vals)
          var max_val = d3.max(all_vals)
          var range = max_val - min_val
          var quarter = min_val + range/4
          var midpoint = min_val + range/2
          var three_quarter = max_val - range/4
          var cuts = [min_val, quarter, midpoint, three_quarter, max_val]
          var clean_cuts = cuts*100
          legend_cats = [(min_val*100).toFixed(1)+"-"+(100*quarter-0.1).toFixed(1), (100*quarter).toFixed(1)+"-"+(100*midpoint-0.1).toFixed(1), (100*midpoint).toFixed(1)+"-"+(100*three_quarter-0.1).toFixed(1), (100*three_quarter).toFixed(1)+"-"+(100*max_val).toFixed(1)]

          build_legend()

          svg.selectAll('state_path')
            .data(state_data.features)
            .enter()
            .append('path')
            .attr( 'd', path)
            .attr('stroke', "white")
            .attr('stroke-width', 1)
            .attr( 'fill', function(d){
                var value = d.properties[selection];
                if(value < quarter){
                  return colors[0]
                }else if(value < midpoint){
                  return colors[1]
                }else if(value < three_quarter){
                  return colors[2]
                }else{
                  return colors[3]
                }

                       })


          svg.selectAll('region_path')
            .data(region_data.features)
            .enter()
            .append('path')
            .attr( 'd', path)
            .attr('stroke', "white")
            .attr('stroke-width', 3)
            .attr('fill', 'white')
            .attr("fill-opacity", 0)
            .on("mouseover",function(d,i){
                d3.select(this).attr("fill-opacity","0.5");
                return tooltip.style("hidden", false).html(d.properties.region2_summer+": "+(100*d.properties[selection]).toFixed(1)+"%");
            })
            .on("mousemove",function(d){
                tooltip.classed("hidden", false)
                       .style("top", (d3.event.pageY) + "px")
                       .style("left", (d3.event.pageX + 10) + "px")
                       .html(d.properties.region2_summer+": "+(100*d.properties[selection]).toFixed(1)+"%");
            })
            .on("mouseout",function(d,i){
                d3.select(this).attr("fill-opacity", 0);
                tooltip.classed("hidden", true);
            });

          });

          });

      }

      function build_legend(){

        var circle_x = [45, 145, 245, 345]
        var legend_svg = d3
          .select(".legend-container")
          .append("svg")
          .attr("width", 450)
          .attr("height", 90)
          .attr("x", "50%")
          .classed("legend", true)

          var legend_rect =legend_svg
          .append("rect")
          //.attr("x", 10)
          //.attr("y", 10)
          .attr("width", 450)
          .attr("height", 90)
          .attr("stroke", "black")
          .attr("stroke-width", 3)
          .attr("fill-opacity", 0)


          var size = 20
          legend_svg.selectAll("myrect")
            .data(legend_cats)
            .enter()
            .append("circle")
              .attr("id", "legend_square")
              .attr("cy", 65)
              .attr("cx", function(d,i){
                return circle_x[i]})
              .attr("r", 8)
              .attr("height", size)
              .style("fill", function(d, i){ return colors[i]})


              legend_svg.selectAll("mylabels")
                .data(legend_cats)
                .enter()
                .append("text")
                  .attr("id", "legend_text")
                  .attr("y", 65)
                  .attr("x",  function(d,i){
                    return circle_x[i] + 12})
                  .text(function(d){ return d})
                  .attr("text-anchor", "left")
                  .style("alignment-baseline", "middle")

            legend_svg
            .append("text")
            .text("Percent "+legend_title)
            .attr("text-anchor", "middle")
            .attr("x", "50%")
            .attr("y", 20)
            .classed("bold", true)
            .attr("id", "legend_title")

            legend_svg
            .append("text")
            .text("("+long_selection+")")
            .attr("text-anchor", "middle")
            .attr("x", "50%")
            .attr("y", 40)
            .classed("bold", true)
            .attr("id", "legend_title")
      }


    create_map()




    function changeIt(){
      startup = false;
      //get rid of everything
      d3.selectAll("#layer, #legend_square, #legend_text, #legend_title, .legend, path").remove()

        var time_form = document.getElementById("time_frame")
        var time_form_val;
        for(var i=0; i<time_form.length; i++){
            if(time_form[i].checked){
              time_form_val = time_form[i].id;}}
        if(time_form_val == "school_year"){
          time_form_val = "ay"
          season = "School Year"
        }else{
          season = "Summer"
        }
      var gender = document.getElementById("gender").value;
      var race = document.getElementById("race").value;
      var status = document.getElementById("status").value;
      colors = status_colors[status]
      console.log(colors)
      selection = status_short[status]+"share_"+genders_short[gender]+"_"+races_short[race]+ "_"+time_form_val
      legend_title = status_long[status]
      long_selection = genders_long[gender]+", "+races_long[race]+", "+season

          create_map();
                }

    var dataTime = d3.select("#time_frame")
          dataTime.on("change", changeIt)

    var dataGender = d3.select("#gender")
          dataGender.on("change", changeIt)

    var dataRace = d3.select("#race")
          dataRace.on("change", changeIt)

          var dataStatus = d3.select("#status")
                dataStatus.on("change", changeIt)






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
