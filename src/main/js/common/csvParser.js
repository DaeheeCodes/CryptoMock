function csvToArray(str, delimiter = ",") {

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