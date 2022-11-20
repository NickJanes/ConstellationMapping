var margin = {top: 20, right: 80, bottom: 30, left: 50},
world_width = 900 - margin.left - margin.right,
world_height = 500 - margin.top - margin.bottom;

var svg_world = d3.select("body")
  .append("svg_world")
  .attr("width", world_width + margin.left + margin.right)
  .attr("height", world_height + margin.top + margin.bottom)

//======================================================================
//world projection (Built with refrence from Mike Bostock) https://bl.ocks.org/mbostock/3682676
//======================================================================
var projection = d3.geoWinkel3()
    .scale(182)
    .translate([world_width / 2, world_height / 2])


var path = d3.geoPath()
    .projection(projection);

var graticule = d3.geoGraticule();

svg_world.append("path")
    .datum(graticule)
    .attr("class", "graticule")
    .attr("d", path);

d3.json("land-50m.json").then(function(world){
  console.log(topojson.feature(world, world.objects.land))
  svg.insert("path", ".graticule")
      .datum(topojson.feature(world, world.objects.land))
      .attr("class", "land")
      .attr("d", path);
  
}); 
//======================================================================