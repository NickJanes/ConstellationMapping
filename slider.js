var data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
var months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"]; 

var months_of_year= ["January","February","March","April","May","June","July",
                     "August","September","October","November","December"];

var defaultMonth = months_of_year[0];

var slider = d3
    .sliderHorizontal()
    .min(0)
    .max(11)
    .step(1)
    .width(400)
    .tickFormat((d,i) => months[i])
    .displayValue(false)
    .on('onchange', (val) => {
        defaultMonth = months_of_year[val];
        updateConstList(months_of_year[val], latFilter);
        updateWorldMap(months_of_year[val]);
    });

d3.select('#slider')
    .append('svg')
    .attr('width', 500)
    .attr('height', 100)
    .append('g')
    .attr('transform', 'translate(30,30)')
    .call(slider);