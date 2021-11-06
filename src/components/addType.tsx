import { useForm, SubmitHandler } from "react-hook-form";
import { TextField, Button, FormLabel } from "@mui/material";
import { styled } from "@mui/material/styles";
import NotificationApi from "../api/notificationApi";
import NotificationType, { NotificationTypeRequest } from "../common/types/notificationType";

interface IProps {
    refetchTypes: () => Promise<void>;
}

const Input = styled("input")({
  display: "none",
});

const AddType:React.FC<IProps> = ({refetchTypes}) => {
  const { register, handleSubmit, reset } = useForm<NotificationTypeRequest>();

  const onSubmit: SubmitHandler<NotificationTypeRequest> = async (data) => {
    await NotificationApi.addType(data);
    await refetchTypes();
    reset();
  };

  return (
    <form className="type-container" onSubmit={handleSubmit(onSubmit)}>
      <FormLabel>Add Type</FormLabel>
      <TextField
        {...register("name")}
        id="filled-error"
        label="Notification Name"
        defaultValue="Hello World"
        variant="outlined"
        className="type-line"
      />
      <label className="type-line" htmlFor="contained-button-file">
        <Input
          {...register("img")}
          id="contained-button-file"
          type="file"
          style={{ display: "none" }}
        />
        <Button variant="contained" component="span">
          Notification Icon
        </Button>
      </label>
      <input
        className="type-line"
        {...register("color")}
        name="color"
        type="color"
      />
      <Button className="submit" type="submit" variant="contained">
        Add New Type
      </Button>
    </form>
  );
};

export default AddType;
