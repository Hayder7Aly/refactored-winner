
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const EditDelete = (props) => {
    return (
      <>
        <EditIcon
          color="primary"
          fontSize="small"
          sx={{ marginRight: "10px" , cursor: "pointer"}}
          onClick={() => props.editAction(props.data)}
        />
        <DeleteIcon
          color="error"
          fontSize="small"
          sx={{ cursor: "pointer"}}
          onClick={() => props.deleteAction(props.data)}
        />
      </>
    );
  };

  export default EditDelete;