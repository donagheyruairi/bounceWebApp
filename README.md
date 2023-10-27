# bounceWebApp
This is the Country App made to apply to the Bounce Insights Intern Program 2024, by Ruairí Donaghey donagheyruairi@gmail.com.
The app is hosted at https://bouncewebapp-production.up.railway.app/

Before using this project locally, make sure you have installed NodeJS from https://nodejs.org/
To run, build or test this code, open a terminal window and navigate to its home directory (bounceWebApp). 
From there use the commands:
- npm start
- npm run build
- npm run test
for whichever function you need.

The app is hardcoded to run via port 8082. This can be changed by editing the proxy field in client/package.json, 
as well as the port default within server/server.js.

Once running, open a browser window and enter address http://localhost:8082 (changing 8082 to your own chosen port).
This will display the welcome page, from which all you need to do is type your chosen country in the input bar and hit enter.