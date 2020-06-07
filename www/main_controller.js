

// Update…
var p = d3.select("body")
  .selectAll("div")
  .data([{size: 10, value: 10, color: 'red'}, {size: 30, value: 30, color: 'blue'} ])

// Enter…
p.enter().append("div")
    .text(function(d) { return d.value; })
    .style("font-size", function(d) { return d.size + "px"; })
    .style("color", function(d) {return d.color});

// Exit…
p.exit().remove();

