const cron = require("node-cron");
const { subDays, startOfDay, endOfDay } = require("date-fns");
const sendEmail = require("./sendEmail");
const connectionRequestModel = require("../models/connectionRequest");

cron.schedule("0 8 * * *", async () => {
  // to send emails to users who got requests
  const yesterday = subDays(new Date(), 1);
  const yesterdayStart = startOfDay(yesterday);
  const yesterdayEnd = endOfDay(yesterday);
  try {
    const pendingRequests = await connectionRequestModel
      .find({
        status: "interested",
        createdAt: { $gte: yesterdayStart, $lte: yesterdayEnd },
      })
      .populate("fromUserId toUserId");
    const listOfEmails = [
      ...new Set(pendingRequests.map((req) => req.toUserId.email)),
    ];

    for (const email of listOfEmails) {
      try {
        const recipients = await sendEmail.run(
          "You have new connection requests! Check them out.",
          "New Connection Requests",
        );
        console.log("Email Response: ", recipients);
      } catch (err) {
        console.log("Error in cron job: ", err.message);
      }
    }
  } catch (err) {
    console.log("Error in cron job: ", err.message);
  }
});
