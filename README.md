# node-newsreader
As a school assignment, developer a newsreader utility that can read RSS feeds and display in a readable format on screen.

## Installing & Running
Installation requires Node.js to be installed as a pre-requisite. Visit https://nodejs.org 

1. Clone project source into a directory
2. Run command > npm install
3. NPM the Node Package Manager will setup node-newsreader and any depenendcies
4. Run command > node app

On launch the app will pull the feed configued in config.js and will present a CLI and menu for user input. The following commands are available:

* pull: get the latest RSS newsfeed (runs on app start)
* titles: show index of news titles
* read [int]: read the content snippet of title [int]
* open [int]: open the feed item in your system browser
* quit: close this program

![Alt text](/newsreader.jpg?raw=true "Node Newsreader Screenshot")

## Configuration

Edit the config/config.js and set config.url to the RSS feed of your choosing.

## Libraries
node-newsreader makes use of a library to parse RSS feeds from XML to JSON and several other libraries to enhance the UI.

### rss-parser

https://www.npmjs.com/package/rss-parser

A small library for turning RSS XML feeds into JavaScript objects.

### node-color-readline

https://www.npmjs.com/package/node-color-readline

Node.js 'readline' alternative with support for coloured syntax highlighting and suggestions.

### chalk

https://www.npmjs.com/package/chalk

Terminal string styling done right

### open

https://www.npmjs.com/package/open

Open stuff like URLs, files, executables. For URLs in this case, open attempts to fetch the system brower (cross-platform).
