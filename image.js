var const_margin = {top: 50, right: 50, bottom: 50, left: 50};
var const_width = 600 - const_margin.left - const_margin.right;
var const_height = 600 - const_margin.top - const_margin.bottom;

var const_svg = d3.select(".container")
    .append('svg')
    .attr('class', 'item')
    .attr("width", const_width + const_margin.left + const_margin.right)
    .attr("height", const_height + const_margin.top + const_margin.bottom)
    .style("float", "right")
    .style("margin-right", "30px");

d3.csv("con_names.csv", function(error, data) {
    if (error) throw error;
    console.log(data);

    /*var div = d3.select("body")
       .append("div")
       .attr("class", "tooltip")
       .style("opacity", 0);*/

    var Tooltip = d3.select(".container")
       .append("div")
       .style("opacity", 0)
       .attr("class", "tooltip")
       .style("background-color", "white")
       .style("border", "solid")
       .style("border-width", "2px")
       .style("border-radius", "5px")
       .style("padding", "5px");
   

    var mouseover = function(d) {
    Tooltip
      .style("opacity", 1)
    d3.select(this)
      .style("stroke", "black")
      .style("opacity", 1)
    }

    var mousemove = function(d) {
    Tooltip
      .html("The exact value of<br>this cell is: " + d.value)
      .style("left", (d3.mouse(this)[0]+70) + "px")
      .style("top", (d3.mouse(this)[1]) + "px")
    }

    var mouseleave = function(d) {
    Tooltip
      .style("opacity", 0)
    d3.select(this)
      .style("stroke", "none")
      .style("opacity", 0.8)
    }

    /*const_svg.append("rect")
        .attr("class", "image")
        .on("mouseover", function(event) {
            div.transition().duration(200).style("opacity", 1);
            // tooltip text
            let toolText = 'Abbreviation: $(data.Abbreviation) <br> Description: $(data.Description) <br> Type: $(data.Type) <br> Source: $(data.Source)'
            div.html(toolText)
                .style("left", (event.pageX) + 5 +  "px")
                .style("top", (event.pageY - 28)  + "px");
        })
        // hide tooltip when mouse off
       .on("mouseout", function(d) {
            div.transition()
                .duration(200)
                .style("opacity", 0)
    });*/

    const_svg.selectAll()
    .data(data, function(d) {return "Abbreviation: " + d.Abbreviation +  "Description: " + d.Description +  "<br>: " + d.Type +  "<br>Source: " + d.Source;})
    .enter()
    .append("rect")
    .on("mouseover", mouseover)
    .on("mousemove", mousemove)
    .on("mouseleave", mouseleave)
})

let updateConstVisualization = (name) => {
    const_svg.selectAll('*').remove();
    
    // Stellarium
    /*
    const_svg.append("svg:image")
        .attr("xlink:href", "https://raw.githubusercontent.com/Stellarium/stellarium/master/skycultures/modern/"
              +name.toLowerCase().replace(" ", "-").replace("ö", "o")
              +".png")
        .attr('viewBox', '-0 -5 10 10');
    */
    
    // Sea Sky
    // http://www.seasky.org/constellations/constellations.html
    const_svg.append("svg:image")
        .attr("xlink:href", "http://www.seasky.org/constellations/assets/images/"
              +name.toLowerCase().replace(" ", "-").replace("ö", "o")
              +".jpg");
}
