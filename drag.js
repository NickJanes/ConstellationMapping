lat = 45
month = "December"

// set the dimensions and margins of the graph
margin = {top: 10, right: 100, bottom: 30, left: 30},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

//Read the data
d3.csv("con_month_and_latitude.csv").then( function(data) {

    filteredData = data.filter(function(row) {
        return row['Month'] == 'January';
    });
    
    freqData = filteredData.map(function(d) { 
        return {
            Constellation: d.Constellation
        }
    });
    
    //console.log(freqData);

    // add the options to the button
    d3.select("#selectButton")
      .selectAll('myOptions')
     	.data(freqData)
      .enter()
    	.append('option')
      .text(function (d) { return d.Constellation; }) // text showed in the menu
      .attr("value", function (d) { return d; }) // corresponding value returned by the button

    // A function that update the chart
    function update(selectedGroup) {
      
      // Create new data with the selection?
      //const dataFilter = data.map(function(d){return {time: d.time, value:d[selectedGroup]} })

      // Give these new data to update line
      /*line
          .datum(dataFilter)
          .transition()
          .duration(1000)
          .attr("d", d3.line()
            .x(function(d) { return x(+d.time) })
            .y(function(d) { return y(+d.value) })
          )
          .attr("stroke", function(d){ return myColor(selectedGroup) })*/
    }

    // When the button is changed, run the updateChart function
    d3.select("#selectButton").on("change", function(event,d) {
        // recover the option that has been chosen
        const selectedOption = d3.select(this).property("value")
        // run the updateChart function with this selected option
        update(selectedOption)
    })

})