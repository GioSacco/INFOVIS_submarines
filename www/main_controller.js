
// VARIABILE CHE MEMORIZZA LA LISTA DI TUTTI I SOTTOMARINI CHE SARANNO LETTI DAL FILE ESTERNO
var submarineList = [];

// FUNZIONE CHE DISEGNA UN SINGOLO SOTTOMARINO USANDO I DATI RICEVUTI COME PARAMETRI
function drawSubmarines(submarine){
        
        /**
         *  INIZIALIZZA L'SVG DEL SINGOLO SOTTOMARINO 
         * */

        var svg = d3.select("body")
            .append("svg")
            .attr("id", submarine.submarineID+"_svg")
            .attr("width", submarine.submarineWidht)
            .attr("height", submarine.submarineWidht)
            .attr("transform", function() {
                    return "translate("+submarine.submarineX+","+submarine.submarineY+")";
        });

        // CHIAMA LA FUNZIONE randomResize AL CLICK
        svg.on("click", function() {
            updateSubmarines(submarine);
        })

        var g = svg.append("g")
            .attr("transform", function(d, i) {
                    return "translate(0,0)";
            });


        /**
         * DISEGNA L'ELLISSE DEL SOTTOMARINO
         */

        g.append("ellipse")
            .attr("id", submarine.submarineID+"_ellipse_area")
            .attr("cx", submarine.submarineWidht / 2)
            .attr("cy", submarine.submarineWidht / 2)
            .attr("rx", submarine.submarineWidht / 2)
            .attr("ry", submarine.submarineWidht / 5.5)
            .attr("fill", submarine.primaryColor);



        /**
         * CREA BASE TORRETTA
         */

        g.append("rect")
            .attr("id", submarine.submarineID+"_rect_area")
            .attr("x", submarine.submarineWidht / 2.6)
            .attr("y", submarine.submarineWidht / 3.6)
            .attr("width", submarine.submarineWidht / 4)
            .attr("height", submarine.submarineWidht / 10)
            .attr("rx", submarine.submarineWidht / 10)
            .attr("fill", submarine.primaryColor)
            .attr("opacity", 0.7);

        

        /**
         * CREA TORRETTA
         */
      
        var turretHeightNormalize = submarine.turretHeight*(submarine.submarineWidht/100);

        g.append("rect")
            .attr("id", submarine.submarineID+"_turret_area")
            .attr("width", submarine.submarineWidht/50)
            .attr("height", turretHeightNormalize)
            .attr("fill", submarine.primaryColor)
            .attr("transform", function(d, i) {
              return "translate("+ submarine.submarineWidht/2 +","+((submarine.submarineWidht/3.59) - turretHeightNormalize)+")";
            });


        /**
         * AGGIUNGI NOME SOTTOMARINO
         */

        g.append("text")
            .attr("id", submarine.submarineID+"_name")
            .attr("x", submarine.submarineWidht/1.6)
            .attr("y", submarine.submarineWidht/2.5)
            .attr("stroke", "white")
            .attr("font-family", "sans-serif")
            .attr("font-size", submarine.submarineWidht/28+"px")
            .text("INFOVIS");



        /**
         * CREA SEZIONE ELICA
         */

        g.append("polygon")
            .attr("id", submarine.submarineID+"_elica_top")
            .attr("points", (submarine.submarineWidht-10)+","+submarine.submarineWidht/2.76+","+(submarine.submarineWidht-10)+","+submarine.submarineWidht/2+","+submarine.submarineWidht/2.5+","+submarine.submarineWidht/2)
            .style("fill", submarine.primaryColor)
            .attr("opacity", 0.7);

        g.append("polygon")
            .attr("id", submarine.submarineID+"_elica_bottom")
            .attr("points", (submarine.submarineWidht-10)+","+submarine.submarineWidht/1.55+","+(submarine.submarineWidht-10)+","+submarine.submarineWidht/2+","+submarine.submarineWidht/2.5+","+submarine.submarineWidht/2)
            .style("fill", submarine.primaryColor)
            .attr("opacity", 0.7);



        /**
         * AGGIUNTI OBLO
         */

        g.append("circle")
          .attr("id", submarine.submarineID+"_oblo_dx")
            .attr("cx", submarine.submarineWidht/2)
            .attr("cy", submarine.submarineWidht/2)
            .attr("r", submarine.submarineWidht/25)
            .style("fill", "white");

        g.append("circle")
            .attr("id", submarine.submarineID+"_oblo_sx")
            .attr("cx", submarine.submarineWidht/3.6)
            .attr("cy", submarine.submarineWidht/2)
            .attr("r", submarine.submarineWidht/15)
            .style("fill", "white");

};


function updateSubmarines(submarine){

        var randomSubmarine;

        do{
          randomSubmarine = submarineList[Math.floor(Math.random() * submarineList.length)];
          
        }while(randomSubmarine.submarineID === submarine.submarineID);

        randomResize(randomSubmarine, submarine);
        randomResize(submarine, randomSubmarine);

}

// MODIFICA LA DIMENSIONE DEL SOTTOMARINO SELEZIONATO CON QUELLA DI UN ALTRO
// PRESO RANDOM DALLA LISTA
function randomResize(submarine, submarineToCopy){

        // MODIFICA WIDTH ED HEIGHT DELL' SVG
        d3.select("#"+submarine.submarineID+"_svg")
          .transition()
          .delay(0)
          .duration(1000)
          .attr("width", submarineToCopy.submarineWidht)
          .attr("height", submarineToCopy.submarineWidht);

        // MODIFICA L'ELLISSE DEL SOTTOMARINO
        d3.select("#"+submarine.submarineID+"_ellipse_area")
          .transition()
          .delay(100)
          .duration(1000)
          .attr("cx", submarineToCopy.submarineWidht / 2)
          .attr("cy", submarineToCopy.submarineWidht / 2)
          .attr("rx", submarineToCopy.submarineWidht / 2)
          .attr("ry", submarineToCopy.submarineWidht / 5.5)
          .attr("fill", submarineToCopy.primaryColor);

        // MODIFICA LA BASE DELLA TORRETTA
        d3.select("#"+submarine.submarineID+"_rect_area")
          .transition()
          .delay(100)
          .duration(1000)
          .attr("x", submarineToCopy.submarineWidht / 2.6)
          .attr("y", submarineToCopy.submarineWidht / 3.6)
          .attr("width", submarineToCopy.submarineWidht / 4)
          .attr("height", submarineToCopy.submarineWidht / 10)
          .attr("rx", submarineToCopy.submarineWidht / 10)
          .attr("fill", submarineToCopy.primaryColor)
          .attr("opacity", 0.7);


        // MODIFICA TORRETTA

        var turretHeightNormalize = submarineToCopy.turretHeight*(submarineToCopy.submarineWidht/100);

        d3.select("#"+submarine.submarineID+"_turret_area")
          .transition()
          .delay(100)
          .duration(1000)
          .attr("width", submarineToCopy.submarineWidht/50)
          .attr("height", turretHeightNormalize)
          .attr("fill", submarineToCopy.primaryColor)
          .attr("transform", function(d, i) {
              return "translate("+ submarineToCopy.submarineWidht/2 +","+((submarineToCopy.submarineWidht/3.59) - turretHeightNormalize)+")";
          });

        // MODIFICA NOME
        d3.select("#"+submarine.submarineID+"_name")
          .transition()
          .delay(100)
          .duration(1000)
          .attr("x", submarineToCopy.submarineWidht/1.6)
          .attr("y", submarineToCopy.submarineWidht/2.5)
          .attr("stroke", "white")
          .attr("font-family", "sans-serif")
          .attr("font-size", submarineToCopy.submarineWidht/28+"px")
          .text("INFOVIS");


        // MODIFICA ELICA

        d3.select("#"+submarine.submarineID+"_elica_top")
          .transition()
          .delay(100)
          .duration(1000)
          .attr("points", (submarineToCopy.submarineWidht-10)+","+submarineToCopy.submarineWidht/2.76+","+(submarineToCopy.submarineWidht-10)+","+submarineToCopy.submarineWidht/2+","+submarineToCopy.submarineWidht/2.5+","+submarineToCopy.submarineWidht/2)
          .style("fill", submarineToCopy.primaryColor)
          .attr("opacity", 0.7);

        d3.select("#"+submarine.submarineID+"_elica_bottom")
          .transition()
          .delay(100)
          .duration(1000)
          .attr("points", (submarineToCopy.submarineWidht-10)+","+submarineToCopy.submarineWidht/1.55+","+(submarineToCopy.submarineWidht-10)+","+submarineToCopy.submarineWidht/2+","+submarineToCopy.submarineWidht/2.5+","+submarineToCopy.submarineWidht/2)
          .style("fill", submarineToCopy.primaryColor)
          .attr("opacity", 0.7);


        // MODIFICA OBLO

        d3.select("#"+submarine.submarineID+"_oblo_dx")
          .transition()
          .delay(100)
          .duration(1000)
          .attr("cx", submarineToCopy.submarineWidht/2)
          .attr("cy", submarineToCopy.submarineWidht/2)
          .attr("r", submarineToCopy.submarineWidht/25)
          .style("fill", "white");
            

        d3.select("#"+submarine.submarineID+"_oblo_sx")
          .transition()
          .delay(100)
          .duration(1000)
          .attr("cx", submarineToCopy.submarineWidht/3.6)
          .attr("cy", submarineToCopy.submarineWidht/2)
          .attr("r", submarineToCopy.submarineWidht/15)
          .style("fill", "white");
            
}


// CREA UN IDENTIFICATIVO RANDOM COMPOSTO DI SOLE LETTERE
function makeid(length) {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
}


// FUNZIONE DI INIZIALIZZAZIONE
function initialize(){

      submarinesJson.forEach(submarine =>{
        submarine.submarineID = makeid(10);
        drawSubmarines(submarine);
        submarineList.push(submarine);
      })
}

initialize();


