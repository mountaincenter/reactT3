import React, { useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { api } from "~/utils/api";

type Post = {
  id: number;
  name: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  createdById: string;
};

type Inputs = {
  name: string;
  content: string;
};

interface AppPrismaRefProps {
  post: Post;
  isEdit: boolean;
  setIsEdit: (isEdit: boolean) => void;
  selectedEdit: "name" | "content" | null;
  setSelectedEdit: (selectedEdit: "name" | "content" | null) => void;
}

export default function AppPrismaRef({
  post,
  isEdit,
  setIsEdit,
  selectedEdit,
  setSelectedEdit,
}: AppPrismaRefProps) {
  const updatePost = api.post.update.useMutation();

  const { register, handleSubmit, watch, reset, setFocus } = useForm<Inputs>({
    defaultValues: { name: post.name, content: post.content },
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      await updatePost.mutateAsync({
        id: post.id,
        data: { name: data.name, content: data.content },
      });
      setIsEdit(false);
      setSelectedEdit(null);
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  const watchedData = watch();

  useEffect(() => {
    if (selectedEdit === "name") {
      setFocus("name", { shouldSelect: true });
    } else if (selectedEdit === "content") {
      setFocus("content", { shouldSelect: true });
    }
  }, [selectedEdit, setFocus]);

  useEffect(() => {
    reset({ name: post.name, content: post.content });
  }, [post, reset]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "name") {
      setSelectedEdit("content");
    } else if (selectedEdit === "content") {
      void handleSubmit(onSubmit)();
    }
  };

  return (
    <div>
      <h2>Update Post useRefによるfocus</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="border-4 border-white p-4"
      >
        <div className="flex gap-16">
          {isEdit ? (
            <div className="flex flex-col gap-16">
              <input
                {...register("name")}
                className="text-xl"
                placeholder={watchedData.name}
                onKeyDown={handleKeyDown}
              />
              <input
                {...register("content")}
                className="text-xl"
                placeholder={watchedData.content}
                onKeyDown={handleKeyDown}
              />
            </div>
          ) : (
            <div className="flex flex-col gap-16">
              <p
                className="cursor-pointer text-xl"
                onClick={() => {
                  setIsEdit(true);
                  setSelectedEdit("name");
                }}
              >
                {watchedData.name}
              </p>
              <p
                className="cursor-pointer text-xl"
                onClick={() => {
                  setIsEdit(true);
                  setSelectedEdit("content");
                }}
              >
                {watchedData.content}
              </p>
            </div>
          )}
          <input
            className={`border-2 border-white ${isEdit && watchedData.name && watchedData.content ? "cursor-pointer" : "cursor-not-allowed opacity-50"}`}
            type="submit"
            value="Update"
            disabled={!isEdit || !watchedData.name || !watchedData.content}
          />
        </div>
      </form>
    </div>
  );
}
