const_width = 660 - margin.left - margin.right;
const_height = 500 - margin.top - margin.bottom;

var svg = d3.select(".container")
  .append('svg')
  .attr('class', 'item')