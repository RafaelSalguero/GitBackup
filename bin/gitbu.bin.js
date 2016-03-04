#!/usr/bin/env node
var fs = require("fs");
var path = require("path");
var args = process.argv.slice(2);

if (args.length == 0) {
    console.log(" - gitbu b");
    console.log("      create a backup of the current git repository");

    console.log();
    console.log(" - gitbu r");
    console.log("      search for the first *.bundle file in current directory and restore the repository");

    console.log();
    console.log("Restore the backup file with pure git:");
    console.log('git clone "backup.bundle" "projectName"');
}

//*********************************************************************************

//exec: takes an array of console commands and executes synchronously
var exec = (x, supressOut) => x.forEach(y=> {
    var r = require('child_process').execSync(y, { encoding: "utf8" }); if (r != null && r != "" && !supressOut) console.log(r);
});




if (args[0] == "b") {
    //check if this folder is a valid git repository:
    try {
        exec(["git status"], true);

        var now = new Date();
        var fileName = "backup "
            + now.getFullYear()
            + "-" + (now.getMonth() + 1) + "-" + (now.getDay()) + " "
            + (now.getHours()) + "-" + (now.getMinutes()) + ".bundle";


        exec([
            'git bundle create "' + fileName + '" --all'
        ]);
    }
    catch (err) {
        console.log("back up failed");
    }
}
else if (args[0] == "r") {
    var files = fs.readdirSync(".").filter(x=> path.extname(x) == ".bundle");
    if (files.length == 0) {
        console.log(".bundle file not found in current directory");
    }
    else if (files.length > 1) {
        console.log("There are more than one .bundle files: \n" + files.map(x=> " - " + x + "\n").reduce ((a,b) => a+b));
    }
    else {
        var f = files[0];
        var name = f.substr(0, f.length - ".bundle".length);

        exec(['git clone "' + f + '" "' + name + '"']);
    }
}