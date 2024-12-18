import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { fetchAllTemplates } from "@/lib/data/mailing/data";

const MailTemplatesTable = async () => {
  const templates = await fetchAllTemplates();

  return (
    <>
      <Table>
        <TableCaption>Dynamic Templates</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Dynamic Values</TableHead>
            <TableHead>Active</TableHead>
            <TableHead>Default</TableHead>
            <TableHead>Created</TableHead>
            <TableHead>Edit</TableHead>
            <TableHead>Delete</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {templates.length ? (
            templates.map((template) => (
              <TableRow key={template.id}>
                <TableCell>{template.name}</TableCell>
                <TableCell>{template.category}</TableCell>
                <TableCell>{template.dynamic_values}</TableCell>
                <TableCell>{template.active ? "True" : "False"}</TableCell>
                <TableCell>{template.is_default ? "True" : "False"}</TableCell>
                <TableCell>{template.updated}</TableCell>
                <TableCell>
                  <Button>Edit</Button>
                </TableCell>
                <TableCell>
                  <Button>Delete</Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableCell>No Templates Found</TableCell>
          )}
        </TableBody>
      </Table>
    </>
  );
};

export default MailTemplatesTable;
