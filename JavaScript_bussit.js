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
            if (id === "HSL:2314602" || id === "HSL:2314601") {
                console.log("Metro ID " + id);
                let next = stops[i].stoptimesWithoutPatterns;
                for (var i = 0; i < next.length; i++) {
                    console.log(next[i].headsign)
                    var unixtime = parseInt(next[i].scheduledArrival) + parseInt(next[i].serviceDay);
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
            }
            else {
                console.log("pysäkin ID " + id);
            }

            //console.log(linjat);
        }
        //let next = json.data.stop.stoptimesWithoutPatterns;
        //for (var i = 0; i < next.length; i++) {
        //    console.log(next[i].headsign)          
        //    var unixtime = parseInt(next[i].scheduledArrival) + parseInt(next[i].serviceDay);
        //    var date = new Date(unixtime * 1000);
        //    var hours = date.getHours();
        //    var minutes = "0" + date.getMinutes();
        //    var formattedTime = hours + ':' + minutes.substr(-2);
        //    console.log(formattedTime);
        //    var nyt = new Date();
        //    console.log(nyt);
        //    // vertaa aikoja tässä välissä            
        //    var minutes = diff_minutes(date, nyt);
        //    console.log( minutes + " min");
        //    // vertaus loppuu

        //    //aja tavarat HTML:ään
        //    document.getElementById("metrolista").innerHTML +=
        //    "<tr>"
        //        + "<td>" + formattedTime + "</td>"
        //        + "<td>" + minutes + " min" + "</td>"
        //        + "</tr>";
        //    //lopeta ajaminen

        //}
    })
        .catch(err => console.dir(err));
}

function diff_minutes(dt2, dt1) {

    var diff = (dt2.getTime() - dt1.getTime()) / 1000;
    diff /= 60;
    return Math.abs(Math.round(diff));
}



