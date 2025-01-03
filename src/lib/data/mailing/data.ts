"use server";

import { auth } from "@/auth";
import { sql } from "@vercel/postgres";

export const fetchAllTemplates = async () => {
  const session = await auth();

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  try {
    const data = await sql`
    SELECT * FROM email_templates
    `;

    if (!data.rowCount) {
      throw new Error("No templates found");
    }

    return data.rows
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch email templates data.");
  }
};

export const fetchAllTemplateNames = async () => {
  const session = await auth();

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  try {
    const data = await sql`
    SELECT name, id FROM email_templates
    `;

    if (!data.rowCount) {
      throw new Error("No templates found");
    }

    return data.rows.map((template) => ({
      name: template.name,
      id: template.id,
    }));
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch email templates data.");
  }
}

export const fetchCategoryTemplates = async (category: string) => {
  const session = await auth();

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  try {
    const data = await sql`
    SELECT name, is_default
    FROM email_templates
    WHERE active = true
    AND category = ${category}
    `;

    if (!data.rowCount) {
      throw new Error("No templates found");
    }

    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch email templates data.");
  }
};
