/*** reader.js ***/

'use strict';

// required modules

// chalk - https://www.npmjs.com/package/chalk
const chalk = require('chalk');

// open - https://www.npmjs.com/package/open
const open = require('open');

// rss parser - https://www.npmjs.com/package/rss-parser
let Parser = require('rss-parser');
let parser = new Parser({
    timeout: 15000,
});

// create reader class
function reader(url) {
    
    this.url = url;
    this.feed = {};

};

reader.prototype.pull = function(callback) {

    var self = this;
    
    parser.parseURL(this.url, function(err, feed) {
        
        if (err) throw err;
        
        // going to add the current timestap to the feed object fnar
        let d = new Date();
        let diso = d.toISOString();
        feed.date = diso;
        
        self.feed = feed;
        
        let res = "> RSS Feed Pulled";
    
        callback(res);
        
    });
    
};

reader.prototype.titles = function(callback) {

    let res = "";
    
    // has the feed been pulled yet?
    if (Object.keys(this.feed).length === 0 && this.feed.constructor === Object) {
        // should just replace console with a return err val
        
        res = "> No feed exists, execute 'pull' first!";
    }
    else {
        let i = 0;
        // should just return the feed items 
        
        
        // cycle through the feed object and print out the titles
        this.feed.items.forEach(item => {
            i++;
            res += chalk.yellow("[" + i + "] ") + item.title + ": " + chalk.cyan(item.link) + "\n";
            
        });
    }
    
    callback(res);
};

reader.prototype.read = function(args, callback) {

    let res = "";
    
    // has the feed been pulled yet?
    if (Object.keys(this.feed).length === 0 && this.feed.constructor === Object) {
        res = "> No feed exists, execute 'pull' first!";
    }
    else {

        let argcheck = true;

        // input should be only int
        let intreg = /^\d+$/;

        let index = null;

        if ((args !== undefined) && (args !== null)) {
            if ((intreg.test(args)) && (args >= 1) && (args <= this.feed.items.length)) {
                index = parseInt(args);
            }
            else {
                argcheck = false;
            }
        }

        if (argcheck) {
            res += chalk.red.bold(this.feed.items[index - 1].title) + "\n";
            res += chalk.white.inverse(this.feed.items[index - 1].contentSnippet);
        }
        else {
            res = "> Unknown news index, try read [int].  Check 'titles' for available indices.";
        }

    }
    
    callback(res);
    
};

reader.prototype.open = function(args, callback) {

    let res = "";
    
    // has the feed been pulled yet?
    if (Object.keys(this.feed).length === 0 && this.feed.constructor === Object) {
        res = "> No feed exists, execute 'pull' first!";
    }
    else {

        let argcheck = true;

        // input should be only int
        let intreg = /^\d+$/;

        let index = null;

        if ((args !== undefined) && (args !== null)) {
            if ((intreg.test(args)) && (args >= 1) && (args <= this.feed.items.length)) {
                index = parseInt(args);
            }
            else {
                argcheck = false;
            }
        }

        if (argcheck) {
            res += "> Opening link: " + this.feed.items[index - 1].link + "\n";
            res += "> Wait for your browser to open...";
            
            // attempt to open news link in system browser
            (async () => {
                await open(this.feed.items[index - 1].link);
            })();   
            
        }
        else {
            res = "> Unknown news index, try open [int].  Check 'titles' for available indices.";
        }

    }
    
    callback(res);
    
};
module.exports = reader;