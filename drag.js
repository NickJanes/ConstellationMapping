lat = 45

// set the dimensions and margins of the graph
margin = {top: 10, right: 100, bottom: 30, left: 30},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

//Read the data
d3.csv("con_month_and_latitude.csv").then( function(data) {
    con_month_and_lat = data;
//    console.log(con_month_and_lat);
    updateConstList("January");
});

var latArr = [];

let updateConstList = (month) => {
//    console.log(month);
    filteredData = con_month_and_lat.filter(function(row) {
        return row['Month'] == month;
    });    

    // add the options to the button
    d3.select("#selectButton")
        .selectAll('option')
        .remove()
    
    d3.select("#selectButton")
        .selectAll('option')
        .data(filteredData)
        .enter()
    	.append('option')
        .attr("class", "option")  
        .text(function (d) {
            if (latFilter == -1){
                return d.Constellation;
            }
            else if (latFilter == 2){
                
                var visibleConst = [];
                
                var north = parseInt(d["Northern latitude"]);
                var south = parseInt(d["Southern latitude"]);
                north = Math.round((90 - north) / 10)
                south = Math.round((90 + south) / 10)
                latArr = [north, south];
                
                if (latArr[0] <= selectedID[0] && selectedID[1] <= latArr[1]){
                        return d.Constellation;
                };   
            }
        }) 

        .attr("value", function (d) {
            d.Constellation;
            //console.log(d.Constellation);
        }) // corresponding value returned by the button

    // When the button is changed, run the updateChart function
    d3.select("#selectButton").on("change", function(event,d) {
//        // recover the option that has been chosen
        const selectedOption = d3.select(this).property("value")
        name = selectedOption;
//        // run the updateChart function with this selected option
        updateConstVisualization(name)
    })
    
}