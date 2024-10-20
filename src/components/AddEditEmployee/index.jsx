import { useState, useEffect } from "react";
import Modal from "../elements/Modal";
import InputField from "../elements/InputField";
import Button from "../elements/Button";
import SelectMenu from "../elements/SelectMenu";
import RadioGroupMenu from "../elements/Radio";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchCafes } from "../../services/cafeServices";




const AddEditEmployee = ({ employeeData, isEditMode, onSubmitSuccess, isOpen, handleClose }) => {
    const [employee, setEmployee] = useState({
        name: '',
        email: '',
        phone: '',
        gender: '',
        cafeId: '',
    });


    const { data: cafes  } = useQuery   ({
        queryKey: ["cafes"],
        queryFn: fetchCafes, // Your function to fetch cafes
      });

      console.log({cafes})
    
    useEffect(() => {
        if (isEditMode && employeeData) {
            setEmployee({
                name: employeeData.name,
                email: employeeData.email,
                phone: employeeData.phone,
                gender: employeeData.gender || '',
                cafeId: employeeData.cafeId || '',
            });
        } else {
            setEmployee({
                name: '',
                email: '',
                phone: '',
                gender: '',
                cafeId: '',
            });
        }
    }, [isEditMode, employeeData]);

    const onChange = (value, name) => {
        setEmployee({ ...employee, [name]: value });
    };

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const validatePhone = (phone) => {
        const re = /^[89]\d{7}$/; // Starts with 8 or 9 and has 8 digits
        return re.test(phone);
    };

    const onSubmit = (event) => {
        event.preventDefault();
        
        
        onSubmitSuccess(employee, isEditMode);
        handleClose(); // Close the modal after submitting
    };



    return (
        <Modal isOpen={isOpen} title={isEditMode ? 'Edit Employee' : 'Add Employee'} onClose={handleClose}>
            <form onSubmit={onSubmit} autoComplete="off">
                <InputField
                    label="Name"
                    name="name"
                    value={employee.name}
                    onChange={onChange}
                    minLength={6}
                    maxLength={10}
                    required={true}
                />
                <InputField
                    label="Email"
                    name="email"
                    value={employee.email}
                    onChange={onChange}
                    type="email"
                    required={true}
                    validateEmail={true}
                />
                <InputField
                    label="Phone"
                    name="phone"
                    value={employee.phone}
                    onChange={onChange}
                    required={true}
                    validatePhoneNumber={true}
                />
                <div>
            

                    <RadioGroupMenu onChange={onChange} name="gender" defaultValue={employee.gender}/>
                </div>
                 <label className="mb-1 text-sm font-medium text-gray-700">
                 Assigned Café
          <span className="text-red-500">*</span>
        </label>
                <SelectMenu title={"Cafes"} menuitems={cafes} value={employee.cafeId}  onChange={onChange} name={"cafeId"} />

                <div className="flex justify-between items-center my-4">
                    <Button text={"Cancel"} variant="secondary" size="small" onClick={handleClose} />
                    <Button
                        text={isEditMode ? "Update Employee" : "Add Employee"}
                        variant="primary"
                        size="small"
                        type="submit"
                        disabled={
                            employee.name.length < 6 ||
                            !validateEmail(employee.email) ||
                            !validatePhone(employee.phone) ||
                            !employee.cafeId ||
                            !employee.gender
                        }
                    />
                </div>
            </form>
        </Modal>
    );
};



export default AddEditEmployee;
