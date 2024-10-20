import { CameraswitchOutlined } from '@mui/icons-material';
import React, { useState, useEffect } from 'react';

const FileUpload = ({
  id,
  onChange,
  inputProps,
  maxSize = 2 * 1024 * 1024, // Default 2MB max size
  errorMsg = 'File size should not exceed 2MB.',
  selectedFile,
  setSelectedFile,
  existingImage // Add existingImage as a prop
}) => {
  const [fileError, setFileError] = useState('');
  const [imagePreview, setImagePreview] = useState(null); // State for image preview

  // Handle file selection and validation
  const onSelectFile = (event) => {
    const selectedFile = event.target.files?.[0] || null;

    if (selectedFile) {
      const isImage = selectedFile.type.startsWith("image/");
      const isValidSize = selectedFile.size <= maxSize;

      if (!isImage) {
        setFileError("Selected file must be an image");
        setSelectedFile(null); // Clear file if not valid
        setImagePreview(null); // Clear image preview
      } else if (!isValidSize) {
        setFileError(`Selected file must be ${maxSize / (1024 * 1024)}MB or less`);
        setSelectedFile(null); // Clear file if too large
        setImagePreview(null); // Clear image preview
      } else {
        setFileError(''); // Clear any previous errors
        setSelectedFile(selectedFile); // Set valid file
        setImagePreview(URL.createObjectURL(selectedFile)); // Set preview image
        onChange && onChange(selectedFile); // Trigger onChange event if provided
      }
    }
  };

  // Clean up the preview URL when component unmounts or file changes
  useEffect(() => {
    return () => {
      if (imagePreview) URL.revokeObjectURL(imagePreview); // Revoke URL on cleanup
    };
  }, [imagePreview]);

  return (
    <>
      <div className={`flex items-center justify-center w-full ${selectedFile || existingImage ? 'hidden' : ''}`}>
        <label
          htmlFor={id}
          className="flex flex-col items-center justify-center w-full h-26 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-200 hover:bg-gray-100"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              JPG or JPEG (MAX. {maxSize / (1024 * 1024)}MB)
            </p>
          </div>
          <input
            id={id}
            type="file"
            className="hidden"
            onChange={onSelectFile}
            {...inputProps} // Pass additional input props like accept
          />
        </label>
      </div>

      {/* Display file error */}
      {fileError && <p className="mt-2 text-sm text-red-500">{fileError}</p>}

      {/* Display selected file or existing image */}
      {(selectedFile || existingImage) && (
        <div className="mt-2 relative">
          <img
            src={selectedFile ? imagePreview : `http://localhost:3001/api/v1/cafe/image/${existingImage}`} // Use file preview or existing image URL
            alt="Selected Preview"
            className="my-2 w-60 mx-auto"
          />
          <CameraswitchOutlined
            color="primary"
            sx={{ position: "absolute", bottom: "0px", right: "0px" }}
            onClick={() => document.getElementById(id).click()} // Trigger file select on camera icon click
          />
        </div>
      )}
    </>
  );
};

export default FileUpload;
