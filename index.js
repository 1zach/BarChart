

//TO DO:  YSCALE!!!
//HOVER TOOLTIP



console.log("HELLO")

const url = "https://api.worldbank.org/v2/country/kr/indicator/NY.GDP.MKTP.CD?format=json"
let arr = []
async function getGDP() {
    const response = await fetch(url)
    const data = await response.json()

    
    data[1].forEach(year => {
        if (year.date > 1991) {
        arr.push([year.date, year.value])
        }
    })
    buildChart(arr)

}


const w = 1100
const h = 500


function buildChart(arr) {
    const scale = d3.scaleLinear()
    arr = arr.reverse()
    minY = d3.min(arr, (d) => d[1])
    maxY = d3.max(arr, (d) => d[1])

    minY = minY / 1000000000
    maxY = maxY / 1000000000
    console.log(minY)
    console.log(maxY)


    const padding = 30 
    const yScale = d3.scaleLinear()
                        .domain([minY, maxY])
                        .range([0, 500])

    const yAxisScale = d3.scaleLinear()
    .domain([minY, maxY])
    .range([500, 0])
    
    console.log(yScale(1300034034034))

   

    const svg = d3.select(".container")
    .append("svg")
    .attr("width", w)
    .attr("height", h)
    .attr("class", "chart")
    
    

    svg.selectAll("rect")
       .data(arr)
       .enter()
       .append("rect")
       .attr("x", (d, i) => (i * 33) + 50)
       .attr("width", 25)
       .attr("height", (d, i) => yScale(d[1] / 1000000000))
       .attr("y", (d) => (h - yScale(d[1] / 1000000000)) - 15)
       .attr("fill", "darkgray")
       .attr("class", "bar")
       .append("title")
       .text((d) => (d[1] / 1000000000).toFixed(2) + " billion dollars")
       .attr("id", "tooltip")

    svg.selectAll("text")
        .data(arr)
        .enter()
        .append("text")
        .attr("x", (d, i) => (i * 33) + 50)
        .attr("y", 500)
        .text((d) => d[0])
        .attr("class", "text")
       
        const yAxis = d3.axisLeft()
        .scale(yAxisScale);

         svg.append("g")
             .attr("transform", "translate(1100, -15)")
             .call(yAxis)
             .attr("id", "y-axis");
}

  

getGDP()
  //document.getElementsByClassName('message')[0].innerHTML = keys;
