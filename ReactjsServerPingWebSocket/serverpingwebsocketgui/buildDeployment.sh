echo "module.exports = 'dev';" > src/sysflag.js
rm -Rf build
npm run-script build

aws s3 sync --delete ./build s3://humblepig2020mar-marketdatastream