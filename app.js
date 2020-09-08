/**
 * node-newsreader - As a school assignment, developer a newsreader utility that can read RSS feeds and display in a readable format on screen. 
 * @license MIT
 *
 *  https://github.com/msudol/node-newsreader
 */
 
'use strict';

// get config values
const config = require('./config/config.js');

// because I want the CLI to look good
const colorReadline = require('node-color-readline');
const chalk = require('chalk');
const rl = colorReadline.createInterface({
  input: process.stdin,
  output: process.stdout,
  colorize: function (str) {
    // Make all input white
    return str.replace(/.*/g, function (match) {
        return chalk.white(match);
    });
  }
});

// rss parser
const Parser = require('rss-parser');
const parser = new Parser({
    timeout: 15000,
});

// This library will attempt to open system browser to the url provided
const open = require('open');

// JSON file, not necessary for this assignment to store the data locally, doing it all in memory but I have future plans for this code so I am adding this
const jsonfile = require('jsonfile');
const rssfile = 'store/feed.json';

// function to show a simple menu from the CLI
function showMenu() {
    console.log(chalk.inverse("=== Node-Newsreader Commands ==="));
    console.log(chalk.magentaBright(" * pull: get the latest RSS newsfeed (runs on app start)")); 
    console.log(chalk.magentaBright(" * titles: show index of news titles")); 
    console.log(chalk.magentaBright(" * read [int]: read the content snippet of title [int]"));     
    console.log(chalk.magentaBright(" * open [int]: open the feed item in your system browser"));     
    console.log(chalk.magentaBright(" * quit: close this program"));    
};

// function to pull news feed as async function, and write it to a json file store
async function pullRss() {
 
    let feed = await parser.parseURL(config.feed.url);
    console.log("> Getting Rss Feed: " + feed.title + "...");

    // going to add the current timestap to the feed object
    let d = new Date();
    let diso = d.toISOString();
    feed.date = diso;

    config.feed.store = feed;

    // for later - storing in file
    jsonfile.writeFile(rssfile, feed)
        .then(res => {
            console.log('> Done!');
            rl.prompt();
        })
        .catch(error => {
            console.error(error);
            rl.prompt();
        });

    return;
};


// function to show the titles
function showRssTitles() {

    // has the feed been pulled yet?
    if (Object.keys(config.feed.store).length === 0 && config.feed.store.constructor === Object) {
        console.log("> No feed exists, execute 'pull' first!");
    }
    else {
        let i = 0;
        // cycle through the feed object and print out the titles
        config.feed.store.items.forEach(item => {
            i++;
            console.log(chalk.yellow("[" + i + "] ") + item.title + ": " + chalk.cyan(item.link));
        });
    }

    rl.prompt();
};

// set a prompt and to the prompt
rl.setPrompt(config.prefix);

// show the CLI Menu
showMenu();

// pull RSS when the app init.
pullRss();

// line event - basically creates a stream cli
rl.on('line', function(input) {

    // accept upper and lower input
    let line = input.toLowerCase();
    
    // close if user types quit
    if (line === "quit" || line === "q") {
        rl.close();
    } 

    // pull feed
    else if (line.startsWith("pull")) {
        pullRss();
    }   

    // show titles
    else if (line.startsWith("titles")) {
        showRssTitles();
        rl.prompt();
    }   

    // read title
    else if ((line === "read") || (line.startsWith("read "))) {

        // has the feed been pulled yet?
        if (Object.keys(config.feed.store).length === 0 && config.feed.store.constructor === Object) {
            console.log("> No feed exists, execute 'pull' first!");
        }
        else {

            let argcheck = true;

            // input should be only int
            let intreg = /^\d+$/;

            let index = null;

            // split on first space, everything after is considered the args
            let args = input.split(/ (.+)/)[1];

            if ((args !== undefined) && (args !== null)) {
                if ((intreg.test(args)) && (args >= 1) && (args <= config.feed.store.items.length)) {
                    index = parseInt(args);
                }
                else {
                    argcheck = false;
                }
            }

            if (argcheck) {
                console.log(chalk.red.bold(config.feed.store.items[index - 1].title));
                console.log(chalk.white.inverse(config.feed.store.items[index - 1].contentSnippet));
            }
            else {
                console.log("> Unknown news index, try read [int].  Check 'titles' for available indices.");
            }

        }

        rl.prompt();
    }  

    // read title
    else if ((line === "open") || (line.startsWith("open "))) {

        // has the feed been pulled yet?
        if (Object.keys(config.feed.store).length === 0 && config.feed.store.constructor === Object) {
            console.log("> No feed exists, execute 'pull' first!");
        }
        else {

            let argcheck = true;

            // input should be only int
            let intreg = /^\d+$/;

            let index = null;

            // split on first space, everything after is considered the args
            let args = input.split(/ (.+)/)[1];

            if ((args !== undefined) && (args !== null)) {
                if ((intreg.test(args)) && (args >= 1) && (args <= config.feed.store.items.length)) {
                    index = parseInt(args);
                }
                else {
                    argcheck = false;
                }
            }

            if (argcheck) {
                console.log("> Opening link: " + config.feed.store.items[index - 1].link);
                console.log("> Wait for your browser to open...");
                // attempt to open news link in system browser
                (async () => {
                    await open(config.feed.store.items[index - 1].link);
                })();                
            }
            else {
                console.log("> Unknown news index, try open [int].  Check 'titles' for available indices.");
            }

        }

        rl.prompt();
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