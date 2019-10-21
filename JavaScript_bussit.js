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
                    console.log("Metro ID " + id);
                    let next = stops[i].stoptimesWithoutPatterns;
                    for (var x = 0; x < next.length; x++) {
                        console.log(next[i].headsign)
                        var unixtime = parseInt(next[x].scheduledArrival) + parseInt(next[x].serviceDay);
                        var date = new Date(unixtime * 1000);
                        var hours = date.getHours();
                        var minutes = "0" + date.getMinutes();
                        var formattedTime = hours + ':' + minutes.substr(-2);
                        console.log(formattedTime);
                        var nyt = new Date();
                        console.log(nyt);
                        var minutes = diff_minutes(date, nyt);
                        console.log(minutes + " min");
                        document.getElementById("metrolista").innerHTML +=
                            "<tr>"
                            + "<td>" + formattedTime + "</td>"
                            + "<td>" + minutes + " min" + "</td>"
                            + "</tr>";
                    }
                    break;
                case 'HSL:2314210':
                    console.log("B1" + id);
                    let d1 = stops[i].patterns;
                    for (var a = 0; a < d1.length; a++) {
                        console.log(d1[a].route.shortName);
                    }
                    let d2 = stops[i].stoptimesWithoutPatterns;
                    for (var b = 0; b < d2.length; b++) {
                        console.log("laituri:" + d2[b].stop.platformCode + ":" + d2[b].trip.routeShortName);
                        var unixtime = parseInt(d2[b].scheduledArrival) + parseInt(d2[b].serviceDay);
                        var date = new Date(unixtime * 1000);
                        var hours = date.getHours();
                        var minutes = "0" + date.getMinutes();
                        var formattedTime = hours + ':' + minutes.substr(-2);
                        console.log(formattedTime);
                        var nyt = new Date();
                        console.log(nyt);
                        var minutes = diff_minutes(date, nyt);
                        console.log(minutes + " min");
                        document.getElementById("bussilista").innerHTML +=
                            "<tr>"
                        + "<td>" + "laituri:" + d2[b].stop.platformCode + " linja: " + d2[b].trip.routeShortName + "</td>"
                            + "<td>" + formattedTime + "</td>"
                            + "<td>" + minutes + " min" + "</td>"
                            + "</tr>";
                    }

                    break;

                default:
                    console.log("ID " + id);
                    break;
            }       
                        //console.log(linjat);
        }

    })
        .catch(err => console.dir(err));
}

function diff_minutes(dt2, dt1) {

    var diff = (dt2.getTime() - dt1.getTime()) / 1000;
    diff /= 60;
    return Math.abs(Math.round(diff));
}



