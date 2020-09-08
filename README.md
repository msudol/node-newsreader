# node-newsreader
As a school assignment, developer a newsreader utility that can read RSS feeds and display in a readable format on screen.

## Installing & Running
Installation requires Node.js to be installed as a pre-requisite. Visit https://nodejs.org 

1. Clone project source into a directory
2. Run command > npm install
3. NPM the Node Package Manager will setup node-newsreader and any depenendcies
4. Run command > node app

Running the app will present a CLI that prompts for user input. The following commands are available:

* pull: get the latest RSS newsfeed (runs on app start)
* titles: show index of news titles
* read [int]: read the content snippet of title [int]
* open [int]: open the feed item in your system browser
* quit: close this program

![Alt text](/newsreader.jpg?raw=true "Node Newsreader Screenshot")