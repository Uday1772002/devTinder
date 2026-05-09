const { SendEmailCommand } = require("@aws-sdk/client-ses");
const { sesClient } = require("./sesClient");

const createSendEmailCommand = (toAddress, fromAddress) => {
  return new SendEmailCommand({
    Destination: {
      CcAddresses: [],
      ToAddresses: [toAddress],
    },
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: `<h1>${BODY}</h1>`,
        },
        Text: {
          Charset: "UTF-8",
          Data: "This is the Email Body in text format.",
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: `EMAIL_SUBJECT`,
      },
    },
    Source: fromAddress,
    ReplyToAddresses: [],
  });
};

const run = async (BODY, EMAIL_SUBJECT) => {
  const sendEmailCommand = createSendEmailCommand(
    "jayaramuday@17@gmail.com",
    "jayaramuday24@gmail.com",
    BODY,
    EMAIL_SUBJECT,
  );

  try {
    return await sesClient.send(sendEmailCommand);
  } catch (caught) {
    if (caught instanceof Error && caught.name === "MessageRejected") {
      const messageRejectedError = caught;
      return messageRejectedError;
    }
    throw caught;
  }
};

// snippet-end:[ses.JavaScript.email.sendEmailV3]
module.exports = { run };
