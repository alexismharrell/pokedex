# Pokedex Project
### Alexis Harrell, built for [PrizePicks](https://www.prizepicks.com/careers)

Project was built for PrizePicks as a coding challenge. It leverages the [PokeApi](https://pokeapi.co/docs/v2) to build a rudimentary Pokedex search engine.

Leverages Vite, React, Redux, MUI, and Axios HTTP.

## Installation and Running

After cloning repo, run 
>npm install

After installing dependencies, launch app with
>npm run dev

Dev site will launch at
>http://localhost:5173/

## TODOS

The following sections address work left undone and various TODOs

### GraphQL Implementation

If I had more time and the PokeAPI GraphQL Beta was further along, it would vastly improve this app. Moves, Abilities, and Evolutions would be much easier to query and parse if GraphQL was used.

### Unit Tests

Unit tests have not been implemented due to lack of time. Unit tests would be needed to make sure the logic for the following functions/functionalities are error free

- Basic capitalization function, a unit test to validate consistency in formatting and capitalization.
- Evolution chain parsing requires robust unit testing due to its complexity and recursive nature. Basic evolution chains work but more complex edge cases would need to be tested such as branch evolutions (ie; what if Eeveelutions had further branching evolutions)
- Move and Ability flavor text and description parsing has enough complexity to warrant testing and edge case validation

### Search Optimizations

Search currently uses a static list of Pokemon fetched by species, and does not include Pokemon variants such a Alolan or Mega Evolutions. In addition, search could be expanded to include Moves, Abilities, and other bits of data. I also wanted to improve the look and feel of search beyond basic text but did not have time.

### Move List and Ability List Optimizations

Moves and Abilities could link to details, and styling could be improved of the tables including color coding of types, translations, and further information provided by the PokeAPI. Moves and Ability list also need to be improved to run in a concurrent environment as the HTTP Requests for those are pretty heavy. This is one place GraphQL could vastly improve the app.

### Styling

Styling of the app is pretty bland, using default styling of MUI. If there was more time, it would be nice to implement a full style and theme for MUI for the application.

### Typing

If there was more time, and for a proper production environment, it would be very beneficial to implement more robust types/interfaces for the app. A wrapper for the PokeAPI exists already (see [PokeNode-TS](https://github.com/Gabb-c/pokenode-ts) for more info) that could be leveraged to smooth out a lot of the overhead here.

### Sprites

It wouldve been nice to find a CDN or API linking to a CDN that contained official art for pokemon in addition to the sprites. It would also be nice to implement a way to view different generations of sprites. 

## Issues and Remaining Bugs

### Move List Issues
- Sometimes the move list fails to render, and sometimes takes a second or two to catch up to changes of current Pokemon. As mentioned above, finding a way to batch these calls together or leverage GraphQL would be beneficial to increasing performance here

### Evolution Chain Issues
- Currently only render simple strings. 

### Sprite Issues
- MUI CSS decisions are causing issue with the spacing of the Sprite panel component's positioning.


## Final Comments

Overall this was an interesting task in state management and http request management. PokeAPI is very complex, and I dont fully agree with some of their decisions in regards to JSON structure or data provided. Turns out Pokemon are very complex in terms of data, and Serebii.net definitely illustrates that. I will definitely be using this repo as a testbed for next front end technologies.