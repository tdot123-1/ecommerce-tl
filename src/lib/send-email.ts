"use server";

import { sendGrid } from "./sendgrid-object";

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

type TemplateMailInfo = {
  to: string;
  templateId: string;
  dynamic_template_data: Record<string, string>;
};

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
    const sendGridError = error as SendGridError;

    if (sendGridError.response) {
      console.error(
        "Error sending template email:",
        sendGridError.response.body
      );
      console.error("Errors:", sendGridError.response.body.errors); // Inspect errors
    } else {
      console.error("Error sending template email:", (error as Error).message); // Cast to Error
    }
    console.error("Error sending template email: ", error);
    throw new Error("Failed to send template email.");
  }
};

// send batch emails
type RecipientInfo = {
  email: string;
  name: string;
};

type EmailBatchInfo = {
  recipients: RecipientInfo[];
  templateId: string;
  otherDynamicValues?: Record<string, string>;
};

export const sendBatchEmails = async ({
  recipients,
  templateId,
  otherDynamicValues,
}: EmailBatchInfo) => {
  try {
    const emailPromises = recipients.map(async ({ email, name }) => {
      const dynamic_template_data = {
        name,
        ...otherDynamicValues,
      };

      const emailInfo = {
        to: email,
        templateId,
        dynamic_template_data,
      };

      await sendTemplateMail(emailInfo);
      console.log(`Email sent to ${email}`);
    });

    await Promise.all(emailPromises);
    console.log("All emails sent successfully.");
  } catch (error) {
    console.error("Error sending batch emails:", error);

    throw new Error("Failed to send batch emails.");
  }
};

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
