import { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS
import EditDelete from "../components/elements/EditDeleteAgGroup";
import Button from "../components/elements/Button";
import AddEditEmployee from "../components/AddEditEmployee";
import DeleteDialogBox from "../components/elements/Dialog";
import { fetchEmployees, addEmployee, updateEmployee, deleteEmployee } from '../services/employeeServices';
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const Employees = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null); 
  const [modalOpen, setModalOpen] = useState(false); // Control modal visibility
  const [openDialog, setOpenDialog] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState(null); // For delete dialog
  
  const queryClient = useQueryClient();
  
  // Fetch employees using useQuery
  const { data: employees, isLoading, error } = useQuery({
    queryKey: ['employees'],
    queryFn: fetchEmployees,
  });

  // Add employee mutation
  const addEmployeeMutation = useMutation({
    mutationFn: addEmployee, // Function to perform the POST request
    onSuccess: () => {
      queryClient.invalidateQueries(['employees']); // Refetch the employees after adding
    },
    onError: (error) => {
      console.error("Error adding employee:", error);
    },
  });

  // Update employee mutation
  const updateEmployeeMutation = useMutation({
    mutationFn: ({ id, data }) => updateEmployee(id, data), // Function to perform the PUT request
    onSuccess: () => {
      queryClient.invalidateQueries(['employees']); // Refetch employees after update
    },
    onError: (error) => {
      console.error("Error updating employee:", error);
    },
  });

  // Delete employee mutation
  const deleteEmployeeMutation = useMutation({
    mutationFn: deleteEmployee, // Function to perform the DELETE request
    onSuccess: () => {
      queryClient.invalidateQueries(['employees']); // Refetch employees after delete
    },
    onError: (error) => {
      console.error("Error deleting employee:", error);
    },
  });

  // Handlers for editing and deleting an employee
  const handleEdit = (employee) => {
    setIsEditMode(true);
    setModalOpen(true);
    setSelectedEmployee(employees.find(employe => employe.employeeId === employee.employeeId ));
  };

  

  const handleDelete = (employee) => {
    setEmployeeToDelete(employee);
    setOpenDialog(true);
  };

  // Column definitions for the AG Grid
  const columnDefs = [
    { field: "employeeId", headerName: "Employee ID", flex: 1 },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 2 },
    { field: "phone", headerName: "Phone", flex: 1 },
    { field: "daysWorked", headerName: "Days Worked", flex: 1 },
    { field: "cafeDetails.name", headerName: "Café Name", flex: 1 },
    {
      headerName: "Actions",
      cellRenderer: EditDelete,
      cellClass: "clickable-cell",
      cellRendererParams: {
        editAction: handleEdit,
        deleteAction: handleDelete,
      },
      flex: 1,
    },
  ];

  const handleSubmitSuccess = (formData, isEditMode) => {
    if (isEditMode) {
      updateEmployeeMutation.mutate({ id: selectedEmployee.employeeId, data: formData });
    } else {
      addEmployeeMutation.mutate(formData);
    }

    setModalOpen(false); // Close modal
    setIsEditMode(false); // Reset edit mode
    setSelectedEmployee(null); // Reset selected employee
  };

  // Handle delete action
  const confirmDelete = () => {
    deleteEmployeeMutation.mutate(employeeToDelete.employeeId);
    setOpenDialog(false); // Close dialog after deletion
  };

  // Loading and error handling
  // if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <div style={{ height: 400, width: "96%" }} className="ag-theme-alpine mx-auto">
        <div className="flex flex-row-reverse mb-6">
          <Button text="Add Employee" variant="secondary" onClick={() => {
              setIsEditMode(false);
              setModalOpen(true);
              setSelectedEmployee(null);
          }}/>
        </div>
        <AgGridReact
          rowData={employees || []} // Use the fetched employee data
          columnDefs={columnDefs}
          domLayout="autoHeight"
          loading={isLoading}
        />

        {modalOpen && (
          <AddEditEmployee
            employeeData={selectedEmployee}
            isEditMode={isEditMode}
            onSubmitSuccess={handleSubmitSuccess}
            isOpen={modalOpen}
            handleClose={() => setModalOpen(false)}
          />
        )}

        {openDialog && (
          <DeleteDialogBox
            open={openDialog}
            setOpen={setOpenDialog}
            title={`Delete Employee`}
            message={"Do you really want to delete this employee?"}
            handleDelete={confirmDelete}
          />
        )}
      </div>
    </>
  );
};

export default Employees;
