import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const DepartmentTable = ({
  departments,
  loading,
  error,
  searchTerm,
  onSearchChange,
  onAddClick,
}) => {
  return (
    <div className="flex min-h-screen w-full overflow-hidden">
      <main className="flex-1 p-6 w-full overflow-auto">
        <div className="flex items-center justify-between border-b pb-4">
          <h1 className="text-xl font-semibold">Department Management</h1>
          <div className="flex items-center gap-4">
            <Input
              type="search"
              placeholder="Search departments..."
              className="w-[250px]"
              value={searchTerm}
              onChange={onSearchChange}
            />
            <Button onClick={onAddClick}>Add Department</Button>
          </div>
        </div>

        {loading && <p className="text-center mt-4">Loading departments...</p>}
        {error && <p className="text-center mt-4">{error}</p>}

        {!loading && !error && (
          <div className="mt-6 border rounded-md w-full overflow-x-auto">
            <Table className="w-full min-w-[600px]">
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Modified</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {departments.length > 0 ? (
                  departments.map((dept) => (
                    <TableRow key={dept.id}>
                      <TableCell>{dept.id}</TableCell>
                      <TableCell>{dept.name}</TableCell>
                      <TableCell className={dept.status === "active" ? "text-green-600" : "text-red-600"}>
                        {dept.status}
                      </TableCell>
                      <TableCell>{new Date(dept.created).toLocaleDateString()}</TableCell>
                      <TableCell>{new Date(dept.modified).toLocaleDateString()}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan="5" className="text-center py-4">
                      No departments found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </main>
    </div>
  );
};

export default DepartmentTable;
