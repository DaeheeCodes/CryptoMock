
//make map of all current holdings
export  function currentHoldingGetter(data) {
  const holdings = new Map();
  //null value check for react.
  if (data) {
    data.map(datum => {
      if (datum.type == "BUY") {
        if (holdings.get(datum.symbol)) {
          var temp = holdings.get((datum.symbol))
          holdings.set(datum.symbol, temp + (datum.volume))
        }
        else {
          holdings.set(datum.symbol, datum.volume)
        }
      }
      if (datum.type == "SELL") {
        var temp = holdings.get((datum.symbol))
        holdings.set(datum.symbol, temp - (datum.volume))
      }
    }
    )
  }
    return holdings;
  }

  // parse csv "history" into object(json like) data
  export  function csvParse(str, delimiter = ",") {
    //null value check for react.
  if (str) {
    const headers = str.slice(0, str.indexOf("\n")).split(delimiter);
  
    const rows = str.slice(str.indexOf("\n") + 1).split("\n");
  
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