lat = 45

// set the dimensions and margins of the graph
margin = {top: 10, right: 100, bottom: 30, left: 30},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

let con_month_and_lat = []
//Read the data
d3.csv("con_month_and_latitude.csv").then( function(data) {
    con_month_and_lat = data;
//    console.log(con_month_and_lat);
    updateConstList("January");
});

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
      .text(function (d) { return d.Constellation; }) // text showed in the menu
      .attr("value", function (d) { return d.Constellation; }) // corresponding value returned by the button

    // When the button is changed, run the updateChart function
//    d3.select("#selectButton").on("change", function(event,d) {
//        // recover the option that has been chosen
//        const selectedOption = d3.select(this).property("value")
//        name = selectedOption;
//        // run the updateChart function with this selected option
//        updateConstVisualization(name)
//    })
    
}