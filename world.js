var margin = {top: 20, right: 80, bottom: 30, left: 50},
world_width = 900 - margin.left - margin.right,
world_height = 600 - margin.top - margin.bottom;

var svg_world = d3.select("body")
  .append("svg")
  .attr("width", world_width + margin.left + margin.right)
  .attr("height", world_height + margin.top + margin.bottom)

//======================================================================
//world projection (Built with refrence from Mike Bostock) https://bl.ocks.org/mbostock/3682676
//======================================================================
var projection = d3.geoWinkel3()
    .scale(182)
    .translate([world_width / 2, world_height / 2])
    .precision(.1)

var path = d3.geoPath()
    .projection(projection);

var graticule = d3.geoGraticule();

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
    .attr("d", path);

d3.json("land-50m.json").then(function(world){
  console.log(topojson.feature(world, world.objects.land))
  svg_world.insert("path", ".graticule")
      .datum(topojson.feature(world, world.objects.land))
      .attr("class", "land")
      .attr("d", path);
  
}); 
//======================================================================