const input = process.argv.slice(2);
const website = input[0];
const localPath = input[1];
const request = require('request');
const fs = require('fs');

request(website, (error, body) => {
  if (error) {
    console.log('error:', error);
  }
  fetch(body);
});

const fetch = (body) => {
  fs.writeFile(localPath, body, (err) => {
    if (err) throw err;
    request(website, (error, response) => {
      if (error) {
        console.log('error:', error);
      }
      const size = response.headers["content-length"];
      console.log(`Downloaded and saved ${size} Bytes to ${localPath}`)
    });
  });
};
