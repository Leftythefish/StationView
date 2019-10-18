﻿var obj;

const query = `
  query {
    stop(id: "HSL:2314601") {
    name
      stoptimesWithoutPatterns {
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
        console.dir(json.data)
        let data = json.data;
        console.log(data.stop.name);
        let next = json.data.stop.stoptimesWithoutPatterns;
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
            // vertaa aikoja tässä välissä            
            var minutes = diff_minutes(date, nyt);
            console.log( minutes + " min");
            // vertaus loppuu

            //aja tavarat HTML:ään
            document.getElementById("metrolista").innerHTML +=
            "<tr>"
                + "<td>" + formattedTime + "</td>"
                + "<td>" + minutes + " min" + "</td>"
                + "</tr>";
            //lopeta ajaminen

        }
    })
        .catch(err => console.dir(err));
}


function diff_minutes(dt2, dt1) {

    var diff = (dt2.getTime() - dt1.getTime()) / 1000;
    diff /= 60;
    return Math.abs(Math.round(diff));
}



