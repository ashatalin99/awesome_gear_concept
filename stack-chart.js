import React from 'react';
import * as d3 from 'd3';

export default class StackChart extends React.Component {
    constructor(containerId) {
        super(containerId);
        this.containerId = this.props.id || 'stackChart';
    }

    componentDidMount() {
        this.drawChart();
    }

    drawChart() {
        d3.csv(this.props.csv_url).then(d => this.chart(d))
    }

    chart(data) {
        const container = d3.select('#' + this.containerId);
        const margin = {top: 10, right: 30, bottom: 20, left: 50};
        const width = 860 - margin.left - margin.right;
        const height = 200 - margin.top - margin.bottom;
        const axisTicks = {qty: 5, outerSize: 0};

        const svg = container
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");

        const format = d3.timeParse("%x");
        const parseDate = d3.timeFormat("%b %e");
        const subgroups = data.columns.slice(1);
        data.forEach(d => d.total = parseFloat(d.failed) + parseFloat(d.successful));
        const total = data.map(d => d.total);

        const x = d3.scaleBand()
            .range([0, width])
            .domain(d3.map(data, d => d.date))
            .padding([0.5]);

        const y = d3.scaleLinear()
            .domain([0, d3.max(total)])
            .range([ height, 0 ]);

        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .attr("class", "x axis")
            .call(d3.axisBottom(x).tickFormat(d => {
                return parseDate(format(d));
            }).tickValues(x.domain().filter(function(d,i){ return !(i%4)})));

        svg.append("g")
            .attr("transform", "translate(0, 0)")
            .attr("class", "y axis")
            .call(d3.axisLeft(y).ticks(axisTicks.qty).tickSizeOuter(axisTicks.outerSize).tickSizeInner(-width));

        svg.selectAll(".domain, line")
            .attr("stroke-width","1")
            .attr("stroke","#E0E0E0");

        const color = d3.scaleOrdinal()
            .domain(subgroups)
            .range(['#00B3C8','#9EE2EA']);

        const stackedData = d3.stack()
            .keys(subgroups)
            (data)

        svg.append("g")
            .selectAll("g")
            .data(stackedData)
            .enter().append("g")
            .attr("fill", d => color(d.key))
            .selectAll("rect")
            .data(d => d)
            .enter().append("rect")
            .attr("x", function(d) {
                return x(d.data.date)
            })
            .attr("y", d => y(d[1]))
            .attr("height", d => y(d[0]) - y(d[1]))
            .attr("width",x.bandwidth())


    }

    render(containerId) {
        return <div id={this.containerId}></div>
    }
}
