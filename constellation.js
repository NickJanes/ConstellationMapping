
var const_margin = {top: 50, right: 50, bottom: 50, left: 50};
var const_width = 600 - const_margin.left - const_margin.right;
var const_height = 600 - const_margin.top - const_margin.bottom;

d3.select('body').style('background-color', 'black')

var const_svg = d3.select(".container")
    .append('svg')
    .attr('class', 'item')
    .attr("width", const_width + const_margin.left + const_margin.right)
    .attr("height", const_height + const_margin.top + const_margin.bottom)
    .style("background-color", "black")

name = 'Ursa Minor'
abrv = ''
promises = [d3.csv("con_names.csv"), 
            d3.text("constellation connection.tsv"),
            d3.csv("hygdata_v3.csv")];

var xScale = d3.scaleLinear()
    .range([0, const_width]);

var yScale = d3.scaleLinear()
    .range([0, const_height]);

Promise.all(promises).then(function(files) {
//    console.log(files[0])
    files[0].map((row) => {
        if(row[' Constellation'] == name) {
            abrv = row[' Abbreviation']
        }
    })
    
    var stars;
    files[1].split("\r\n").map((row) => {
        row = row.split(" ");
        if(row[0] != abrv) {
            return
        }
//        console.log(row);
        stars = row.slice(3);
    })
    
    
    files[2].map((row) => {
//        console.log(typeof(row.id))
        for(var i = 0; i < stars.length; i++) {
            if(row['id'] == stars[i]) {
                console.log(row);
                stars[i] = {x: parseFloat(row['ra']), y: parseFloat(row['dec'])}
            }
        }
    })
    
    xScale.domain([
    d3.min(stars, (d) => { return d.x; }),
    d3.max(stars, (d) => { return d.x; })
    ]);
    

    
    yScale.domain([
    d3.min(stars, (d) => { return d.y; }),
    d3.max(stars, (d) => { return d.y; })
    ]);
    
    console.log(stars);
    
    const dots = const_svg.selectAll(".dot")
        .data(stars)
        .enter().append("circle")
        .attr("class", "dot")
        .attr("r", 2)
        .attr("cx", function(d) {return xScale(d.x);})
        .attr("cy", function(d) {return yScale(d.y);})
        .style("fill", "white")
    
    for(var i = 0; i < stars.length; i += 2) {
        const_svg.append("line")
        .attr("x1", xScale(stars[i].x))
        .attr("y1", yScale(stars[i].y))
        .attr("x2", xScale(stars[i + 1].x))
        .attr("y2", yScale(stars[i + 1].y))
        .attr("stroke", "white")
        .attr("stroke-width", "2")
        .style("glow", "5px solid yellow");
    }
})