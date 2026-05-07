/**
 * SMS Service
 * This handles the actual sending of SMS to the users.
 * Replace the logic below with your Twilio, Fast2SMS, or Firebase Auth keys.
 */

export const sendSMS = async (phone: string, message: string) => {
  console.log(`[SMS SERVICE] Sending to ${phone}: ${message}`);

  // TWILIO EXAMPLE:
  /*
  const client = require('twilio')(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);
  await client.messages.create({
     body: message,
     from: process.env.TWILIO_PHONE,
     to: phone
  });
  */

  // FAST2SMS EXAMPLE:
  /*
  const response = await fetch(`https://www.fast2sms.com/dev/bulkV2?authorization=${process.env.FAST2SMS_KEY}&route=otp&variables_values=${message}&numbers=${phone}`);
  */

  return true;
};
