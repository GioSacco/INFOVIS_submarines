
function drawSubmarines(submarineWidht, turretHeight, submarineX, submarineY){
        
        // INIZIALIZZA L'SVG

        var svg = d3.select("body")
            .append("svg")
            .attr("width", submarineWidht)
            .attr("height", submarineWidht)
            .attr("transform", function() {
                    return "translate("+submarineX+","+submarineY+")";
            });

        var g = svg.append("g")
            .attr("transform", function(d, i) {
                    return "translate(0,0)";
            });


        // DISEGNA L'ELLISSE DEL SOTTOMARINO

        g.append("ellipse")
            .attr("cx", submarineWidht / 2)
            .attr("cy", submarineWidht / 2)
            .attr("rx", submarineWidht / 2)
            .attr("ry", submarineWidht / 5.5)
            .attr("fill", "black");


        // CREA BASE TORRETTA

        g.append("rect")
            .attr("x", submarineWidht / 2.6)
            .attr("y", submarineWidht / 3.6)
            .attr("width", submarineWidht / 4)
            .attr("height", submarineWidht / 10)
            .attr("rx", submarineWidht / 10)
            .attr("fill", "black")
            .attr("opacity", 0.7);

        
        // CREA TORRETTA
      
        var turretHeightNormalize = turretHeight*(submarineWidht/100);

        g.append("rect")
            .attr("width", submarineWidht/50)
            .attr("height", turretHeightNormalize)
            .attr("fill", "black")
            .attr("transform", function(d, i) {
              return "translate("+ submarineWidht/2 +","+((submarineWidht/3.59) - turretHeightNormalize)+")";
            });

        // AGGIUNGI NOME SOTTOMARINO

        g.append("text")
            .attr("x", submarineWidht/1.5)
            .attr("y", submarineWidht/2.5)
            .attr("stroke", "white")
            .attr("font-family", "sans-serif")
            .attr("font-size", submarineWidht/22+"px")
            .text("T 26");


          // CREA SEZIONE ELICA

          g.append("polygon")
            .attr("points", (submarineWidht-10)+","+submarineWidht/2.76+","+(submarineWidht-10)+","+submarineWidht/2+","+submarineWidht/2.5+","+submarineWidht/2)
            .style("fill", "black")
            .attr("opacity", 0.7);

          g.append("polygon")
            .attr("points", (submarineWidht-10)+","+submarineWidht/1.55+","+(submarineWidht-10)+","+submarineWidht/2+","+submarineWidht/2.5+","+submarineWidht/2)
            .style("fill", "black")
            .attr("opacity", 0.7);


          // AGGIUNTI OBLO

          g.append("circle")
            .attr("cx", submarineWidht/2)
            .attr("cy", submarineWidht/2)
            .attr("r", submarineWidht/25)
            .style("fill", "white");

          g.append("circle")
            .attr("cx", submarineWidht/3.6)
            .attr("cy", submarineWidht/2)
            .attr("r", submarineWidht/15)
            .style("fill", "white");

 }

drawSubmarines(500, 10, 100, 100);