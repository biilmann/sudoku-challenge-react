import mailgunAPI from "mailgun-js";

const apiKey = process.env.MAILGUN_KEY;
const domain = process.env.MAILGUN_DOMAIN;

const mailgun = mailgunAPI({ apiKey, domain });

function sendChallenge(data) {
  return new Promise((resolve, reject) => {
    mailgun.messages().send(
      {
        from: data.from,
        to: data.to,
        sender: data.sender,
        subject: `Sudoku Challenge From ${data.sender}`,
        text: `${
          data.sender
        } is challenging you to a Sudoku speed solving contest!

Follow this link to accept, and see if you can beat the time:

${data.url}
    `
      },
      (err, body) => {
        if (err) {
          return reject({ err, body });
        }
        resolve(body);
      }
    );
  });
}

function sendResult(data) {
  return new Promise((resolve, reject) => {
    mailgun.messages().send(
      {
        from: data.from,
        to: data.to,
        subject: `Sudoku Challenge Result`,
        text: `The Sudoku Challenge is Over.

${data.from} solved the Sudoku in ${data.fromTime} seconds
${data.to} solved the Sudoku in ${data.toTime} seconds
    `
      },
      (err, body) => {
        if (err) {
          return reject({ err, body });
        }
        resolve(body);
      }
    );
  });
}

export function handler(event, context, callback) {
  if (event.httpMethod !== "POST") {
    return callback(null, {
      statusCode: 405,
      body: "Method Not Allowed"
    });
  }

  const data = JSON.parse(event.body);
  let response = null;

  if (event.path.match(/challenge/)) {
    response = sendChallenge(data);
  } else if (event.path.match(/result/)) {
    response = sendResult(data);
  } else {
    response = Promise.reject({ err: "Bad Path", body: "Not supported" });
  }

  response
    .then(() => {
      callback(null, { statusCode: 200, body: "OK" });
    })
    .catch(err => {
      callback(null, {
        statusCode: 500,
        body: JSON.stringify({ msg: err.err, err: err.body })
      });
    });
}
