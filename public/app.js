import * as d3 from 'd3';
const buts = document.querySelectorAll('.but');
const stkstatusEle = document.querySelector('#stk');
const barchartEle = document.querySelector('#bar-chart');
const con = document.querySelector('.con');
const statusEle = document.querySelector('#stf');
const dataCache = new Map();
let daysStatus = 365;
//event management
buts.forEach((val) => {
    val.addEventListener('click', async (e) => {
        barchartEle.innerHTML = '';
        stkstatusEle.innerText = e.target.innerText;
        await drawChart(e.target.innerText);
    });
});
document.querySelectorAll('.tf').forEach((v) => {
    v.addEventListener('click', e => {
        if (e.target.innerText !== statusEle.innerText) {
            statusEle.innerHTML = e.target.innerText;
            barchartEle.innerHTML = '';
            daysStatus = +e.target.id;
            drawChart(stkstatusEle.innerText);
        }
    });
});
document.querySelector('#go').addEventListener('click', e => {
    barchartEle.innerHTML = '';
    drawChart(stkstatusEle.innerText, daysStatus);
});
//main svg element
const svgW = 800, svgH = 400, svgMargin = 50;
const svgE = d3.select('#bar-chart')
    .attr('width', svgW)
    .attr('height', svgH);

//adding date
let d = new Date();
let yearback = new Date(d);
yearback.setDate(d.getDay() - 365);
d3.select('.con')
    .append('input')
    .attr('type', 'date')
    .attr('id', 'start')
    .attr('min', () => `${yearback.toLocaleDateString('en-ca')}`)
    .attr('max', () => `${d.toLocaleDateString('en-ca')}`)
    .attr('value', () => `${d.toLocaleDateString('en-ca')}`);
const dateEle = document.getElementById('start');








//fetches data and calls draw svg
function drawChart(company) {
    if (dataCache.has(company)) {
        drawSvg({ ...dataCache.get(company) }, daysStatus, dateEle.getAttribute('min'), dateEle.value);
        return;
    }
    con.style.display = 'block';
    fetch('/api/v1', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            company
        })
    }).then((data) => data.json()).then((vals) => {
        //time frame dom
        dataCache.set(stkstatusEle.innerText, vals);
        drawSvg(vals, daysStatus, dateEle.getAttribute('min'), dateEle.value);
    });
}

function drawSvg(vals, days, from, to) {
    if (!to) {
        to = new Date();
    }
    const frmD = new Date(from), toD = new Date(to);
    vals.data = vals.data.map((v) => {
        return { Date: new Date(v.Date), Value: v.Value };
    }).filter((v) => {
        return v.Date > frmD && v.Date < toD;
    });
    if (days != 365 && days < vals.data.length) {
        vals.data = vals.data.slice(vals.data.length - days);
    }
    if (vals.data.length === 0) {
        alert('no elements left to draw graph');
        return;
    }
    const data1 = vals.data.map((v) => v.Value), numV = vals.data.length;
    const dates = vals.data.map((v) => new Date(v.Date));
    const yScale = d3.scaleLinear()
        .domain([d3.max(data1) + 60, 0])
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
}