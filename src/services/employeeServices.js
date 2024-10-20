import axiosInstance from '../api/axiosInstance';


// CRUD for Employees
export const fetchEmployees = async () => {
  const { data } = await axiosInstance.get('/employee');
  return data;
};

export const addEmployee = async (employeeData) => {
  const { data } = await axiosInstance.post('/employee', employeeData);
  return data;
};

export const updateEmployee = async (employeeId, employeeData) => {
  const { data } = await axiosInstance.put(`/employee/${employeeId}`, employeeData);
  return data;
};

export const deleteEmployee = async (employeeId) => {
  await axiosInstance.delete(`/employee/${employeeId}`);
};

// Additional API

export const fetchEmployeesByCafe = async (cafe) => {
  const { data } = await axiosInstance.get(`/employee?cafe=${cafe}`);
  return data;
};
