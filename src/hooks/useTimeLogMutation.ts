import { api } from "../utils/api";
import { useRouter } from "next/router";
import { useToast } from "~/components/ui/use-toast";

export const useTimeLogMutation = () => {
  const router = useRouter();
  const { toast } = useToast();

  const createTimeLog = api.timeLog.create.useMutation({
    onSuccess: () => {
      toast({
        title: "success",
        description: "記録に成功しました",
        duration: 3000,
      });
      setTimeout(() => router.reload(), 3000);
    },
    onError: () => {
      toast({
        title: "error",
        description: "登録に失敗しました",
        duration: 3000,
      });
    },
  });

  const updateTimeLog = api.timeLog.update.useMutation({
    onSuccess: () => {
      toast({
        title: "success",
        description: "更新に成功しました",
        duration: 3000,
      });
      setTimeout(() => router.reload(), 3000);
    },
    onError: () => {
      toast({
        title: "error",
        description: "登録に失敗しました",
        duration: 3000,
      });
    },
  });

  const deleteTimeLog = api.timeLog.delete.useMutation({
    onSuccess: () => {
      toast({
        title: "success",
        description: "削除に成功しました",
        duration: 3000,
      });
      setTimeout(() => router.reload(), 3000);
    },
    onError: () => {
      toast({
        title: "error",
        description: "削除に失敗しました",
        duration: 3000,
      });
    },
  });

  // 各操作のisLoading状態を直接参照する
  const isCreateLoading = createTimeLog.status === "pending";
  const isUpdateLoading = updateTimeLog.status === "pending";
  const isDeleteLoading = deleteTimeLog.status === "pending";

  // どれか一つでもisLoading状態なら、全体としてisLoadingとみなす
  const isLoading = isCreateLoading || isUpdateLoading || isDeleteLoading;

  return {
    createTimeLog,
    updateTimeLog,
    deleteTimeLog,
    isLoading,
  };
};
