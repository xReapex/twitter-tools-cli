const inquirer = require('inquirer');

requestConfig()

function requestConfig() {
    const requestConfigInput = [
        {
            type: 'input',
            name: 'config',
            message: "Enter your BEARER TOKEN or the path to your config file",
        },
    ];

    inquirer.prompt(requestConfigInput).then((answers) => {
        let filePath = answers['config'];

        if (filePath.slice(-5) == ".json") {
            let configBearer = require(filePath)['bearer_token'];

            if (configBearer == undefined) {
                console.log('\nNo "bearer_token" key found in your config file ;(\n');
                requestConfig();
            }
        } else {
            (async () => {
                const { Client } = require('twitter.js');

                const client = new Client();
                await client.loginWithBearerToken(requestConfigInput);
            })
        }
    });
}
