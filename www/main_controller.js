
// VARIABILE CHE MEMORIZZA LA LISTA DI TUTTI I SOTTOMARINI CHE SARANNO LETTI DAL FILE ESTERNO
var submarineList = [];

// FUNZIONE CHE DISEGNA UN SINGOLO SOTTOMARINO USANDO I DATI RICEVUTI COME PARAMETRI
function drawSubmarines(submarine){
        
        /**
         *  INIZIALIZZA L'SVG DEL SINGOLO SOTTOMARINO 
         * */

        d3.select("html")
          .style("height", "100%")
          .style("width", "100%")

        d3.select("body")
            .style("height", "100%")
            .style("width", "100%")


        var svg = d3.select("body")
            .append("svg")
            .attr("id", submarine.submarineID+"_svg")
            .attr("width", submarine.submarineWidht)
            .attr("height", submarine.submarineWidht)
            .style("position", "absolute")
            .style("margin", "auto")
            .style("left", submarine.submarineX+"px")
            .style("top", submarine.submarineY+"px");


        var g = svg.append("g")
            .attr("transform", function(d, i) {
                    return "translate(0,0)";
            });


        // CHIAMA LA FUNZIONE randomResize AL CLICK
        g.on("click", function() {
            updateSubmarines(submarine);
        })

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

// PRENDE RANDOM UN SOTTOMARINO DAI 9 RIMANENTI E SOSTITUISCE LE SUE
// SPECIFICHE (COLORE, DIMENSIONE, ALTEZZA DELLA TORRETTE) CON QUELLE 
// DEL SOTTOMARINO SELEZIONATO
function updateSubmarines(submarine){

        var randomSubmarine;

        var randomIndex;
        var submarineIndex = submarineList.findIndex(item => submarine.submarineID === item.submarineID);

        do{
          randomIndex = Math.floor(Math.random() * submarineList.length);
          randomSubmarine = submarineList[randomIndex];
          
        }while(randomSubmarine.submarineID === submarine.submarineID);

        randomResize(randomSubmarine, submarine);
        randomResize(submarine, randomSubmarine);


        // Aggiorna i due sottomarini nella lista con le caratteristiche appena aggiornate.
        // Se non facessi questo avrei un disallineamento tra ciò che vedo sulla grafica
        // (sottomarini con le caratteristiche aggiornate dopo lo scambio con quelle di un altro)
        // e ciò che invece è salvato sulla lista (sottomarini con le caratteristiche originali). 

        submarineList.splice(randomIndex, 1);
        submarineList.splice(submarineIndex, 1);

        var oldSubmarine = JSON.parse(JSON.stringify(submarine));

        submarine.submarineWidht = randomSubmarine.submarineWidht;
        submarine.turretHeight = randomSubmarine.turretHeight;
        submarine.primaryColor = randomSubmarine.primaryColor;

        randomSubmarine.submarineWidht = oldSubmarine.submarineWidht;
        randomSubmarine.turretHeight = oldSubmarine.turretHeight;
        randomSubmarine.primaryColor = oldSubmarine.primaryColor;

        submarineList.push(submarine);
        submarineList.push(randomSubmarine);

}

// MODIFICA LA CARATTERISTICHE DEI DUE SOTTOMARINI
// RICEVUTI COME PARAMETRI
function randomResize(submarine, submarineToCopy){

        // MODIFICA WIDTH ED HEIGHT DELL' SVG
        svg = d3.select("#"+submarine.submarineID+"_svg")
          .transition()
          .delay(100)
          .duration(500)
          .attr("width", submarineToCopy.submarineWidht)
          .attr("height", submarineToCopy.submarineWidht);

        // MODIFICA L'ELLISSE DEL SOTTOMARINO
        d3.select("#"+submarine.submarineID+"_ellipse_area")
          .transition()
          .delay(100)
          .duration(500)
          .attr("cx", submarineToCopy.submarineWidht / 2)
          .attr("cy", submarineToCopy.submarineWidht / 2)
          .attr("rx", submarineToCopy.submarineWidht / 2)
          .attr("ry", submarineToCopy.submarineWidht / 5.5)
          .attr("fill", submarineToCopy.primaryColor);

        // MODIFICA LA BASE DELLA TORRETTA
        d3.select("#"+submarine.submarineID+"_rect_area")
          .transition()
          .delay(100)
          .duration(500)
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
          .duration(500)
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
          .duration(500)
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
          .duration(500)
          .attr("points", (submarineToCopy.submarineWidht-10)+","+submarineToCopy.submarineWidht/2.76+","+(submarineToCopy.submarineWidht-10)+","+submarineToCopy.submarineWidht/2+","+submarineToCopy.submarineWidht/2.5+","+submarineToCopy.submarineWidht/2)
          .style("fill", submarineToCopy.primaryColor)
          .attr("opacity", 0.7);

        d3.select("#"+submarine.submarineID+"_elica_bottom")
          .transition()
          .delay(100)
          .duration(500)
          .attr("points", (submarineToCopy.submarineWidht-10)+","+submarineToCopy.submarineWidht/1.55+","+(submarineToCopy.submarineWidht-10)+","+submarineToCopy.submarineWidht/2+","+submarineToCopy.submarineWidht/2.5+","+submarineToCopy.submarineWidht/2)
          .style("fill", submarineToCopy.primaryColor)
          .attr("opacity", 0.7);


        // MODIFICA I DUE OBLO

        d3.select("#"+submarine.submarineID+"_oblo_dx")
          .transition()
          .delay(100)
          .duration(500)
          .attr("cx", submarineToCopy.submarineWidht/2)
          .attr("cy", submarineToCopy.submarineWidht/2)
          .attr("r", submarineToCopy.submarineWidht/25)
          .style("fill", "white");
            

        d3.select("#"+submarine.submarineID+"_oblo_sx")
          .transition()
          .delay(100)
          .duration(500)
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


