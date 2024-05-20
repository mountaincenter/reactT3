import React from "react";
import { Pencil, Trash2, Save, CircleX } from "lucide-react";
import { TableCell } from "~/components/ui/table";

interface TimeLogActionsProps {
  isEditing: boolean;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
  onDelete: () => void;
  isLoading: boolean;
}

const TimeLogActions: React.FC<TimeLogActionsProps> = ({
  isEditing,
  onEdit,
  onSave,
  onCancel,
  onDelete,
  isLoading,
}) => {
  const cursorStyle = isLoading ? "cursor-wait" : "cursor-pointer";

  if (isEditing) {
    return (
      <>
        <TableCell>
          <div>
            <Save
              size={16}
              className={`${cursorStyle} hover:text-blue-500`}
              onClick={onSave}
            />
          </div>
        </TableCell>
        <TableCell>
          <CircleX
            size={16}
            className="cursor-pointer hover:text-red-500"
            onClick={onCancel}
          />
        </TableCell>
      </>
    );
  }

  return (
    <>
      <TableCell>
        <div>
          <Pencil
            size={16}
            className="cursor-pointer hover:text-green-500"
            onClick={onEdit}
          />
        </div>
      </TableCell>
      <TableCell>
        <Trash2
          size={16}
          className={`${cursorStyle} hover:text-red-500`}
          onClick={onDelete}
        />
      </TableCell>
    </>
  );
};

export default TimeLogActions;
