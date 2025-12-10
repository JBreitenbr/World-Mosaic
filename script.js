const svg = d3.select("#worldmap");
const width = +svg.attr("width");
const height = +svg.attr("height");
let toolTip=d3.select("#tooltip");
const projection = d3.geoNaturalEarth1()
      .translate([width / 2.35, height / 3])
      .scale(90);
let arr=
[{"id":1,"country":"Japan","city":"Kyoto","lon":135.75,"lat":35.02,"population":1463723,"tz":"Asia/Tokyo"},
{"id":2,"country":"Indien","city":"Lucknow","lon":80.95,"lat":26.85,"population":4132670,"tz":"Asia/Calcutta"},
{"id":3,"country":"Oman","city":"Sur","lon":59.54,"lat":22.57,"population":122533,"tz":"Asia/Muscat"},
{"id":4,"country":"Äthiopien","city":"Addis Abeba","lon":38.75,"lat":9.00,"population":5956680,"tz":"Africa/Addis_Ababa"},
{"id":5,"country":"Griechenland","city":"Thessaloniki","lon":22.93,"lat":40.64,"population":815472,"tz":"Europe/Athens"},
{"id":6,"country":"Italien","city":"Perugia","lon":12.39,"lat":43.11,"population":162467,"tz":"Europe/Rome"},
{"id":7,"country":"Deutschland","city":"München","lon":11.58,"lat":48.14,"population":1604384,"tz":"Europe/Berlin"},
{"id":8,"country":"Niederlande","city":"Amsterdam","lon":4.89,"lat":52.37,"population":935793,"tz":"Europe/Amsterdam"},
{"id":9,"country":"Portugal","city":"Lissabon", "lon":-9.15,"lat":38.73,"population":575739,"tz":"Europe/Lisbon"},
{"id":10,"country":"Marokko","city":"Casablanca","lon":-7.61,"lat":33.59,"population":3218036,"tz":"Africa/Casablanca"},
{"id":11,"country":"Senegal","city":"Saint Louis","lon":-16.45,"lat":16.05,"population":254171,"tz":"Africa/Dakar"},
{"id":12,"country":"Brasilien","city":"São Paulo","lon":-46.63,"lat":-23.53,"population":11895578,"tz":"America/Sao_Paulo"},
{"id":13,"country":"Mexiko","city":"Oaxaca","lon":-96.24,"lat":16.92,"population":270955,"tz":"America/Mexico_City"},
{"id":14,"country":"USA","city":"Portland (Oregon)","lon":-122.68,"lat":45.52,"population":652503,"tz":"America/Los_Angeles"}];
    const path = d3.geoPath().projection(projection);

    // Daten laden (TopoJSON -> GeoJSON)
    d3.json("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json")
      .then(worldData => {
        const countries = topojson.feature(worldData, worldData.objects.countries).features;

        svg.append("g")
          .selectAll("path")
          .data(countries)
          .join("path")
          .attr("d", path)
          .attr("fill", "#d9c9a3")   // sandiges Land
          .attr("stroke", "#333") // dezente Grenzen
          .attr("stroke-width", 0.5);   
      let mouseover=(d,i)=>{
     toolTip.style("visibility","visible").style("top",event.pageY-30+"px").style("left",width/2+20+"px").html("Land: "+i["country"]+"<br>"+"Stadt: "+i["city"]+"<br>"+"Einwohner: "+i["population"]+"<br><br>"+"Datum : "+new Date().toLocaleDateString('de-DE',{timeZone:i["tz"]})+"<br>"+"Uhrzeit: "+new Date().toLocaleTimeString('de-DE',{timeZone:i["tz"]}));
      }
        svg.selectAll("circle").data(arr).enter().append("circle").attr("cx",(item)=>projection([item["lon"],item["lat"]])[0]).attr("cy",(item)=>projection([item["lon"],item["lat"]])[1]).attr("r",2).attr("fill","#714342").attr("stroke","#000").attr("opacity",0.7).attr("stroke-width",0.5).on("mouseover",mouseover).on("mouseleave",()=>{toolTip.style("visibility","hidden")});
      })
      .catch(err => {
        console.error("Fehler beim Laden der Weltkarte:", err);
      });
