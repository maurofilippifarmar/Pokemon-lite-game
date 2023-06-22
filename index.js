// //const rs = require('readline-sync');

import * as rs from 'readline-sync';
import {characterSelection,selectActivePlayer, battleGame, createPokemon} from "./functions.js"
let q = rs.question;

function playGame() {
    let isRunning = true;
    while (isRunning) {
        console.clear();
        console.log(`
    Welcome to Pokemon Battles game!
    `);
        console.log(`
    1. Play the game`);
        console.log(`
    2. Create a new Pokemon`);
        console.log(`
    3. Exit the game`);
        const menuInput = q(`
    > `);

        switch (menuInput) {
            case '1':
                characterSelection();
                selectActivePlayer();
                battleGame();
                break;
            case '2':
                createPokemon();
                break;
            case '3':
                isRunning = false;
                console.clear();
                console.log(`
    Bye, thanks for playing Pokemon Battles!
    Come Back soon!`);
                break;
        }
    }
}

playGame();


