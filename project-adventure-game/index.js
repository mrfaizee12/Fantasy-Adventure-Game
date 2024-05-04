#!/usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
class Player {
    name;
    health;
    gold;
    constructor(name) {
        this.name = name;
        this.health = 100;
        this.gold = 0;
    }
}
class AdventureGame {
    player;
    constructor() {
        this.player = new Player("");
    }
    async start() {
        console.log(chalk.bold.bgBlueBright("Fantasy Adventure Game"));
        const { playerName } = await inquirer.prompt({
            type: "input",
            name: "playerName",
            message: chalk.bold.blueBright("Enter your adventurer's name:"),
        });
        this.player.name = playerName;
        console.log(chalk.bold.yellowBright(`Welcome, ${this.player.name}! Let's begin our adventure.`));
        while (true) {
            const { action } = await inquirer.prompt({
                type: "list",
                name: "action",
                message: "What do you want to do next?",
                choices: ["Explore", "Rest", "Quit"],
            });
            if (action === "Quit") {
                console.log(chalk.yellow("Thanks for playing! Goodbye."));
                break;
            }
            console.log(chalk.yellow("You embark on an adventure..."));
            const outcome = Math.random() < 0.5 ? "Win" : "Lose";
            if (outcome === "Win") {
                console.log(chalk.green("Congratulations! You defeat the dragon and find a treasure chest!"));
                this.player.gold += 50;
            }
            else {
                console.log(chalk.red("Oops! You encounter a fierce orc and lose some health!"));
                this.player.health -= 20;
            }
            console.log(chalk.yellowBright(`Health: ${this.player.health}, Gold: ${this.player.gold}`));
        }
    }
}
const game = new AdventureGame();
game.start();
