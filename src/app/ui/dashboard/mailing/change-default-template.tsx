import { Button } from "@/components/ui/button";

interface ChangeDefaultTemplateProps {
  defaultTemplate: string;
  templates: string[];
}

const ChangeDefaultTemplate = ({
  defaultTemplate,
  templates,
}: ChangeDefaultTemplateProps) => {
  //TODO:  create dialog form to change default
  console.log(templates);
  return (
    <>
      <p>{defaultTemplate}</p>
      <Button>Change</Button>
    </>
  );
};

export default ChangeDefaultTemplate;
