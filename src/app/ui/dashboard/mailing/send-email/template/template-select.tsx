"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Template {
  name: string;
  id: string;
}

interface TemplateSelectProps {
  templates: Template[];
  handleChange: (template: string) => void;
}

const TemplateSelect = ({ templates, handleChange }: TemplateSelectProps) => {
  return (
    <>
      <Select onValueChange={handleChange}>
        <SelectTrigger>
          <SelectValue placeholder="Select Template" />
        </SelectTrigger>
        <SelectContent>
          {templates.map((temp) => (
            <SelectItem key={temp.id} value={temp.id}>{temp.name}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  );
};

export default TemplateSelect;
