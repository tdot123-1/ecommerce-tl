"use server";

import { sendGrid } from "./sendgrid-object";

// interface to inspect sendgrid errors
interface SendGridError {
  response?: {
    body: {
      errors: Array<{
        message: string;
        field?: string;
        code?: string;
      }>;
    };
  };
}

// minimum required info for plaintext emails
type EmailInfo = {
  to: string;
  subject: string;
  text: string;
  html?: string;
};

// send plaintext email to 1 recipient
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

// required info for template emails
type TemplateMailInfo = {
  to: string;
  templateId: string;
  dynamic_template_data: Record<string, string>;
};

// send template email to 1 recipient
export const sendTemplateMail = async ({
  to,
  dynamic_template_data,
  templateId,
}: TemplateMailInfo) => {
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
    templateId: templateId.trim(),
    dynamic_template_data,
  };

  try {
    await sendGrid.send(msg);
    console.log(`Template email sent to ${to}`);
  } catch (error) {
    // cast error as sendgrid error to inspect specific error msg
    const sendGridError = error as SendGridError;

    // log response in case of sendgrid error
    if (sendGridError.response) {
      console.error(
        "Error sending template email:",
        sendGridError.response.body
      );
      console.error("Errors:", sendGridError.response.body.errors);
    } else {
      console.error("Error sending template email:", error);
    }
    // throw error to caller
    throw new Error("Failed to send template email.");
  }
};

// send batch emails
interface RecipientInfo {
  email: string;
  name: string;
};

interface EmailBatchInfo {
  recipients: RecipientInfo[];
  templateId: string;
  otherDynamicValues?: Record<string, string>;
};

// send template emails to all recipients
export const sendBatchEmails = async ({
  recipients,
  templateId,
  otherDynamicValues,
}: EmailBatchInfo) => {
  try {
    // generate email promises for each recipient
    // name is different for each recipient, other values are the same across emails
    const emailPromises = recipients.map(({ email, name }) => {
      // generate dynamic values
      const dynamic_template_data = {
        name,
        ...otherDynamicValues,
      };

      // form email info
      const emailInfo = {
        to: email,
        templateId: templateId.trim(),
        dynamic_template_data,
      };

      // send template, log success
      return sendTemplateMail(emailInfo).then(() => {
        console.log(`Email sent to ${email}`);
      });
    });

    // resolve all promises
    await Promise.all(emailPromises);
    console.log("All emails sent successfully.");
  } catch (error) {
    console.error("Error sending batch emails:", error);

    throw new Error("Failed to send batch emails.");
  }
};

// send plaintext emails to all recipients
export const sendBatchEmailsPlaintext = async (
  to: string[],
  subject: string,
  text: string
) => {
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
  };
  try {
    await sendGrid.sendMultiple(msg);
  } catch (error) {
    console.error("Error sending batch emails:", error);
    throw new Error("Failed to send batch emails.");
  }
};
