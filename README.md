# React Tinder Card Demo

# to install dependencies
npm install

# to make deployable frontend binaries, build folder is created with required files once this command is successfully over.
npm run build 

# isntall dependency to deploy on github pages
npm install gh-pages

# deploy on github pages, put below entries in package.json under scripts 
"predeploy": "npm run build",
"deploy": "gh-pages -d build",

# deploy on github pages
npm run deploy




