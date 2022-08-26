const buts = document.querySelectorAll('.but');
console.log(buts);
for (let i = 0; i < buts.length; i++) {
    buts[i].addEventListener('click', async (e) => {
        console.log(e.target.innerHTML);
        document.querySelector('#bar-chart').innerHTML = '';
        await drawChart(e.target.innerText);
    });
}

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
        const svgW = 800, svgH = 400, svgMargin = 30;
        const svgE = d3.select('#bar-chart')
            .attr('width', svgW)
            .attr('height', svgH);
        const data1 = vals.data.map((v) => v.Value), numV = vals.data.length;
        const yScale = d3.scaleLinear()
            .domain([d3.max(data1), 0])
            .range([0, svgH - svgMargin - 10]);

        const xScale = d3.scaleLinear()
            .domain([0, numV])
            .range([0, svgW - svgMargin - 5]);

        const xAxis = d3.axisBottom().scale(xScale);
        const yAxis = d3.axisLeft().scale(yScale);
        svgE.append('g')
            .attr('transform', `translate(${svgMargin}, ${svgH - svgMargin})`)
            .call(xAxis);

        svgE.append('g')
            .attr('transform', `translate(${svgMargin}, ${10})`)
            .call(yAxis);

        //adding rectangles
        const barW = (svgW - svgMargin) / data1.length, barP = 3 * 0.3;
        svgE.selectAll('rect')
            .data(data1)
            .enter()
            .append('rect')
            .attr('width', barW - barP)
            .attr('height', function (d) {
                return yScale(d);
            })
            .attr('transform', `translate(${svgMargin})`)
            .attr('y', function (d) {
                return svgH - yScale(d) - svgMargin;
            })
            .attr('x', function (d, i) {
                return (i * barW);
            });
    });
}