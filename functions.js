import * as rs from 'readline-sync';
let q = rs.question;
import { Pokemon, AttackSkill, arrayOfCharacters } from './classes.js';

let activePlayer = 0;
let passivePlayer = 1;
let inputAttack = '';
let arrayOfPlayers = [];

function createPokemon() {
    console.clear();
    console.log(`
    Here you can create your new Pokemon!
    You will have to insert a few data like the name, the life points and the energy.
             `);
    let pokemonName = q(`
    Please insert your Pokemon name: 
    > `);
    let pokemonHp = q(`
    Please set your Pokemon life points:
    > `);
    let pokemonEnergy = q(`
    Please set your Pokemon energy:
    > `);
    let newPokemon = new Pokemon(pokemonName, pokemonHp, pokemonEnergy);

    console.log(`
    Now you will have to create from 1 to 3 attack skills for your Pokemon!
    You will have to insert the attack name, the attack power and the energy cost of the new attack Skill `);

    for (let i = 0; i <= 3; i++) {
        //console.log('logging:', i);
        if (i < 3) {
            let attackName = q(`
    Please insert the attack name:
    > `);
            let attackPower = q(`
    Please insert the attack power:
    > `);
            let energyCost = q(`
    Please insert the energy consumption of your attack:
    > `);
            let newSkill = new AttackSkill(attackName, attackPower, energyCost);
            newPokemon['skills'].push(newSkill);
            console.log(`
    ${newSkill['name']} was added to ${newPokemon['name']}'s skills!`);
            const createAnotherSkill = q(
                'Do you want to create another attack skill? (yes/no) ',
                {
                    trueValue: ['yes', 'y', 'Y'],
                    falseValue: ['no', 'n', 'N'],
                }
            );
            if (createAnotherSkill === false) {
                arrayOfCharacters.push(newPokemon);
                //console.log(arrayOfCharacters);

                console.log(`
    Congratulations! 
    Your new created Pokemon will be added to the character rooster!`);
                q(`
    Press ENTER to go back to the option menu`);
                break;
            } else {
                i = i;
            }
        } else if (i === 3) {
            arrayOfCharacters.push(newPokemon);
            //console.log(arrayOfCharacters);
            console.log(`
    Congratulations you've created the maximum amount of skills for your pokemon!
    Your new created Pokemon will be added to the character rooster!`);
            q(`Press ENTER to go back to the option menu
            >`);
            break;
        }
    }
}
function characterSelection() {
    console.clear();
    console.log(`
    Welcome to the Pokemon battles! First you will have to select 2 characters from the rooster of playable characters!
    Pokemon characters:`);
    q('Press ENTER to proceed to the character selection');
    for (let output of arrayOfCharacters) {
        console.log(output);
    }
    const playerChoice1 = q(`
    Select your first character:
    `);

    let player1 = arrayOfCharacters.find(
        ({ name }) => name.toLowerCase() === playerChoice1.toLowerCase()
    );
    arrayOfPlayers.push(player1);
    console.log(`
    You've selected ${player1.name}!
                `);

    const playerChoice2 = q(`
    Select your second character:
    `);

    let player2 = arrayOfCharacters.find(
        ({ name }) => name.toLowerCase() === playerChoice2.toLowerCase()
    );
    arrayOfPlayers.push(player2);
    console.log(`
    You've selected ${player2.name}!
                `);
    console.clear()
    console.log(`
    ${player1.name} and ${player2.name} will fight`);
    q(`
    Press ENTER to start the battle!`);
}
function selectActivePlayer() {
    activePlayer = Math.round(Math.random());
    console.log(activePlayer);
    if (activePlayer === 0) {
        passivePlayer = 1;
        console.clear()
        console.log(`
    
    ${arrayOfPlayers[activePlayer].name} will start the battle first!`);
    } else {
        passivePlayer = 0;
        console.clear()
        console.log(`
    
    ${arrayOfPlayers[activePlayer].name} will start the battle first!`);
    }
}

function battleGame() {
    console.clear();
    console.log(`
    
    `);
    q(`
    The battle will start soon!
    Press ENTER to start the battle!`);
    let activePlayer = 0;
    let passivePlayer = 1;
    while (arrayOfPlayers[0].health > 0 && arrayOfPlayers[1].health > 0) {
        console.log(`
    ${arrayOfPlayers[activePlayer].name} is going to attack ${arrayOfPlayers[passivePlayer].name}`);
        console.log(arrayOfPlayers[activePlayer].skills);
        inputAttack = q(`
    Select your attack or make your pokemon recover it's energy:
        `);
        arrayOfPlayers[activePlayer].attack(arrayOfPlayers[passivePlayer]);
        if (arrayOfPlayers[passivePlayer].health > 0) {
            passivePlayer = activePlayer;
            activePlayer = (activePlayer + 1) % arrayOfPlayers.length;
        } else {
            console.log(`
    Congratulations!
    ${arrayOfPlayers[activePlayer].name} has won the battle!`);
            const playAgain = q(
                `
    Would you like to play another game? (yes/no)
    > `,
                {
                    trueValue: ['yes', 'y', 'Y'],
                    falseValue: ['no', 'n', 'N'],
                }
            );
            if (playAgain === true) {
                characterSelection();
            }
            q(`
    Press ENTER to go back to the option menu`);
            break;
        }
    }
}
export {
    createPokemon,
    characterSelection,
    selectActivePlayer,
    battleGame,
    inputAttack,
};
