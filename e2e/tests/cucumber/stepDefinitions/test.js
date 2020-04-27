var d = new Date().toLocaleString();
d = d.slice(0, 15)+d.slice(20);
var folderName = d.replace(/\//g, '_').replace(/:/g, '.').replace(/,/g, '-').replace(/\s/g, '_');



console.log(folderName)

