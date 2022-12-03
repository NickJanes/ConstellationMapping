var world_margin = {top: 20, right: 80, bottom: 30, left: 50},
world_width = 700 - world_margin.left - world_margin.right,
world_height = 475 - world_margin.top - world_margin.bottom;


var svg_world = d3.select("body")
  .append("svg")
  .attr("width", world_width + world_margin.left + world_margin.right)
  .attr("height", world_height + world_margin.top + world_margin.bottom)
//    .style("float", "left")
.style("display", "inline-block")

var color = d3.scaleThreshold()
    .domain([1, 2, 3, 4, 5, 6, 7, 8])
    .range(d3.schemeReds[9]);
//======================================================================
//world projection (Built with reference from Mike Bostock) https://bl.ocks.org/mbostock/3682676
//======================================================================
//heatmap built by nick janes edited by jorel huerto =========================================
let updateWorldMap = (month)=> {
    filteredData = con_month_and_lat.filter(function(row) {
        return row['Month'] == month;
    });   
    heat = heat.fill(0.1)
    overlap = overlap.fill(0)
    filteredData.forEach(row => {
        var north = parseInt(row['Northern latitude'])
        var south = parseInt(row['Southern latitude'])
        north = Math.round((90 - north) / 10)
        south = Math.round((90 + south) / 10)
        for(var i = north; i < south; i++) {
            heat[i] += .05
            overlap[i] += 1
        }
    });
    console.log(overlap)
    for(var i = 0; i < 18; i++) {
        var rect = d3.select("#world-" + i +" rect")
        console.log(color(i))
        rect.attr("fill", color(overlap[i])) 
    }
}
var overlap = new Array(18).fill(0)
var heat = new Array(18).fill(0.1);
//nick janes and jorel huerto end ======================================================

var projection = d3.geoWinkel3()
    .scale(130)
    .translate([world_width / 2 + 70, world_height / 2])
    .precision(.1)

var flatprojection = d3.geoMercator()
    .scale(75)
    .translate([world_width/2, world_height/2+25])
    .precision(.1)

var path = d3.geoPath()
    .projection(flatprojection);

var graticule = d3.geoGraticule()
                  .precision([10]);

//==========================================================
// This section is deprecated may update in the future
//==========================================================
/*
var lines = graticule.lines()                 
//console.log(lines)
var lat_lines = lines.filter(function (l){
  return l.coordinates[0][1] == l.coordinates[1][1];
  })
//console.log(lat_lines.length)
//insert 0 lat line inbetween 10 and 20 degrees
lat_lines.splice(9,0, lat_lines[0])
lat_lines.splice(0, 1)

//construct polygons from coordinates and remove last element
var polygonLatLines = buildPolygons(lat_lines)
//console.log(lat_lines)
polygonLatLines.splice(18, 1)
//console.log(polygonLatLines)
var geojsonLatLines = {
  "type":"FeatureCollection",
  "features":[]
};

for(k = 0; k < polygonLatLines.length; k++){
  geojsonLatLines.features.push({
    "type": "Feature",
    "geometry": polygonLatLines[k],
    "properties": {"id": +k} 
  })
  //console.log(geojsonLatLines.features[k])
}
//console.log(geojsonLatLines)
*/
//==========================================================
// end of deprecated section
//==========================================================
//draw sphere begin =============================
svg_world.append("defs").append("path")
    .datum({type: "Sphere"})
    .attr("id", "sphere")
    .attr("d", path);

svg_world.append("use")
    .attr("class", "stroke")
    .attr("xlink:href", "#sphere");

svg_world.append("use")
    .attr("class", "fill")
    .attr("xlink:href", "#sphere");
//draw sphere end =============================
//draw the gridlines
/*
svg_world.append("path")
    .datum(graticule)
    .attr("class", "graticule")
    .attr("d", path)
    ;
*/
d3.json("land-50m.json").then(function(world){
  
  svg_world.insert("path", ".graticule")
      .datum(topojson.feature(world, world.objects.land))
      .attr("class", "land")
      .attr("d", path);
  
  //draw the selectable area
  var areaScale = [52, 52, 32, 23, 19, 16, 15, 13, 13, 14, 14, 14, 16, 19, 23, 32, 52, 52]
  //console.log(areaScale.length)
  for(var itor = 0, offset = 2; itor < 18; itor++, offset = offset+areaScale[itor-1])
  {
    svg_world.append("g")
      .attr("class", "latitude area")
      .attr("id", "world-" + itor)
      .attr("transform", "translate(0,"+offset +")")
      .append("rect")
      .attr("height", areaScale[itor])
      .attr("x", 49)
      .attr("width", "472")
      .attr("rx", "1")
      .attr("fill", "lightgray")
      .attr("stroke", "none")
      .attr("stroke-width", "2px")
      .attr("opacity", 0.3)
      .on("mouseover", function () { 
        if(d3.select(this).style("opacity") < 0.95){
          d3.select(this).style("stroke", "black")
          d3.select(this).style("opacity", 0.5)
        }
      })
      .on("mouseout", function(){
        if(d3.select(this).style("opacity") < 0.95){
          d3.select(this).style("stroke", "none")
          d3.select(this).style("opacity", 0.3)
        }
        if(d3.select(this).style("stroke") == "black")
          d3.select(this).style("stroke", "none")
      })
      .on("click", function(){
          svg_world.selectAll("rect").each(function() {
              d3.select(this).style("opacity", 0.3)
          });
//            .style("opacity", (data) => {console.log(data); return 0})
          d3.select(this).style("stroke", "black")
          d3.select(this).style("opacity", 0.95)
      })
  }  
})
//======================================================================
//deprecated function
function buildPolygons(lineStrings){
  //set the lineStrings to new polygonList
  var polyList = lineStrings;

  for(i = 0, j = i+1; i < lineStrings.length && j < lineStrings.length; i++, j++){
      
      
      //we only want to reverse every other array
      //need deepcopies of j got from https://www.freecodecamp.org/news/how-to-clone-an-array-in-javascript-1d3183468f6a/
      if (j % 2 != 0)
        nextLine = JSON.parse(JSON.stringify(polyList[j].coordinates.reverse()));
      else
        nextLine = JSON.parse(JSON.stringify(polyList[j].coordinates));
      
      polyList[i].type = "Polygon"
      //console.log("begin new element")
      polyList[i].coordinates.push(nextLine)
      polyList[i].coordinates.push(polyList[i].coordinates[0])  
      //console.log(polyList[i-1])
  };
  return polyList;
};
