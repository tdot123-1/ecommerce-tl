"use server";

import { sendGrid } from "./sendgrid-object";

type EmailInfo = {
  to: string;
  subject: string;
  text: string;
  html?: string;
};
export const sendMail = async ({ to, subject, text, html }: EmailInfo) => {
  if (!process.env.SENDGRID_SENDER_EMAIL) {
    console.error("SENDER EMAIL NOT FOUND");
    throw new Error("Verified sender email not found.");
  }

  const msg = {
    to,
    from: {
      email: process.env.SENDGRID_SENDER_EMAIL,
      name: "Ti'El Shopping",
    },
    subject,
    text,
    html,
  };

  try {
    await sendGrid.send(msg);
    console.log("email sent");
  } catch (error) {
    console.error("error sending email: ", error);
  }
};

type SignupTemplateMailInfo = {
  to: string;
  name: string;
  promo_code: string;
  verify_link: string;
  templateId: string;
};

export const sendSignupTemplateMail = async ({
  to,
  name,
  promo_code,
  verify_link,
  templateId,
}: SignupTemplateMailInfo) => {
  if (!process.env.SENDGRID_SENDER_EMAIL) {
    console.error("SENDER EMAIL NOT FOUND");
    throw new Error("Verified sender email not found.");
  }

  const msg = {
    to,
    from: {
      email: process.env.SENDGRID_SENDER_EMAIL,
      name: "Ti'El Shopping",
    },
    templateId,
    dynamic_template_data: {
      name,
      promo_code,
      verify_link,
      Sender_Name: "Ti'El Shopping",
      Sender_Address: "Test Street 111",
      Sender_City: "Paris",
      Sender_Zip: "1234AB",
    },
  };

  try {
    await sendGrid.send(msg);
    console.log(`Template email sent to ${to}`);
  } catch (error) {
    console.error("Error sending template email: ", error);
    throw new Error("Failed to send template email.");
  }
};
