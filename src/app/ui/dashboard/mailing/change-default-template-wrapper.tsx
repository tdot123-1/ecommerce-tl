import { fetchCategoryTemplates } from "@/lib/data/mailing/data";
import ChangeDefaultTemplate from "./change-default-template";

interface ChangeDefaultTemplateWrapperProps {
  templatesCategory: string;
}

const ChangeDefaultTemplateWrapper = async ({
  templatesCategory,
}: ChangeDefaultTemplateWrapperProps) => {
  // fetch templates of category
  try {
    const data = await fetchCategoryTemplates(templatesCategory);

    console.log("templates data: ", data);

    const defaultTemplate = data.find((template) => template.is_default);
    const otherTemplates: string[] = data
      .filter((template) => !template.is_default)
      .map((template) => template.name);

    if (!defaultTemplate) {
      throw new Error("Error finding default");
    }

    return (
      <ChangeDefaultTemplate
        defaultTemplate={defaultTemplate.name}
        templates={otherTemplates}
      />
    );
  } catch (error) {
    console.error("Error fetching templates: ", error);
    return <p className="text-red-600 text-sm italic">Error fetching templates / no templates found</p>;
  }
};

export default ChangeDefaultTemplateWrapper;
