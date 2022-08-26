const svgWidth = 800, svgHeight = 400, svgMargin = 30;
const maxV = d3.max(vals.data.map((v) => v.Value)), numV = vals.data.length;
const yScale = d3.scaleLinear()
    .domain([maxV, 0])
    .range([0, svgHeight - svgMargin - 10]);
const xScale = d3.scaleLinear()
    .domain([0, numV])
    .range([0, svgWidth - svgMargin - 5]);
const xAxis = d3.axisBottom().scale(xScale);
const yAxis = d3.axisLeft().scale(yScale);
const svgele = d3.select('#bar-chart')
    .attr('width', svgWidth)
    .attr('height', svgHeight);

svgele.append('g')
    .attr('transform', `translate(${svgMargin}, 10)`)
    .call(yAxis);

svgele.append('g')
    .attr('transform', `translate(${svgMargin}, ${svgHeight - svgMargin})`)
    .call(xAxis);

const barWidth = (svgWidth - svgMargin) / vals.data.length, barP = 3;
svgele.selectAll('rect')
    .data(vals.data)
    .enter()
    .append('rect')
    .attr('width', barWidth - barP)
    .attr('height', function (d) {
        return yScale(d.Value);
    })
    .attr('transform', `translate(${svgMargin})`)
    .attr('y', function (d) {
        return svgHeight - yScale(d.Value) - svgMargin;
    })
    .attr('x', function (d, i) {
        return (barWidth) * i;
    });