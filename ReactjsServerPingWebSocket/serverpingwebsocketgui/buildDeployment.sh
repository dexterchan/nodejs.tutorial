echo "module.exports = 'deploy';" > src/sysflag.js
rm -Rf build
npm run-script build

