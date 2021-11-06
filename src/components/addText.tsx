import { useForm, SubmitHandler } from "react-hook-form";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  CircularProgress,
  FormControl,
  InputLabel,
} from "@mui/material";
import { SelectChangeEvent } from '@mui/material/Select';
import NotificationApi from "../api/notificationApi";
import NotificationText, {
  NotificationTextRequest,
} from "../common/types/notificationText";
import NotificationType from "../common/types/notificationType";

interface IProps {
  types: NotificationType[] | NotificationType | null;
  isTypesError: boolean;
  isTypesLoading: boolean;
}

const AddText: React.FC<IProps> = ({ isTypesLoading, isTypesError, types }) => {
  const { register, handleSubmit, watch, setValue, reset } = useForm<NotificationTextRequest>();
  const select = watch("notificationType");
  const onSubmit: SubmitHandler<NotificationTextRequest> = async (data) => {
    await NotificationApi.addTexts(data);
    reset();
  };

  const handleSelectChange = (e:SelectChangeEvent<string>) => {
    setValue('notificationType', e.target.value, {
      shouldDirty: true
    });
  }

  const renderDrowDown = () => {
    return (
      <div className="type-line">
        <FormControl fullWidth>
          <InputLabel id="types-select">Type</InputLabel>
          <Select
            native
            {...register('notificationType')}
            labelId="types-select"
            label="Type"
            value={select}
            onChange={e => handleSelectChange(e)}
          >
            {types &&
              (types as NotificationType[]).map((type) => (
                <option key={type._id} value={type._id}>
                  {type.name}
                </option>
              ))}
          </Select>
        </FormControl>
      </div>
    );
  };

  return (
    <form className="type-container" onSubmit={handleSubmit(onSubmit)}>
      <TextField
        {...register("text")}
        id="filled-error"
        label="Notification Text"
        defaultValue="Enter Text"
        variant="outlined"
        className="type-line"
      />
      {isTypesLoading ? (
        <CircularProgress />
      ) : isTypesError ? (
        []
      ) : (
        renderDrowDown()
      )}
      <Button className="submit" type="submit" variant="contained">
        Add New Text
      </Button>
    </form>
  );
};

export default AddText;
