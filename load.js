


//  * @param {*} type "male", "female", "total" (male+female)
function loadChart(type, ycount){
    console.log(type);
      // Set the dimensions of the canvas / graph
      var margin = {top: 50, right: 20, bottom: 50, left: 50},
          width = 1400 - margin.left - margin.right,
          height = 500 - margin.top - margin.bottom;
  
      // Set the ranges
    
        // Add the svg canvas
        var svg = d3.select("#sce-canvas-" + type).append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//        var file = "";
//           if(type === "confirmed"){
//               file = "https://gist.githubusercontent.com/narai2/98e0371a8e4782eafc3dba807518df45/raw/69da7469b6a211f1f9882b09fe4c4213c5a78a76/covid_19_clean_complete_confirmed.csv";
//           } else if(type === "deaths"){
//               file = "https://gist.githubusercontent.com/narai2/1edbdbcf0707f34a588bcaf9f21c17d6/raw/0fe8274c69dc2ef79f943a8dc0a40b40252dd8b3/covid_19_clean_complete_deaths.csv";
//           } else if(type === "recovered"){
//               file = "https://gist.githubusercontent.com/narai2/f24889cceff8dd5a86c962f8c658986e/raw/f5a9e618a44a8e6d77bb14260169695118f06722/covid_19_clean_complete_recovered.csv";
//           }

    
    var file = "";
       if(type === "confirmed"){
           file = "./covid_19_clean_complete_confirmed.csv";
       } else if(type === "deaths"){
           file = "./covid_19_clean_complete_deaths.csv";
       } else if(type === "recovered"){
           file = "./covid_19_clean_complete_recovered.csv";
       }

    

    d3.csv(file).then(function(data) {

        data.forEach(function(d) {
        d.CaseCount = +d.CaseCount;
      });

    var helper = {};
    var sumstat = data.reduce(function(r, o) {
        var key = o.WHORegion + '-' + o.Date;

        if(!helper[key]) {
            helper[key] = Object.assign({}, o); // create a copy of o
            helper[key].count = 0;
            r.push(helper[key]);
        }
        else {
            helper[key].CaseCount += o.CaseCount;
        }
        helper[key].count += 1;

        return r;
        }, []);

    sumstat.forEach(function(d){
        d.CaseCount = +d.CaseCount;
    })
    sumstat.sort((a, b) => a.WHORegion.localeCompare(b.WHORegion) ||a.Date - b.Date );

    var dataset = d3.nest()
    .key(d => d.WHORegion)
    .entries(sumstat);
    console.log(dataset);
    
    

    var incomeGroup = dataset.map(d => d.key)
    console.log(incomeGroup);

    var color = d3.scaleOrdinal().domain(incomeGroup).range(colorbrewer.Set2[6]);

    var Dates = ["1/22/20","1/23/20","1/24/20","1/25/20","1/26/20","1/27/20","1/28/20","1/29/20","1/30/20","1/31/20","2/1/20","2/2/20","2/3/20","2/4/20","2/5/20","2/6/20","2/7/20","2/8/20","2/9/20","2/10/20","2/11/20","2/12/20","2/13/20","2/14/20","2/15/20","2/16/20","2/17/20","2/18/20","2/19/20","2/20/20","2/21/20","2/22/20","2/23/20","2/24/20","2/25/20","2/26/20","2/27/20","2/28/20","2/29/20","3/1/20","3/2/20","3/3/20","3/4/20","3/5/20","3/6/20","3/7/20","3/8/20","3/9/20","3/10/20","3/11/20","3/12/20","3/13/20","3/14/20","3/15/20","3/16/20","3/17/20","3/18/20","3/19/20","3/20/20","3/21/20","3/22/20","3/23/20","3/24/20","3/25/20","3/26/20","3/27/20","3/28/20","3/29/20","3/30/20","3/31/20","4/1/20","4/2/20","4/3/20","4/4/20","4/5/20","4/6/20","4/7/20","4/8/20","4/9/20","4/10/20","4/11/20","4/12/20","4/13/20","4/14/20","4/15/20","4/16/20","4/17/20","4/18/20","4/19/20","4/20/20","4/21/20","4/22/20","4/23/20","4/24/20","4/25/20","4/26/20","4/27/20","4/28/20","4/29/20","4/30/20","5/1/20","5/2/20","5/3/20","5/4/20","5/5/20","5/6/20","5/7/20","5/8/20","5/9/20","5/10/20","5/11/20","5/12/20","5/13/20","5/14/20","5/15/20","5/16/20","5/17/20","5/18/20","5/19/20","5/20/20","5/21/20","5/22/20","5/23/20","5/24/20","5/25/20","5/26/20","5/27/20","5/28/20","5/29/20","5/30/20","5/31/20","6/1/20","6/2/20","6/3/20","6/4/20","6/5/20","6/6/20","6/7/20","6/8/20","6/9/20","6/10/20","6/11/20","6/12/20","6/13/20","6/14/20","6/15/20","6/16/20","6/17/20","6/18/20","6/19/20","6/20/20","6/21/20","6/22/20","6/23/20","6/24/20","6/25/20","6/26/20","6/27/20","6/28/20","6/29/20","6/30/20","7/1/20","7/2/20","7/3/20","7/4/20","7/5/20","7/6/20","7/7/20","7/8/20","7/9/20","7/10/20","7/11/20","7/12/20","7/13/20","7/14/20","7/15/20","7/16/20","7/17/20","7/18/20","7/19/20","7/20/20","7/21/20","7/22/20","7/23/20","7/24/20","7/25/20","7/26/20","7/27/20"];

        console.log("count:"+Dates.length)
        
        var xScale =  d3.scalePoint().domain(Dates).range([0, width]),
          yScale = d3.scaleLinear().domain([0, ycount]).range([height, 0]);

        // Add X axis
        svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(xScale).tickFormat(function(d){
                    return d + "";
                }))
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-65)");
        
        svg.append("text")
        .attr("class", "label")
        .attr("transform", "translate(0," + height + ")")
        .attr("x", width)
        .attr("y", -6)
        .style("text-anchor", "end")
        .text("Date");
        console.log("x");
        
        // Add Y axis
        svg.append("g")
        .call(d3.axisLeft(yScale).tickFormat(function(d){
                    return d;
                }));

        svg.append("text")
        .attr("class", "label")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Count");
        
        
    svg.selectAll(".line")
        .append("g")
        //.attr("class", "line")
        .data(dataset)
        .enter()
        .append("path")
        .attr("class", function(d){ console.log(d.key);return d.key+type })
        .attr("d", function (d) {
            return d3.line()
                .x(d => xScale(d.Date))
                .y(d => yScale(parseInt(d.CaseCount)))
                .curve(d3.curveCardinal)
                (d.values)
        })
        .attr("fill", "none")
        .attr("stroke", d => color(d.key))
        .attr("stroke-width", 2)
        .attr("opacity", 1)
        .exit();
        console.log("y");


        svg
          // First we need to enter in a group
          .selectAll("myDots")
          .data(dataset)
          .enter()
            .append('g')
            .style("fill", function(d){ return color(d.key) })
            .attr("class", function(d){ console.log(d.key);return d.key+type })
          // Second we need to enter in the 'values' part of this group
          .selectAll("myPoints")
        .data(function(d){ return d.values })
          .enter()
          .append("circle")
            .attr("cx", d => xScale(d.Date))
            .attr("cy", d => yScale(d.CaseCount))
            .attr("r", 5)
            .attr("stroke", "white")
            .attr("opacity", 1)
                .on("mouseover", mouseover)
                .on("mousemove", mousemove)
                .on("mouseleave", mouseleave);
        
        
        console.log("chart");
        //append legends
    var legend = svg
        .selectAll('g.legend')
        .data(dataset)
        .enter()
        .append("g")
        .attr("class", "legend");

    legend.append("circle")
        .attr("cx", width-140)
        .attr('cy', (d, i) => i * 20 - 35)
        .attr("r", 6)
        .style("fill", d => color(d.key))

    legend.append("text")
        .attr("x", width-120)
//        .attr("x", 120)
        .attr("y", (d, i) => i * 20 - 30)
        .text(d => d.key)
        
    legend.on("click", function(d){
        console.log(d)
      // is the element currently visible ?
//                 currentOpacity = d3.selectAll( d.key).attr("stroke-width", 20)
        currentOpacity = d3.selectAll("." +d.key+type).attr("opacity")
        console.log(currentOpacity)
//                 currentOpacity = d3.selectAll("."+d.key).style("opacity")
      // Change the opacity: from 0 to 1 or from 1 to 0
//                 d3.selectAll("." + d.key).transition().attr("stroke-width", 20)
//        d3.selectAll("." + d.key+type).transition().attr("opacity", currentOpacity == 1 ? 0:1)

        if (currentOpacity == 1){
            d3.selectAll("." + d.key+type).transition().style("visibility", "hidden")
            d3.selectAll("." + d.key+type).transition().attr("opacity", 0)

        }
        if(currentOpacity == 0) {
            d3.selectAll("." + d.key+type).transition().style("visibility", "visible")
            d3.selectAll("." + d.key+type).transition().attr("opacity", 1)
        }
    })

    //append source
    svg.append("text")
        .attr("x", 50)
        .attr("y", 450)
        .text("Source: The World Bank")
        .style("fill", "black")
        .style("font-size", 12)
        .style("font-family", "Arial Black")
    }).catch(console.log.bind(console));;
  
  // create a tooltip
  var Tooltip = d3.select("#sce-canvas-" + type)
    .append("div")
    .style("opacity", 0)
    .attr("class", "tooltip")
    .style("background-color", "white")
    .style("border", "solid")
    .style("border-width", "2px")
    .style("border-radius", "5px")
    .style("padding", "5px")

  // Three function that change the tooltip when user hover / move / leave a cell
  var mouseover = function(d) {
    Tooltip
      .style("opacity", 1)
    d3.select(this)
      .style("stroke", "grey")
      .style("opacity", 1)
  }
  var mousemove = function(d) {
    Tooltip
      .html("Date: " + d.Date + "<br>Case Count: " + d.CaseCount + "<br>Region: " + d.WHORegion + "<br> Type: " + type)
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
    
    
    

    const annotations = [
      {
        note: { label: "January 21 — Confirms COVID-19 Human Transmission" },
        x: 0,
        y: 400,
        dy: -200,
        dx: 162,
        subject: { radius: 50, radiusPadding: 10 },
      },
      {
        note: { label: "February 2 — Global Air Travel Is Restricted" },
        x: 85,
        y: 400,
        dy: -150,
        dx: 180,
        subject: { radius: 50, radiusPadding: 10 },
      },
      {
        note: { label: "March 11 — WHO Declares COVID-19 a Pandemic" },
        x: 360,
        y: 400,
        dy: -200,
        dx: 162,
        subject: { radius: 50, radiusPadding: 10 },
      },
    ];

    // Add annotation to the chart
    const makeAnnotations = d3.annotation()
      .annotations(annotations)
    svg
      .append("g")
      .call(makeAnnotations)
}

function initial(){
    document.getElementById("to_scene1").addEventListener("click", function() {
        switchVisibility('scene0');
        switchVisibility('scene1');
        loadChart("confirmed", 9000000);
    });
    
    document.getElementById("to_scene2").addEventListener("click", function() {
        switchVisibility('scene1');
        switchVisibility('scene2');
        switchVisibility('sce-canvas-confirmed');
        loadChart("deaths", 400000);
    });
    
    document.getElementById("to_scene3").addEventListener("click", function() {
        switchVisibility('scene2');
        switchVisibility('scene3');
        switchVisibility('sce-canvas-deaths');
        loadChart("recovered", 5000000);
    });
    
    document.getElementById("start_over").addEventListener("click", function() {
        switchVisibility('scene3');
        switchVisibility('scene0');
        switchVisibility('sce-canvas-recovered');
        switchVisibility("confirmed", 9000000);
    });
}

function switchVisibility(scene){
    console.log(scene);
    var x = document.getElementById(scene);
    console.log(x.style.display);
    if (x.style.display === "none") {
        x.style.display = "";
      } else {
        x.style.display = "none";
      }
}

