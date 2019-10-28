var obj;

const query = `
  query {
  stops(name: "matinkylä") {
    name
    gtfsId
    patterns {
      headsign
      route {
        gtfsId
        shortName
        longName
        mode
      }
    }
    stoptimesWithoutPatterns {
      stop {
        platformCode
      }
      trip {
        gtfsId
        routeShortName
      }
      scheduledArrival
      realtimeArrival
      arrivalDelay
      scheduledDeparture
      realtimeDeparture
      departureDelay
      realtime
      realtimeState
      serviceDay
      headsign
    }
  }
}
`;
const url = "https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql";
const opts = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query })
};


var a = setInterval(metrot, 120000);


function metrot() { 
    document.getElementById("metrolista").innerHTML = "";
    document.getElementById("bussilista").innerHTML = "";

    var bussilista = [];
    var bussilistayli10 = [];


    fetch(url, opts)
        .then(res => res.json(res))
        .then(json => {
            //console.dir(json.data)
            let data = json.data;
            //console.log(data);
            let stops = json.data.stops;
            console.log(stops);
            for (var i = 0; i < stops.length; i++) {
                //let linjat = stops[i].stoptimesWithoutPatterns;
                let id = stops[i].gtfsId;
                switch (id) {
                    case 'HSL:2314601':
                        //console.log("Metro ID " + id);
                        let next = stops[i].stoptimesWithoutPatterns;
                        for (var x = 0; x < next.length; x++) {
                            //console.log(next[i].headsign)
                            var unixtime = parseInt(next[x].scheduledArrival) + parseInt(next[x].serviceDay);
                            var date = new Date(unixtime * 1000);
                            var hours = date.getHours();
                            var minutes = "0" + date.getMinutes();
                            var formattedTime = hours + ':' + minutes.substr(-2);
                            var nyt = new Date();
                            var minutes = diff_minutes(date, nyt);
                            document.getElementById("metrolista").innerHTML +=
                                "<tr>"
                                + "<td>" + formattedTime + "</td>"
                                + "<td>" + minutes + " min" + "</td>"
                                + "</tr>";
                        }
                        break;
                    case 'HSL:2314210':
                        //console.log("B1" + id);
                        //let da10 = stops[i].patterns;
                        //for (var a = 0; a < da10.length; a++) {
                        //    console.log(da10[a].route.shortName);
                        //}
                        let d10 = stops[i].stoptimesWithoutPatterns;
                        for (var b = 0; b < d10.length; b++) {
                            //console.log("laituri:" + d10[b].stop.platformCode + ":" + d10[b].trip.routeShortName);
                            var unixtime = parseInt(d10[b].scheduledArrival) + parseInt(d10[b].serviceDay);
                            var date = new Date(unixtime * 1000);
                            var hours = date.getHours();
                            var minutes = "0" + date.getMinutes();
                            var formattedTime = hours + ':' + minutes.substr(-2);
                            var nyt = new Date();
                            var minutes = diff_minutes(date, nyt);
                            //document.getElementById("bussilista").innerHTML +=
                            //    "<tr>"
                            //    + "<td>" + "LAITURI " + d10[b].stop.platformCode + " : " + d10[b].trip.routeShortName + "</td>"
                            //    + "<td>" + formattedTime + "</td>"
                            //    + "<td>" + minutes + " min" + "</td>"
                            //    + "</tr>";
                            if (minutes < 60) {
                                if (minutes < 10) {
                            bussilista.push("<tr>"
                                + "<td>" +  d10[b].trip.routeShortName + "</td>"
                                + "<td>" + formattedTime + "</td>"
                                + "<td>" + minutes + " min" + "</td><td>" +  d10[b].stop.platformCode +  "</td>"
                                + "</tr>");
                                }
                                else {
                                    bussilistayli10.push("<tr>"
                                        + "<td>" + d10[b].trip.routeShortName + "</td>"
                                        + "<td>" + formattedTime + "</td>"
                                        + "<td>" + minutes + " min" + "</td><td>"+ d10[b].stop.platformCode +  "</td>"
                                        + "</tr>");
                                }
                            }
                    }
                    break;
                case 'HSL:2314211':
                    //console.log("B2" + id);
                    //let da11 = stops[i].patterns;
                    //for (var a = 0; a < da11.length; a++) {
                    //    console.log(da11[a].route.shortName);
                    //}
                    let d11 = stops[i].stoptimesWithoutPatterns;
                    for (var b = 0; b < d11.length; b++) {
                        //console.log("laituri:" + d11[b].stop.platformCode + ":" + d11[b].trip.routeShortName);
                        var unixtime = parseInt(d11[b].scheduledArrival) + parseInt(d11[b].serviceDay);
                        var date = new Date(unixtime * 1000);
                        var hours = date.getHours();
                        var minutes = "0" + date.getMinutes();
                        var formattedTime = hours + ':' + minutes.substr(-2);
                        var nyt = new Date();
                        var minutes = diff_minutes(date, nyt);
                        //document.getElementById("bussilista").innerHTML +=
                        //    "<tr>"
                        //    + "<td>" + "LAITURI " + d11[b].stop.platformCode + " : " + d11[b].trip.routeShortName + "</td>"
                        //    + "<td>" + formattedTime + "</td>"
                        //    + "<td>" + minutes + " min" + "</td>"
                        //    + "</tr>";
                        if (minutes < 60) {
                            if (minutes < 10) {

                        bussilista.push("<tr>"
                            + "<td>" + d11[b].trip.routeShortName + "</td>"
                            + "<td>" + formattedTime + "</td>"
                            + "<td>" + minutes + " min" + "</td><td>" +  d11[b].stop.platformCode + "</td>"
                            + "</tr>");

                            }
                            else {
                                bussilistayli10.push("<tr>"
                                    + "<td>" + d11[b].trip.routeShortName + "</td>"
                                    + "<td>" + formattedTime + "</td>"
                                    + "<td>" + minutes + " min" + "</td><td>" + d11[b].stop.platformCode + "</td>"
                                    + "</tr>");
                            }
                        }
                    }
                    break;
                case 'HSL:2314212':
                    //console.log("B3" + id);
                    //let da12 = stops[i].patterns;
                    //for (var a = 0; a < da12.length; a++) {
                    //    console.log(da12[a].route.shortName);
                    //}
                    let d12 = stops[i].stoptimesWithoutPatterns;
                    for (var b = 0; b < d12.length; b++) {
                        //console.log("laituri:" + d12[b].stop.platformCode + ":" + d12[b].trip.routeShortName);
                        var unixtime = parseInt(d12[b].scheduledArrival) + parseInt(d12[b].serviceDay);
                        var date = new Date(unixtime * 1000);
                        var hours = date.getHours();
                        var minutes = "0" + date.getMinutes();
                        var formattedTime = hours + ':' + minutes.substr(-2);
                        var nyt = new Date();
                        var minutes = diff_minutes(date, nyt);
                        //document.getElementById("bussilista").innerHTML +=
                        //    "<tr>"
                        //    + "<td>" + "LAITURI " + d12[b].stop.platformCode + " : " + d12[b].trip.routeShortName + "</td>"
                        //    + "<td>" + formattedTime + "</td>"
                        //    + "<td>" + minutes + " min" + "</td>"
                        //    + "</tr>";
                        if (minutes < 60) {
                            if (minutes < 10) {

                        bussilista.push("<tr>"
                            + "<td>"  + d12[b].trip.routeShortName + "</td>"
                            + "<td>" + formattedTime + "</td>"
                            + "<td>" + minutes + " min" + "</td><td>" + d12[b].stop.platformCode + "</td>"
                            + "</tr>");
                            }
                            else {
                                bussilistayli10.push("<tr>"
                                    + "<td>" + d12[b].trip.routeShortName + "</td>"
                                    + "<td>" + formattedTime + "</td>"
                                    + "<td>" + minutes + " min" +  "</td><td>" +  d12[b].stop.platformCode +  "</td>"
                                    + "</tr>");                            }
                        }
                    }
                    break;
                case 'HSL:2314213':
                    //console.log("B4" + id);
                    //let da13 = stops[i].patterns;
                    //for (var a = 0; a < da13.length; a++) {
                    //    console.log(da13[a].route.shortName);
                    //}
                    let d13 = stops[i].stoptimesWithoutPatterns;
                    for (var b = 0; b < d13.length; b++) {
                        //console.log("laituri:" + d13[b].stop.platformCode + ":" + d13[b].trip.routeShortName);
                        var unixtime = parseInt(d13[b].scheduledArrival) + parseInt(d13[b].serviceDay);
                        var date = new Date(unixtime * 1000);
                        var hours = date.getHours();
                        var minutes = "0" + date.getMinutes();
                        var formattedTime = hours + ':' + minutes.substr(-2);
                        var nyt = new Date();
                        var minutes = diff_minutes(date, nyt);
                        //document.getElementById("bussilista").innerHTML +=
                        //    "<tr>"
                        //    + "<td>" + "LAITURI " + d13[b].stop.platformCode + " : " + d13[b].trip.routeShortName + "</td>"
                        //    + "<td>" + formattedTime + "</td>"
                        //    + "<td>" + minutes + " min" + "</td>"
                        //    + "</tr>";
                        if (minutes < 60) {
                            if (minutes < 10) {

                        bussilista.push("<tr>"
                            + "<td>"  + d13[b].trip.routeShortName + "</td>"
                            + "<td>" + formattedTime + "</td>"
                            + "<td>" + minutes + " min" + "</td><td>" + d13[b].stop.platformCode + "</td>"
                            + "</tr>");
                            }
                            else {
                                bussilistayli10.push("<tr>"
                                    + "<td>" + d13[b].trip.routeShortName + "</td>"
                                    + "<td>" + formattedTime + "</td>"
                                    + "<td>" + minutes + " min" +  "</td><td>" + d13[b].stop.platformCode + "</td>"
                                    + "</tr>");
                            }
                        }
                    }
                    break;

                case 'HSL:2314214':
                    //console.log("B4" + id);
                    //let da14 = stops[i].patterns;
                    //for (var a = 0; a < da14.length; a++) {
                    //    console.log(da14[a].route.shortName);
                    //}
                    let d14 = stops[i].stoptimesWithoutPatterns;
                    for (var b = 0; b < d14.length; b++) {
                        //console.log("laituri:" + d14[b].stop.platformCode + ":" + d14[b].trip.routeShortName);
                        var unixtime = parseInt(d14[b].scheduledArrival) + parseInt(d14[b].serviceDay);
                        var date = new Date(unixtime * 1000);
                        var hours = date.getHours();
                        var minutes = "0" + date.getMinutes();
                        var formattedTime = hours + ':' + minutes.substr(-2);
                        var nyt = new Date();
                        var minutes = diff_minutes(date, nyt);
                        //document.getElementById("bussilista").innerHTML +=
                        //    "<tr>"
                        //    + "<td>" + "LAITURI " + d14[b].stop.platformCode + " : " + d14[b].trip.routeShortName + "</td>"
                        //    + "<td>" + formattedTime + "</td>"
                        //    + "<td>" + minutes + " min" + "</td>"
                        //    + "</tr>";
                        if (minutes < 60) {
                            if (minutes < 10) {

                        bussilista.push("<tr>"
                            + "<td>"  + d14[b].trip.routeShortName + "</td>"
                            + "<td>" + formattedTime + "</td>"
                            + "<td>" + minutes + " min" +  "</td><td>" + d14[b].stop.platformCode + "</td>"
                            + "</tr>");
                            }
                            else {
                                bussilistayli10.push("<tr>"
                                + "<td>" + d14[b].trip.routeShortName + "</td>"
                                + "<td>" + formattedTime + "</td>"
                                + "<td>" + minutes + " min" +  "</td><td>" + d14[b].stop.platformCode +"</td>"
                                + "</tr>");}
                            }
                    }
                    break;
                case 'HSL:2314215':
                    console.log("B3" + id);
                    //let da15 = stops[i].patterns;
                    //for (var a = 0; a < da15.length; a++) {
                    //    console.log(da15[a].route.shortName);
                    //}
                    let d15 = stops[i].stoptimesWithoutPatterns;
                    for (var b = 0; b < d15.length; b++) {
                        //console.log("laituri:" + d15[b].stop.platformCode + ":" + d15[b].trip.routeShortName);
                        var unixtime = parseInt(d15[b].scheduledArrival) + parseInt(d15[b].serviceDay);
                        var date = new Date(unixtime * 1000);
                        var hours = date.getHours();
                        var minutes = "0" + date.getMinutes();
                        var formattedTime = hours + ':' + minutes.substr(-2);
                        var nyt = new Date();
                        var minutes = diff_minutes(date, nyt);
                        //document.getElementById("bussilista").innerHTML +=
                        //    "<tr>"
                        //    + "<td>" + "LAITURI " + d15[b].stop.platformCode + " : " + d15[b].trip.routeShortName + "</td>"
                        //    + "<td>" + formattedTime + "</td>"
                        //    + "<td>" + minutes + " min" + "</td>"
                        //    + "</tr>";
                        if (minutes < 60) {
                            if (minutes < 10) {
                        bussilista.push("<tr>"
                            + "<td>" + d15[b].trip.routeShortName + "</td>"
                            + "<td>" + formattedTime + "</td>"
                            + "<td>" + minutes + " min" +  "</td><td>" + d15[b].stop.platformCode + "</td>"
                            + "</tr>");
                            }
                            else {
                                bussilistayli10.push("<tr>"
                                    + "<td>" + d15[b].trip.routeShortName + "</td>"
                                    + "<td>" + formattedTime + "</td>"
                                    + "<td>" + minutes + " min" +  "</td><td>" + d15[b].stop.platformCode + "</td>"
                                    + "</tr>");                            }
                        }
                    }
                    break;
                case 'HSL:2314216':
                    console.log("B3" + id);
                    //let da16 = stops[i].patterns;
                    //for (var a = 0; a < da16.length; a++) {
                    //    console.log(da16[a].route.shortName);
                    //}
                    let d16 = stops[i].stoptimesWithoutPatterns;
                    for (var b = 0; b < d16.length; b++) {
                        //console.log("laituri:" + d16[b].stop.platformCode + ":" + d16[b].trip.routeShortName);
                        var unixtime = parseInt(d16[b].scheduledArrival) + parseInt(d16[b].serviceDay);
                        var date = new Date(unixtime * 1000);
                        var hours = date.getHours();
                        var minutes = "0" + date.getMinutes();
                        var formattedTime = hours + ':' + minutes.substr(-2);
                        var nyt = new Date();
                        var minutes = diff_minutes(date, nyt);
                        //document.getElementById("bussilista").innerHTML +=
                        //    "<tr>"
                        //    + "<td>" + "LAITURI " + d16[b].stop.platformCode + " : " + d16[b].trip.routeShortName + "</td>"
                        //    + "<td>" + formattedTime + "</td>"
                        //    + "<td>" + minutes + " min" + "</td>"
                        //    + "</tr>";
                        if (minutes < 60) {
                            if (minutes < 10) {
                        bussilista.push("<tr>"
                            + "<td>" +  d16[b].trip.routeShortName + "</td>"
                            + "<td>" + formattedTime + "</td>"
                            + "<td>" + minutes + " min" +  "</td><td>" + d16[b].stop.platformCode +"</td>"
                            + "</tr>");
                            }
                            else {
                                bussilistayli10.push("<tr>"
                                    + "<td>" +  d16[b].trip.routeShortName + "</td>"
                                    + "<td>" + formattedTime + "</td>"
                                    + "<td>" + minutes + " min" +  "</td><td>" + d16[b].stop.platformCode  + "</td>"
                                    + "</tr>");
                            }
                        }
                    }
                    break;
                case 'HSL:2314218':
                    console.log("B3" + id);
                    //let da8 = stops[i].patterns;
                    //for (var a = 0; a < da8.length; a++) {
                    //    console.log(da8[a].route.shortName);
                    //}
                    let d18 = stops[i].stoptimesWithoutPatterns;
                    for (var b = 0; b < d18.length; b++) {
                        //console.log("laituri:" + d18[b].stop.platformCode + ":" + d18[b].trip.routeShortName);
                        var unixtime = parseInt(d18[b].scheduledArrival) + parseInt(d18[b].serviceDay);
                        var date = new Date(unixtime * 1000);
                        var hours = date.getHours();
                        var minutes = "0" + date.getMinutes();
                        var formattedTime = hours + ':' + minutes.substr(-2);
                        var nyt = new Date();
                        var minutes = diff_minutes(date, nyt);
                        //document.getElementById("bussilista").innerHTML +=
                        //    "<tr>"
                        //    + "<td>" + "LAITURI " + d18[b].stop.platformCode + " : " + d18[b].trip.routeShortName + "</td>"
                        //    + "<td>" + formattedTime + "</td>"
                        //    + "<td>" + minutes + " min" + "</td>"
                        //    + "</tr>";
                        if (minutes < 60) {
                            if (minutes < 10) {
                        bussilista.push("<tr>"
                            + "<td>" +  d18[b].trip.routeShortName + "</td>"
                            + "<td>" + formattedTime + "</td>"
                            + "<td>" + minutes + " min" +  "</td><td>" + d18[b].stop.platformCode + "</td>"
                            + "</tr>");
                            }
                            else {
                                bussilistayli10.push("<tr>"
                                    + "<td>"  + d18[b].trip.routeShortName + "</td>"
                                    + "<td>" + formattedTime + "</td>"
                                    + "<td>" + minutes + " min" + "</td><td>" + d18[b].stop.platformCode + "</td>"
                                    + "</tr>");
                            }
                             }
                    }
                    break;
                default:
                    //console.log("ID " + id);
                    break;
            }       
            }
            bussilista.sort(function arraysort(a, b) {
                var xp = parseInt(a.substr(34, 1));
                var yp = parseInt(b.substr(34, 1));
                return xp == yp ? 0 : xp < yp ? -1 : 1;
            });
            bussilistayli10.sort(function arraysort(a, b) {
                var xp = parseInt(a.substr(34, 2));
                var yp = parseInt(b.substr(34, 2));
                return xp == yp ? 0 : xp < yp ? -1 : 1;
            });
            console.log(bussilista);            
            //document.getElementById("bussilista").innerHTML = bussilista.join(" ");
            bussilista.splice(0, 0, '<tr><td class="ajat">REITTI</td><td class="ajat">LÄHTÖ</td><td class="ajat">MIN</td><td class="ajat">LAITURI</td></tr>');
            if (bussilista.length > 10) {
            for (var i = 0; i < 10; i++) {
                document.getElementById("bussilista").innerHTML += bussilista[i];
            }
            }
            else {
                var remaining = 10 - bussilista.length;
                for (var i = 0; i < bussilista.length; i++) {
                    document.getElementById("bussilista").innerHTML += bussilista[i];
                }
                for (var i = 0; i < remaining; i++) {
                document.getElementById("bussilista").innerHTML += bussilistayli10[i];
                }
            }

         })
        .catch(err => console.dir(err));
}

function diff_minutes(dt2, dt1) {

    var diff = (dt2.getTime() - dt1.getTime()) / 1000;
    diff /= 60;
    return Math.abs(Math.round(diff));
}





