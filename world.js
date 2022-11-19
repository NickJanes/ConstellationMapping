var margin = {top: 20, right: 80, bottom: 30, left: 50},
world_width = 300 - margin.left - margin.right,
world_height = 500 - margin.top - margin.bottom;

var svg = d3.select(".container")
  .append('svg')
  .attr('class', 'item')