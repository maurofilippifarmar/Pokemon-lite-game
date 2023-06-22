import { inputAttack } from './functions.js';

class Pokemon {
    constructor(name, health, energy) {
        this.name = name;
        this.health = health;
        this.energy = energy;
        this.skills = [];
    }
    learnAttackSkill(attackSkill) {
        return this.skills.push(attackSkill);
    }
    showStatus() {
        console.log(`
        
    ${this.name} status:
    Health: ${this.health}
    Energy: ${this.energy}`);
    }
    attack(target) {
        let { name, health, energy, skills, rest } = this;
        //console.log(skills);
        if (inputAttack.toLowerCase() === 'rest') {
            rest();
        } else {
            let attack = skills.find(
                ({ name }) => name.toLowerCase() === inputAttack.toLowerCase()
            );

            if (energy >= attack.energyConsumption) {
                console.log(`
    ${name} launched ${attack.name} successfully!
    ${target.name} got ${attack.attackPower} damage`);

                target.health -= attack.attackPower;
                energy -= attack.energyConsumption;

                if (target.health <= 0) {
                    console.clear();
                    console.log(`
    ${target.name} is dead.`);
                } else {
                    console.log(`
    ${target.name} resisted the attack!`);
                    target.showStatus();
                }
            }
            if (attack.energyConsumption >= energy) {
                console.log(`
    ${name} doesnt't have enough energy, it will rest`);
                rest();
            }
            if (attack === undefined) {
                console.log(`
    ${name} don't have that skill! select another one:`);
                this.attack();
            }
        }
    }

    rest() {
        let { name, health, energy, skills, showStatus } = this;
        console.log(`
    ${name} is resting to recover energy`);
        energy += energy / 10;
        showStatus();
    }
}
class AttackSkill {
    constructor(name, attack, energy) {
        this.name = name;
        this.attackPower = attack;
        this.energyConsumption = energy;
    }
}

let charizard = new Pokemon('Charizard', 65, 450);
let dragonite = new Pokemon('Dragonite', 70, 400);
let blastoise = new Pokemon('Blastoise', 670, 430);
let venusaur = new Pokemon('Venusaur', 600, 500);

let flamethrower = new AttackSkill('flamethrower', 90, 45);
let dragonClaw = new AttackSkill('dragon claw', 70, 30);
let fly = new AttackSkill('fly', 70, 25);
let headbutt = new AttackSkill('Headbutt', 50, 20);
let submsission = new AttackSkill('Submission', 65, 30);
let solarBeam = new AttackSkill('Solar beam', 120, 65);
let idropump = new AttackSkill('Idropump', 120, 65);
let megapunch = new AttackSkill('Mega-punch', 110, 60);
let bodySlam = new AttackSkill('Body slam', 60, 30);

charizard.learnAttackSkill(flamethrower);
charizard.learnAttackSkill(dragonClaw);
charizard.learnAttackSkill(fly);

dragonite.learnAttackSkill(dragonClaw);
dragonite.learnAttackSkill(fly);
dragonite.learnAttackSkill(megapunch);

blastoise.learnAttackSkill(headbutt);
blastoise.learnAttackSkill(submsission);
blastoise.learnAttackSkill(idropump);

venusaur.learnAttackSkill(headbutt);
venusaur.learnAttackSkill(solarBeam);
venusaur.learnAttackSkill(bodySlam);

//console.log(charizard);
//console.log(dragonite);
//console.log(blastoise);
//console.log(venusaur);
//charizard.showStatus();
//console.log();
//charizard.rest();
//console.log();
//charizard.attack(venusaur);

let arrayOfCharacters = [charizard, dragonite, blastoise, venusaur];

export { arrayOfCharacters, Pokemon, AttackSkill };
