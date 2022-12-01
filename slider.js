var data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
var months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"]; 

var months_of_year= ["January","February","March","April","May","June","July",
            "August","September","October","November","December"];

var svg = d3.select('body')
    .append('svg')
    .attr('width', 450)
    .attr('height', 100)
    .append('g')
    .attr('transform', 'translate(80, 50)');

var sliderStep = d3
    .sliderHorizontal()
    .min(d3.min(data))
    .max(d3.max(data))
    .width(300)
    .tickFormat((d,i) => months[i])
    .step(1)
    .default(1)
    .on('onchange', (val) => {
        val = val - 1;
        updateConstList(months_of_year[val]);
        updateWorldMap(months_of_year[val]);
    });

svg.call(sliderStep);
