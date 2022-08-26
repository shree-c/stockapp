fetch('/api/v1', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({
        company: 'apple'
    })
}).then((data) => data.json()).then((vals) => {
    const svgWidth = 700, svgHeight = 200;
    //vals.data = vals.data.slice(200);
    const barWidth = svgWidth / vals.data.length;
    console.log(barWidth);
    const svgele = d3.select('#bar-chart')
        .attr('width', svgWidth)
        .attr('height', svgHeight)
        .selectAll('rect')
        .data(vals.data)
        .enter()
        .append('rect')
        .attr('width', barWidth)
        .attr('height', function (d) {
            return d.Value;
        })
        .attr('y', function (d) {
            return svgHeight - d.Value;
        })
        .attr('x', function (d, i) {
            return (barWidth + 4) * i;
        });
});