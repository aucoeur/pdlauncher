#! /usr/bin/env node
const https = require('https');
const open = require('open');

const code = process.argv.slice(2);
const alpha_only = /\b([a-z]){5}\b/i;

if (typeof code[0] == 'undefined') {
    console.log('No code provided');
    open('https://joinpd.com');
} else if (alpha_only.test(code[0])) {
    let pd_link = `https://app.peardeck.com/findSessionUrl?joinCode=${code}`;

    https.get(pd_link, (res) => {
        if (res.statusCode != 404) {
            open(pd_link);
            console.log(`Joining ${code} in default browser..`);
        } else {
            console.log(`\x1b[33m${res.statusCode}\x1b[0m - Session not found using join code: \x1b[33m${code[0]}\x1b[0m`)
        }
    });
} else {
    console.log('\x1b[33mNot a valid 5 letter code\x1b[0m');
};

