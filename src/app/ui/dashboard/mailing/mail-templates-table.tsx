import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const MailTemplatesTable = async () => {
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
            <TableHead>Created</TableHead>
            <TableHead>Updated</TableHead>
            <TableHead>Edit</TableHead>
            <TableHead>Delete</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          <TableRow>
            <TableCell>X</TableCell>
            <TableCell>X</TableCell>
            <TableCell>X</TableCell>
            <TableCell>X</TableCell>
            <TableCell>X</TableCell>
            <TableCell>X</TableCell>
            <TableCell>X</TableCell>
            <TableCell>X</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </>
  );
};

export default MailTemplatesTable;
