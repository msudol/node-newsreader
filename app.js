/**
 * node-newsreader - As a school assignment, developer a newsreader utility that can read RSS feeds and display in a readable format on screen. 
 * @license MIT
 *
 *  https://github.com/msudol/node-newsreader
 */
 
'use strict';

// required modules are all loaded from classes in the /src dir

// get config values
const config = require('./config/config.js');

// get our cli and reader classes
const CLI = require('./src/cli.js');
const Reader = require('./src/reader.js');

// set instances
let cli = new CLI(config.prefix);
let reader = new Reader(config.url);

// call whenever the prompt is needed
function prompt() {
    cli.rl.prompt();
};

// send to reader later as callback function
function log(data) {
    console.log(data);
    prompt();
};

// show the CLI Menu on app init.
cli.showMenu();

// pull RSS on app init.
reader.pull(log);

// line event - basically creates a stream cli
cli.rl.on('line', function(input) {

    // accept upper and lower input
    let line = input.toLowerCase();
    
    // close if user types quit
    if (line === "quit" || line === "q") {
        cli.rl.close();
    } 

    // pull feed
    else if (line.startsWith("pull")) {
        reader.pull(log);
    }   

    // show titles
    else if (line.startsWith("titles")) {
        reader.titles(log);
    }   

    // read title
    else if ((line === "read") || (line.startsWith("read "))) {
        // split on first space, everything after is considered the args
        let args = input.split(/ (.+)/)[1];
        reader.read(args, log);   
    }  

    // open title in browser
    else if ((line === "open") || (line.startsWith("open "))) {
        // split on first space, everything after is considered the args
        let args = input.split(/ (.+)/)[1];
        reader.open(args, log); 
    }

    // help menu
    else if (line.startsWith("?") || line.startsWith("help")) {
        cli.showMenu();
        prompt();
    }   

    // prompt again
    else {   
        console.log("> Unknown command");
        prompt();
    }
    
});

