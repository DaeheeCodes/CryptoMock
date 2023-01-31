import { private_excludeVariablesFromRoot } from "@mui/material";

//make map of all current holdings
export  function currentHoldingGetter(data) {
  const holdings = new Map();
  //null value check for react.
  if (data) {
    data.map(datum => {
      if (datum.type == "BUY") {
        if (holdings.get(datum.symbol)) {
          var temp = holdings.get(datum.symbol)
          holdings.set(datum.symbol, (Number(temp) + Number(datum.volume)))
        }
        else {
          holdings.set(datum.symbol, datum.volume)
        }
      }
      if (datum.type == "SELL") {
        var temp = holdings.get((datum.symbol))
        holdings.set(datum.symbol, (Number(temp) - Number((datum.volume))))
      }
    }
    )
  }
    return holdings;
  }

  export function currentAssetGetter(data, price) {
    let myKeys = [];
    let total = 0;
    data.forEach((value, key) => myKeys.push(key));

    for ( let i = 0; i < myKeys.length; i++) {
     let placeholders = price;
      var temp = placeholders.filter (placeholder =>
       myKeys[i].includes(placeholder.symbol) )
       //console.log(temp)
       //console.log(temp.lastPrice);

try {
        // console.log(temp[0].lastPrice)
       total += (parseInt(temp[0].lastPrice) * (data.get(myKeys[i])));
    }
  catch (error) {
    console.log(error)
  }
  }
    return Math.ceil(total * 1000) / 1000;
  }

  // parse csv "history" into object(json like) data
  export  function csvParse(str, delimiter = ",") {
    //null value check for react.
  if (str) {
    const headers = str.slice(0, str.indexOf("*")).split(delimiter);
  
    const rows = str.slice(str.indexOf("*") + 1).split("*");
  
    const arr = rows.map(function(row) {
      const values = row.split(delimiter);
      const el = headers.reduce(function(object, header, index) {
        object[header] = values[index];
        return object;
      }, {});
      return el;
    });

    // return the array
    return arr;
  }
  return null;
  }


