var margin = {top: 20, right: 80, bottom: 30, left: 50},
world_width = 900 - margin.left - margin.right,
world_height = 500 - margin.top - margin.bottom;

var svg_world = d3.select(".container")
  .append('svg')
  .attr('class', 'item')

//======================================================================
//world projection (Built with refrence from Mike Bostock) https://bl.ocks.org/mbostock/3682676
//======================================================================
var projection = d3.geo.winkel3()
    .scale(182)
    .translate([width / 2, height / 2])
    .precision(.1);

var path = d3.geo.path()
    .projection(projection);

var graticule = d3.geo.graticule();

d3.json("").then(function(){
  
}); 
//======================================================================