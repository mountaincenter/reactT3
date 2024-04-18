import React from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { TableCell } from "~/components/ui/table";
import { timeSchema } from "~/utils/timeUtils";
import { zodResolver } from "@hookform/resolvers/zod";

interface TimeLogFormProps {
  defaultValues: {
    inputStartTime: string;
    inputStopTime: string;
  };
  onSubmit: SubmitHandler<FormValues>;
  selectedEdit: SelectedEdit;
  setSelectedEdit: React.Dispatch<React.SetStateAction<SelectedEdit>>;
}

type SelectedEdit = "inputStartTime" | "inputStopTime" | null;

interface FormValues {
  inputStartTime: string;
  inputStopTime: string;
}

const TimeLogForm: React.FC<TimeLogFormProps> = ({
  defaultValues,
  onSubmit,
  selectedEdit,
  setSelectedEdit,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues,
    resolver: zodResolver(timeSchema),
  });

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (selectedEdit === "inputStartTime") {
        setSelectedEdit("inputStopTime");
      } else if (selectedEdit === "inputStopTime") {
        void handleSubmit(onSubmit)();
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      if (selectedEdit === "inputStartTime") {
        setSelectedEdit("inputStopTime");
      } else if (selectedEdit === "inputStopTime") {
        setSelectedEdit("inputStartTime");
      }
    }
  };

  return (
    <>
      <TableCell>
        <form onSubmit={handleSubmit(onSubmit)}>
          {selectedEdit === "inputStartTime" ? (
            <input
              {...register("inputStartTime")}
              className="text w-12 pl-1"
              onKeyDown={handleKeyDown}
            />
          ) : (
            <span
              onClick={() => setSelectedEdit("inputStartTime")}
              className="cursor-pointer"
            >
              {defaultValues.inputStartTime}
            </span>
          )}
          {errors.inputStartTime && (
            <span className="text-red-500">
              {errors.inputStartTime.message}
            </span>
          )}
        </form>
      </TableCell>
      <TableCell>
        <form onSubmit={handleSubmit(onSubmit)}>
          {selectedEdit === "inputStopTime" ? (
            <input
              {...register("inputStopTime")}
              className="text w-12 pl-1"
              onKeyDown={handleKeyDown}
            />
          ) : (
            <span
              onClick={() => setSelectedEdit("inputStopTime")}
              className="cursor-pointer"
            >
              {defaultValues.inputStopTime}
            </span>
          )}
          {errors.inputStopTime && (
            <span className="text-red-500">{errors.inputStopTime.message}</span>
          )}
        </form>
      </TableCell>
    </>
  );
};

export default TimeLogForm;
