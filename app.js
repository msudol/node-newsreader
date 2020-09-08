/**
 * node-newsreader - As a school assignment, developer a newsreader utility that can read RSS feeds and display in a readable format on screen. 
 * @license MIT
 *
 *  https://github.com/msudol/node-newsreader
 */
 
'use strict';

// get config values
const config = require('./config/config.js');

// readline to create a pseudo-CLI program
const readline = require('readline');

// create interface r1
const rl = readline.createInterface({
    input: process.stdin, 
    output: process.stdout
});

function showMenu() {
    // show menu
    console.log("=== Node-Newsreader Commands ===");
    console.log(" * quit: close this program");    
}

showMenu();

// set a prompt and to the prompt
rl.setPrompt(config.prefix);
rl.prompt();

// line event - basically creates a stream cli
rl.on('line', function(input) {
    
    // accept upper and lower input
    let line = input.toLowerCase();
    
    // close if user types quit
    if (line === "quit" || line === "q") {
        rl.close();
    } 
       
    // help menu
    else if (line.startsWith("?") || line.startsWith("help")) {
        showMenu();
        rl.prompt();
    }      
    // prompt again
    else {   
        console.log("> Unknown command");
        rl.prompt();
    }
    
});

// close event
rl.on('close',function(){
    console.log("\n> Closing... bye bye!");
    process.exit(0);
});