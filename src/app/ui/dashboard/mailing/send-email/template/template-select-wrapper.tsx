"use client";

import { fetchAllTemplateNames } from "@/lib/data/mailing/data";
import TemplateSelect from "./template-select";
import { useEffect, useState } from "react";

interface TemplateSelectWrapperProps {
  handleChange: (template: string) => void;
}

const TemplateSelectWrapper = ({
  handleChange,
}: TemplateSelectWrapperProps) => {
  const [allTemplates, setAllTemplates] = useState<
    { name: string; id: string }[]
  >([]);

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const templates = await fetchAllTemplateNames();
        setAllTemplates(templates);
      } catch (error) {
        console.error("Error fetching templates on client: ", error);
      }
    };

    fetchTemplates();
  }, []);

  return (
    <>
      <TemplateSelect handleChange={handleChange} templates={allTemplates} />
    </>
  );
};

export default TemplateSelectWrapper;
