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
        .attr("xlink:href", function(){
        
            // Special case, const split into 2 - load both?
            if (name == "Serpens"){
                return "http://www.seasky.org/constellations/assets/images/serpens-caput.jpg"
                //return "http://www.seasky.org/constellations/assets/images/serpens-cauda.jpg"
            }
            else{
                return "http://www.seasky.org/constellations/assets/images/"
                    +name.toLowerCase().replace(" ", "-").replace("ö", "o")
                    +".jpg"
            }
        })
    
        .on("mouseover", function(d){
        
            d3.csv("con_names.csv", (d) => {
                
                if (d.Constellation == name){
                    d3.select("#tooltip")
                      .select("#constName")
                      .text(name);
                    
                    d3.select("#tooltip")
                      .select("#abbreviation")
                      .text(d.Abbreviation);
                    
                    d3.select("#tooltip")
                      .select("#type")
                      .text(d.Type);
                    
                    d3.select("#tooltip")
                      .select("#source")
                      .text(d.Source);
                    
                    d3.select("#tooltip")
                      .select("#description")
                      .text(d.Description);
                }
            });
        
            d3.select("#tooltip").classed("hidden", false);
        })
    
        .on("mouseout", function() {
             d3.select("#tooltip").classed("hidden", true);	
         });
}
