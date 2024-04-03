import { useState } from "react";
import { api } from "../utils/api";
import { useRouter } from "next/navigation";

export const useTimeLogMutation = () => {
  const router = useRouter();
  const [message, setMessage] = useState<string>("");

  const createTimeLog = api.timeLog.create.useMutation({
    onSuccess: () => {
      setMessage("時間ログの作成が完了しました");
      setTimeout(() => setMessage(""), 3000);
      router.refresh();
    },
    onError: () => {
      setMessage("時間ログの作成に失敗しました");
      setTimeout(() => setMessage(""), 3000);
    },
  });

  const updateTimeLog = api.timeLog.update.useMutation({
    onSuccess: () => {
      setMessage("時間ログの更新を完了しました");
      setTimeout(() => setMessage(""), 3000);
      router.refresh();
    },
    onError: () => {
      setMessage("時間ログに失敗しました");
      setTimeout(() => setMessage(""), 3000);
    },
  });

  const deleteTimeLog = api.timeLog.delete.useMutation({
    onSuccess: () => {
      setMessage("時間ログの削除が完了しました");
      setTimeout(() => setMessage(""), 3000);
    },
  });

  return { message, createTimeLog, updateTimeLog, deleteTimeLog };
};
