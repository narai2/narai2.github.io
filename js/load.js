const drawChart = async () => {
    console.log("one");

    const width = 900;
    const height = 500;
    const margin = { top: 30, right: 20, bottom: 50, left: 50 };

    console.log("two");

    console.log("two");

    var CountryRegion = null;
    var Confirmed = null;
    var Date = null;
    
//    const data = await d3.csv("https://github.com/narai2/narai2.github.io/blob/main/covid_19_clean_complete.csv");
    const data = await d3.csv("./covid_19_clean_complete.csv");

    
    d3.csv("./covid_19_clean_complete.csv").then(function(data) {

        console.log(data);
        
    });
    
    


//        var CountryRegion = data.map(d => +d.Region);
//        var Confirmed = data.map(d => +d.Confirmed);
//        var Date = data.map(d => +d.Date);


    var x= d3.scaleLog().base(10).domain(Date).range(Date);

    const xavg = Date.map(value => x(value));

    var y= d3.scaleLog().base(10).domain(Confirmed).range(Confirmed);

    const yavg = Confirmed.map(value => y(value));
    console.log("one");

    //const r = EngineCylinders.map(value => value+2);

    //var margin = {top: 50, right: 50, bottom: 50, left: 50};
    d3.select('svg')
    .append('g')
    .attr("transform","translate(50,50)")
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
    .selectAll('circle')
    .data(data)
    .enter()
    .append('circle')
    .attr('cx',function(d,i) {return xavg[i];})
    .attr('cy',function(d,i) {return yavg[i];})
    .attr('r', function(d,i) {return r[i];});





     d3.select("svg").append("g")
        .attr("transform", "translate(50,50)")
        .call(d3.axisLeft(y)
        .tickValues([10,20,50,100])
        .tickFormat(s =>"~s"));


      d3.select("svg").append("g")
        .attr("transform", "translate(50,250)")
        .call(d3.axisBottom(x)
        .tickValues([10,20,50,100])
        .tickFormat(s =>"~s"));


     
}
                                                 drawChart();
