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
            .on("mouseover", function(d){
                
                d3.select("#tooltip")
                  .select("#constName")
                  .text(name);

                d3.select("#tooltip")
                  .select("#abbreviation")
                  .text(abr);

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
            .on("mouseout", function() {
                 d3.select("#tooltip").classed("hidden", true);	
             });          
    });
}
