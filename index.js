#! /usr/bin/env node
const https = require('https');
const open = require('open');

// joinCodes are len 5-6 alphabet chars
const alpha_only = /\b([a-z]{5,6})\b/i;

// get arg from cli
const args = process.argv.slice(2);

// strip whitespace/join split chars into one code
const joinCode = args.join('')

//[TODO] maybe should do a switch case here instead

if (typeof joinCode == 'undefined') {
  // Opens browser for manual entry if no cpm versiode provided
  console.log('No code provided');
  open('https://joinpd.com');
} else if (alpha_only.test(joinCode)) {
    let pd_link = `https://app.peardeck.com/findSessionUrl?joinCode=${joinCode}`;

    const req = https.get(pd_link, async res => {
        if (res.statusCode != 404) {
          // authJoin seems to return JSON for teacherUrl?
          res.on("data", async data => {

            // convert Buffer object toString, JSON.parse to get value
            data.toString();
            const presentationID = JSON.parse(data).teacherUrl
            // console.log(presentationID)

            const presentationUrl = `https://app.peardeck.com/student/${presentationID}`;
            await open(presentationUrl);
          })
          console.log(`Joining ${joinCode} in default browser..`);
        } else {
          console.log(`\x1b[33m${res.statusCode}\x1b[0m - Session not found using join code: \x1b[33m${joinCode}\x1b[0m`)
        }
    })
    req.on("error", err => {
      console.error(err)
    });
} else {
    console.log(`\x1b[33m${joinCode} is not a valid code\x1b[0m`);
};
