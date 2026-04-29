# OPAP Lottery Vue Application

## Structure
The project includes the VueJS application for Kino game on SSBTs

## Build Setup
To build the project run the following:

- Go to `vue-app` directory <br>
`cd vue-app`

- Install dependencies <br>
  `npm install`

- Next, create a production build depending on the environment you want to work on:
  - For development environment: `npm run build-electron-dev`
  - For production environment: `npm run build electron`

  The above scripts will create the production sources for different environments, and the copy them to `dist` folder in
  Electron project.

## Vue application development with HMR (Hot Module Replacement)
In case you want run the vua application while during development simply run

`npm run dev`

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## Environment Configuration
To edit the environment configuration, "vue" object field must be set in .kinoconfig file.
The available settings are displayed in the table below

Key           | Description                   | Default Value
------------  | -------------                 | ----------
DRAW_API_HOST | Intralot's Draw API hostname. | "apigatewayjh.ilot.dc.opap/api/v3.0/draws"
PAM_HOST      | JANUS PAM hostname.           | "ssa2.betware.com"
IDLE_TIME     | Idle time (in ms) before application switches to lobby page.| 60000
WALLET_LIMIT  | SSBT Wallet limit (for informational use)| 1500
AUTH_PASS     | Client authentication password (AES-256 encrypted with salt) | "https://jira.betware.com/browse/BWIMDCD-371"
IPC_RENDERER_ENABLED | Set to false if no interaction with electron is desired. | true
VOUCHER_MESSAGE | Messages to be displayed in voucher message area | { en: '"Placeholder text"', el: '"Δείγμα μηνύματος"' }
KINO>LIVE_DRAW>OLISOFT_API| The olisoft url of the draw which is used to get the live draw | "https://ds.opap.gr/ssbt_kino/kino/html/Internet_PRODUCTION/KinoDraw.html"
KINO>LIVE_DRAW>DIALOG_TIMEOUT| The timeout till the dialog, which is displayed to inform the user that the screen will autoredirect, will be closed | 9000
KINO>LIVE_DRAW>AUTO_CLEAR_BETS_BEFORE_NEXT_DRAW_MILLIS| Time before the next draw, when the betslips should be cleared | 180000
KINO>LIVE_DRAW>ENABLE_BETSLIP_IMPORT_BEFORE_NEXT_DRAW_MILLIS| Time before next draw, when the user will be able to scan and import his betslips | 150000

## Development info
If live draw screen fails to load, the first time, the kino board from olisoft please navigate to the iframe url in order to accept the https privacy policy for https://dsuat.opap.gr/ or https://ds.opap.gr/ according to the environment on witch you are testing.

#### Olisoft
Kino live draw board is implemented using an iframe.
Communication is accomplished via window.postMessage from both sides.<br><br>
Messages sent from our side to olisoft:
- Change template:<br>
window.postMessage({id:'changeTemplate',template:'KinoDraw_summer'})
- Select numbers:<br>
window.postMessage({id:'slipNumbers',slipNumbersArray:[4,7,44,34,35,80,61,40,1,55,43,66,70]})
- Clear numbers:<br>
window.postMessage({id:'clearSlipNumbers'})

Messages sent from olisoft:
- Inactive from 12:00 - 09:00:<br>
{ kinoGameInactive: true }
- Draw Began:<br>
{"drawBegan":true,"drawId":99589}
- Kino Number <br>
{"kinoNumber":80,"isBonus":false,"drawId":99589}
- Kino Numbers Completed<br>
{"drawnNumbers":{"kinoNumbers":[80,20,40,68,2,56,9,78,52,77,24,42,13,47,59,63,43,74,79],"bonusNumber":67},"sideBets":{"winningColumn":10,"winningParity":"even"},"kinoNumbers":[],"drawComplete":true,"drawId":99589}

#### Olisoft Playground
http://ds.opap.gr/ssbt_kino/index.html
