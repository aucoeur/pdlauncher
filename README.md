# pd launcher
[![NPM version](https://img.shields.io/npm/v/pdlauncher.svg?style=flat&color=eaff00)](https://www.npmjs.com/package/pdlauncher) 
![GitHub last commit](https://img.shields.io/github/last-commit/aucoeur/pdlauncher?style=flat)
[![NPM downloads](https://img.shields.io/npm/dt/pdlauncher.svg?style=flat)](https://npmjs.org/package/pdlauncher)  

launches pear deck in-browser via terminal   

<p align="center">
<img src="pdlauncher.png" width="450">
</p>

## Install Globally
`npm install -g pdlauncher`

## To Use
You can use `pdlauncher` with or without a join code

- `pdlauncher` opens joinpd.com in your default browser  
- `pdlauncher [abxyz]` will attempt to join your room, will return error if code is not 5-6 letters or if there is no session found, authJoin should also redirect to proper student link

## Test Locally
- Link, `npm link`
- Unlink:  `npm unlink -g pdlaunche`
