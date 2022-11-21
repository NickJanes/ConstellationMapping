var margin = {top: 20, right: 80, bottom: 30, left: 50},
world_width = 700 - margin.left - margin.right,
world_height = 475 - margin.top - margin.bottom;

var svg_world = d3.select("body")
  .append("svg")
  .attr("width", world_width + margin.left + margin.right)
  .attr("height", world_height + margin.top + margin.bottom)

//======================================================================
//world projection (Built with refrence from Mike Bostock) https://bl.ocks.org/mbostock/3682676
//======================================================================
var projection = d3.geoWinkel3()
    .scale(130)
    .translate([world_width / 2 + 70, world_height / 2])
    .precision(.1)

var path = d3.geoPath()
    .projection(projection);

var graticule = d3.geoGraticule()
                  .precision([10]);
var lines = graticule.lines()                 
console.log(lines)

var mouseover = function() {
  d3.select(this)
      .style("opacity", 0.5)
      .style("fill", "lightgray")
  }

var mouseout = function() {
d3.select(this)
  .style("opacity", 1)
  .style("fill", "black")
}

svg_world.append("defs").append("path")
    .datum({type: "Sphere"})
    .attr("id", "sphere")
    .attr("d", path);

svg_world.append("use")
    .attr("class", "stroke")
    .attr("xlink:href", "#sphere");

svg_world.append("use")
    .attr("class", "fill")
    .attr("xlink:href", "#sphere");

svg_world.append("path")
    .datum(graticule)
    .attr("class", "graticule")
    .attr("d", path)
    ;

d3.json("land-50m.json").then(function(world){
  
  svg_world.insert("path", ".graticule")
      .datum(topojson.feature(world, world.objects.land))
      .attr("class", "land")
      .attr("d", path);
  
}); 
//======================================================================