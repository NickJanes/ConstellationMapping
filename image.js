document.cookie = "SameSite=None"

var const_margin = {top: 50, right: 50, bottom: 50, left: 50};
var const_width = 600 - const_margin.left - const_margin.right;
var const_height = 600 - const_margin.top - const_margin.bottom;

var const_svg = d3.select(".container")
    .append('svg')
    .attr('class', 'item')
    .attr("width", const_width + const_margin.left + const_margin.right)
    .attr("height", const_height + const_margin.top + const_margin.bottom);

let updateConstVisualization = (name) => {
    const_svg.selectAll('*').remove();
    
    var abr;
    var type;
    var source;
    var des;
    
    d3.csv("con_names.csv", (d) => {

        if (name == d.Constellation){
            abr = d.Abbreviation.toLowerCase();
            type = d.Type;
            source = d.Source;
            des = d.Description;
        }
        
        const_svg.append("svg:image")
            .attr("xlink:href", function(d){
                if (abr == "gem"){
                    return "https://www.iau.org/static/archives/images/screen/gem_new.jpg"
                }
                else if (abr == "ser"){
                    return "https://www.iau.org/static/archives/images/screen/sercd.jpg"
                }
                else{
                    return "https://www.iau.org/static/archives/images/screen/"+abr+".jpg"
                }
            })
            .on("mouseover", function(event, d){
                
                // position of tooltip
                d3.select("#tooltip")
                  // using d3 pointer 
                  //.style("left", (d3.pointer(event)[0]+ 800 + "px"))
                  //.style("top", (d3.pointer(event)[1]+ 500 + "px"));

                  // using event.pageX
                  .style("left", (event.pageX) + "px")
                  .style("top", (event.pageY) + "px");

                  // potential way using transform
                  //.attr("transform", `translate(${ d.x + 500 },${ d.y - 100})`);

                  // potential way using style
                  //.style("left", `${(d.x + 35)}px`)
                  //.style("top", `${(d.y + 300)}px`);
                  


                d3.select("#tooltip")
                  .select("#constName")
                  .text(name);

                d3.select("#tooltip")
                  .select("#abbreviation")
                  .text(abr.toUpperCase());

                d3.select("#tooltip")
                  .select("#type")
                  .text(type);

                d3.select("#tooltip")
                  .select("#source")
                  .text(source);

                d3.select("#tooltip")
                  .select("#description")
                  .text(des);
            
                d3.select("#tooltip").classed("hidden", false);
            })
            .on("mousemove", function(event){
                d3.select("#tooltip")
                  .style("left", (event.pageX) + "px")
                  .style("top", (event.pageY) + "px");

            })
            .on("mouseout", function() {
                 d3.select("#tooltip").classed("hidden", true);	
             });          
    });
}
