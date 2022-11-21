var data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
var months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"]; 
var input = 1;

var svg = d3.select('div#slider-svg')
    .append('svg')
    .attr('width', 500)
    .attr('height', 500)
    .append('g')
    .attr('transform', 'translate(30, 450)');

var sliderStep = d3
    .sliderHorizontal()
    .min(d3.min(data))
    .max(d3.max(data))
    .width(300)
    .tickFormat((d,i) => months[i])
    .step(1)
    .default(1)
    .on('onchange', val => {
        input = val;
        console.log(input);
    });

svg.call(sliderStep);