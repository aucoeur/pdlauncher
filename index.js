#! /usr/bin/env node

const https = require('https')
const open = require('open')

// module.exports = // comment out unless testing
function isCodeValid(code) {
  if (!code) {
    return undefined
  }
  // joinCodes are len 5-6 alphabet chars
  const alpha_only = /\b([a-z]{5,6})\b/i;

  return alpha_only.test(code)
}

function main() {
  // get arg from cli
  const args = process.argv.slice(2);

  // strip whitespace/join split chars into one code
  const joinCode = args.join('')

  switch (isCodeValid(joinCode)) {
    case undefined:
      // Opens browser for manual entry if no code provided
      console.log('No code provided. Opening https://joinpd.com in default browser');
      open('https://joinpd.com');
      return
    case false:
      console.log(`\x1b[33m${joinCode} is not a valid code\x1b[0m`);
      return `${joinCode} is not a valid code`
    case true:
      let pd_link = `https://app.peardeck.com/findSessionUrl?joinCode=${joinCode}`;

      const req = https.get(pd_link, async res => {
        if (res.statusCode != 404) {
          // authJoin seems to return JSON for teacherUrl?
          res.on("data", async data => {
            // convert Buffer object toString, JSON.parse to get value
            data.toString();
            const presentationID = JSON.parse(data).teacherUrl

            const presentationUrl = `https://app.peardeck.com/student/${presentationID}`;
            // moment of truth...
            await open(presentationUrl);
          })
          console.log(`Joining \x1b[33m${joinCode}\x1b[0m in default browser..\x1b[0m`);
        } else {
          console.log(`\x1b[33m${res.statusCode}\x1b[0m - Session not found using join code: \x1b[33m${joinCode}\x1b[0m`)
        }
      })
      req.on("error", err => {
        console.error(err)
      });
      return
    }
}

// comment out main() when testing other funcs or test will fail
main();
