import { fetchCategoryTemplates } from "@/lib/data/mailing/data";

interface ChangeDefaultTemplateWrapperProps {
  templatesCategory: string;
}

const ChangeDefaultTemplateWrapper = async ({
  templatesCategory,
}: ChangeDefaultTemplateWrapperProps) => {
  // fetch templates of category
  try {
    const data = await fetchCategoryTemplates(templatesCategory);

    console.log("templates data: ", data)
  } catch (error) {
    
  }
  // get default with js

  return <></>;
};

export default ChangeDefaultTemplateWrapper;
