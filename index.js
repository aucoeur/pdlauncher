#! /usr/bin/env node
const https = require('https');
const open = require('open');

const alpha_only = /\b([a-z]{5,6})\b/i;

// get arg from cli
const args = process.argv.slice(2);

// strip whitespace
const joinCode = args.join('')
console.log(typeof joinCode, joinCode);

if (typeof joinCode == 'undefined') {
    console.log('No code provided');
    open('https://joinpd.com');
} else if (alpha_only.test(joinCode)) {
    let pd_link = `https://app.peardeck.com/findSessionUrl?joinCode=${joinCode}`;

    https.get(pd_link, (res) => {
        if (res.statusCode != 404) {
            open(pd_link);
            console.log(`Joining ${joinCode} in default browser..`);
        } else {
            console.log(`\x1b[33m${res.statusCode}\x1b[0m - Session not found using join code: \x1b[33m${joinCode}\x1b[0m`)
        }
    });
} else {
    console.log(`\x1b[33m${joinCode} is not a valid code\x1b[0m`);
};
