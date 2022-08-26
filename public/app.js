import * as d3 from 'd3';
const buts = document.querySelectorAll('.but');
for (let i = 0; i < buts.length; i++) {
    buts[i].addEventListener('click', async (e) => {
        document.querySelector('#bar-chart').innerHTML = '';
        document.querySelector('#stk').innerText = e.target.innerText;
        await drawChart(e.target.innerText);
    });
}

const svgW = 800, svgH = 400, svgMargin = 50;
const svgE = d3.select('#bar-chart')
    .attr('width', svgW)
    .attr('height', svgH);
function drawChart(company) {
    fetch('/api/v1', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            company
        })
    }).then((data) => data.json()).then((vals) => {
        vals.data = vals.data;
        vals.data = vals.data.map((v) => {
            return { Date: new Date(v.Date), Value: v.Value };
        });
        const data1 = vals.data.map((v) => v.Value), numV = vals.data.length;
        const dates = vals.data.map((v) => new Date(v.Date));
        const yScale = d3.scaleLinear()
            .domain([d3.max(data1), 0])
            .range([0, svgH - svgMargin - 10]);

        const xScale = d3.scaleTime()
            .domain([dates[0], dates[dates.length - 1]])
            .range([0, svgW - svgMargin - 5]);

        const xAxis = d3.axisBottom().scale(xScale);
        const yAxis = d3.axisLeft().scale(yScale);
        svgE.append('g')
            .attr('transform', `translate(${svgMargin}, ${svgH - svgMargin})`)
            .call(xAxis.tickFormat(d3.timeFormat("%Y-%m-%d")))
            .selectAll("text")
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", "rotate(-30)");

        svgE.append('g')
            .attr('transform', `translate(${svgMargin}, ${10})`)
            .call(yAxis);
        //adding line
        svgE.append("path")
            .datum(vals.data)
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-width", 1.5)
            .attr('transform', `translate(${svgMargin})`)
            .attr("d", d3.line()
                .x(function (d) { return xScale(d.Date); })
                .y(function (d) { return yScale(d.Value); })
            );
    });
}