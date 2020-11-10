export const addTooltip = (container) => {
    const tooltip = container
        .append("div")
        .attr("class", "tooltip")
        .style("position", "absolute")
        .style("padding", "0.4rem")
        .style("border-radius", "0.2rem")
        .style("background", "#555")
        .style("font-weight", "900")
        .style("font-size", "0.8rem")
        .style("color", "#fff")
        .style("opacity", 0);
    return tooltip;
}

export const displayTooltip = (target, event, data) => {
    target.transition()
        .duration(500)
        .style("line-height", 1.6)
        .style("opacity", .9);
    target.html(data)
        .style("left", (event.pageX) + "px")
        .style("top", (event.pageY - 28) + "px");
    return target;
}

export const hideTooltip = (target, tooltipContainer) => {
    target.on("mouseout", (d) => tooltipContainer.transition().duration(300).style("opacity", 0));
}

export const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

export const truncateString = (str, charSize) => {
    if (str.length <= charSize) {
        return str;
    }
    return str.slice(0, charSize) + '...';
}

export const capitalizeString = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
