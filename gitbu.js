console.log("Run this file with node to create a backup of the current git repository");
console.log("Restore the backup file with the command:");
console.log('git clone "backup.bundle" "projectName');
//*********************************************************************************

//exec: takes an array of console commands and executes synchronously
var exec = (x) => x.forEach(y=> { 
    var r = require('child_process').execSync(y, {encoding: "utf8" } ); if (r != null && r != "") console.log(r);
});

var now = new Date();
var fileName = "backup " 
+ now.getFullYear() 
+ "-" + (now.getMonth() + 1) + "-" + (now.getDay()) + " " 
+ (now.getHours()) + "-" + (now.getMinutes()) + ".bundle";


 exec([
     'git bundle create "'  + fileName + '" --all'
 ]);