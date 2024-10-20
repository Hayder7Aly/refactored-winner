import { useState, useEffect } from "react";
import Modal from "../elements/Modal";
import FileUpload from "../elements/InputFile";
import InputField from "../elements/InputField";
import Button from "../elements/Button";

const AddEditCafe = ({ cafeData, isEditMode, onSubmitSuccess, isOpen, handleClose }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [cafe, setCafe] = useState({
        name: '',
        description: '',
        location: '',
        logo: ''
    });

    useEffect(() => {
        if (isEditMode && cafeData) {
          setCafe({
            name: cafeData.name,
            description: cafeData.description,
            location: cafeData.location,
            logo: cafeData.logo, // Existing image URL for edit mode
          });
          setSelectedFile(null); // Clear file input for edit, since you're showing existing image
        } else {
          setCafe({
            name: '',
            description: '',
            location: '',
            logo: '' // Clear image URL when adding new cafe
          });
          setSelectedFile(null); // Clear selected file
        }
      }, [isEditMode, cafeData]);
      

    const onChange = (value, name) => {
        setCafe({ ...cafe, [name]: value });
    }

    const onSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append("name", cafe.name);
        formData.append("description", cafe.description);
        formData.append("location", cafe.location);

        const input = selectedFile; // Use the selected file for the logo
        if (input) {
            formData.append("image", input);
        }

        onSubmitSuccess(formData, isEditMode);
    };

    return (
        <Modal isOpen={isOpen} title={isEditMode ? 'Edit Cafe' : 'Add Cafe'} onClose={handleClose}>
            <form onSubmit={onSubmit} autoComplete="off">
            <FileUpload
  id="cafe-logo-upload"
  selectedFile={selectedFile}
  setSelectedFile={setSelectedFile}
  onChange={(file) => setCafe((prevCafe) => ({ ...prevCafe, logo: file }))} // Update cafe state with the new file
  existingImage={isEditMode && cafeData ? cafeData.logo : null} // Pass the existing image URL when editing
  inputProps={{ accept: 'image/jpeg, image/jpg' }} // Restrict file types
  maxSize={2 * 1024 * 1024} // 2MB max size
/>

                <InputField
                    label="Name"
                    name="name"
                    value={cafe.name}
                    onChange={onChange}
                    placeholder=""
                    minLength={6}
                    maxLength={10}
                    required={true}
                />
                <InputField
                    label="Description"
                    name="description"
                    value={cafe.description}
                    onChange={onChange}
                    placeholder=""
                    maxLength={256}
                    required={true}
                />
                <InputField
                    label="Location"
                    name="location"
                    value={cafe.location}
                    onChange={onChange}
                    placeholder=""
                    required={true}
                />

                <div className="flex justify-between items-center my-4">
                    <Button text={"Cancel"} variant="secondary" size="small" onClick={handleClose} />
                    <Button text={isEditMode ? "Update Cafe" : "Add Cafe"} variant="primary" size="small" type="submit" disabled={cafe.name.length < 6 || !cafe.description || !cafe.location || (!selectedFile && !cafe.logo) } />
                </div>
            </form>
        </Modal>
    );
};

export default AddEditCafe;
