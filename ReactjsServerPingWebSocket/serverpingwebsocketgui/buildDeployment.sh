echo "module.exports = 'dev';" > src/sysflag.js
rm -Rf build
npm run-script build

