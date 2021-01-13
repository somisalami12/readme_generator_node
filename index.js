
'use strict';
const fs = require('fs');
const inquirer = require('inquirer');
const chalk = require('chalk');
inquirer.registerPrompt('recursive', require('./utils/my-inquirer-recursive.js'));
const generateMarkdown = require('./utils/generateMarkdown.js');

//Welcome message
const welcome = [
    {
        type: 'confirm',
        prefix: '\b',
        name: 'welcome',
        message: chalk.cyanBright(`Thanks for using my README.md generator! You will be presented with options for your README's sections and their respective contents. To begin hit 'y' or enter.`),

    },
];

//Markdown tips
const letsGo = chalk.greenBright(`\n
Let's Generate a README!!!
//~~~~~~~~~~~~~~~~~~~~~~//
     MD syntax tips
-------------------------
Bold    **bold text**
Italics *italicized text*       
Links   [title](https://www.example.com)
Image   ![alt text](image.jpg)
\n`);

//Success message
const success = chalk.greenBright(`
WooHoo! README Generated! It's in the Output folder
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~// 
`);

//User questions
const questions = [
    {
        type: 'input',
        name: 'title',
        message: `What is the title of your project?`,
    },
    {
        type: 'input',
        name: 'github',
        message: `What's your GitHub User Name?`,

    },
    {
        type: 'input',
        name: 'email',
        message: `What's your email address?`,
        validate: function (value) {
            let pass = value.match(
                /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
            );
            if (pass) {
                return true;
            }
            return 'Please enter a valid email address!';
        },
    },
    {
        type: 'input',
        name: 'description',
        message: `Please write a description of your project`,

    },
    {
        type: 'confirm',
        name: 'install',
        message: `Do you want to add any installation notes?`,

    },
    {
        type: 'input',
        name: 'installNotes',
        message: `Please add your installation notes`,
        when: function (answers) {
            return answers.install;
        }
    },
    {
        type: 'confirm',
        name: 'usage',
        message: `Do you want to provide the user usage information?`,
    },
    {
        type: 'input',
        name: 'usageInfo',
        message: `Please add your usage info`,
        when: function (answers) {
            return answers.usage;
        }
    },
    {
        type: 'confirm',
        name: 'contrib',
        message: `Do you want to add any notes on contributing to the repo?`,
    },
    {
        type: 'input',
        name: 'contribNotes',
        message: `Please add your what you want the user to know about contributing to the repo`,
        when: function (answers) {
            return answers.contrib;
        }
    },
    {
        type: 'confirm',
        name: 'test',
        message: `Do you want to add instructions for running tests?`,
    },
    {
        type: 'input',
        name: 'testNotes',
        message: `Please add your instructions for running tests`,
        when: function (answers) {
            return answers.test;
        }
    },
    {
        type: 'rawlist',
        name: 'license',
        message: 'Which open source license would you like to use? ',
        choices: ['Apache 2.0', 'BSD 2-Clause', 'BSD 3-Clause', 'GNU AGPLv3.0', 'GNU GPLv2.0', 'GNU GPLv3.0', 'MIT', 'Mozilla Public 2.0'],
    },
    {
        type: 'confirm',
        name: 'credits',
        message: `Would you like to add any credits to the repo?`,
    },
    {
        type: 'input',
        name: 'creditData',
        message: `Please add your credits`,
        when: function (answers) {
            return answers.credits;
        }
    },
    {
        type: 'recursive',
        prefix: '\b',
        name: 'moreCredits',
        message: `Would you like to add more credits to the repo?`,
        when: function (answers) {
            return answers.creditData;
        },
        prompts: [
            {
                type: 'input',
                name: 'moreCreditData',
                message: 'Please add your credits',
            },
        ]
    },
];


//Function to write README file
const writeToFile = (fileName, data) => {
    fs.writeFile(fileName, data, (err) =>
        err ? console.error(err) : console.log(success)
    );
}

//Function to initialize the generator 
const init = async () => {
    try {
        await inquirer.prompt(welcome);
        console.log(letsGo);
        const data = await inquirer.prompt(questions);
        writeToFile('./output/README.md', generateMarkdown(data));
    } catch (err) {
        console.log(err);
    }
}

//Function call to initialize program
init();