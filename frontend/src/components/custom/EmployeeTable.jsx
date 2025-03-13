import { Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis
} from "@/components/ui/pagination";

const EmployeeTable = ({
  employees,
  totalPages,
  currentPage,
  handleEdit,
  handleDelete,
  generatePageNumbers,
  setCurrentPage
}) => {
  return (
    <div className="mt-6 border rounded-md w-full overflow-x-auto">
      <Table className="w-full min-w-[800px]">
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Department</TableHead>
            <TableHead>Photo</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>DOB</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Salary</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {employees.map((emp) => (
            <TableRow key={emp.id}>
              <TableCell>{emp.id}</TableCell>
              <TableCell>{emp.department_name || "N/A"}</TableCell>
              <TableCell>
                <img
                  src={emp.photo.startsWith('https') ? emp.photo : `http://localhost:8080/uploads/${emp.photo}`}
                  alt={emp.name}
                  className="w-10 h-10 rounded-full"
                />
              </TableCell>
              <TableCell>{emp.name}</TableCell>
              <TableCell>{new Date(emp.dob).toLocaleDateString()}</TableCell>
              <TableCell>{emp.phone}</TableCell>
              <TableCell>{emp.email}</TableCell>
              <TableCell className={emp.status === "active" ? "text-green-600" : "text-red-600"}>
                {emp.status}
              </TableCell>
              <TableCell>${parseFloat(emp.salary).toFixed(2)}</TableCell>
              <TableCell className="flex gap-2">
                <Button variant="outline" size="icon" className="text-blue-600 hover:text-blue-800" onClick={() => handleEdit(emp)}>
                  <Edit className="h-5 w-5" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="text-red-600 hover:text-red-800"
                  onClick={() => handleDelete(emp.id)}
                >
                  <Trash2 className="h-5 w-5" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Pagination className="mt-4 flex justify-center">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)} />
          </PaginationItem>
          {generatePageNumbers().map((page, index) => (
            <PaginationItem key={index}>
              {page === "ellipsis" ? <PaginationEllipsis /> : <PaginationLink isActive={currentPage === page} onClick={() => setCurrentPage(page)}>{page}</PaginationLink>}
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default EmployeeTable;
