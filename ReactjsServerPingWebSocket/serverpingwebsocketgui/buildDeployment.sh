echo "module.exports = 'deploy_stomp';" > src/sysflag.js
rm -Rf build
npm run-script build

