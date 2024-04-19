import React, { useState, useEffect } from "react";
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

export default function AppPrismaRef({ post }: { post: Post }) {
  const [isEdit, setIsEdit] = useState(false);
  const updatePost = api.post.update.useMutation();

  const { register, handleSubmit, watch, reset } = useForm<Inputs>({
    defaultValues: { name: post.name, content: post.content },
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      await updatePost.mutateAsync({
        id: post.id,
        data: { name: data.name, content: data.content },
      });
      setIsEdit(false);
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  const watchedData = watch();

  useEffect(() => {
    reset({ name: post.name, content: post.content });
  }, [post, reset]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const form = document.querySelector("form");
      const target = event.target as HTMLElement;
      if (form && !form.contains(target) && !target.closest("input")) {
        console.log("isEditをfalseにします");
        setIsEdit(false);
      }
    };

    if (isEdit) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isEdit]);
  console.log(post);

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
              <input {...register("name")} className="text-xl" />
              <input {...register("content")} className="text-xl" />
            </div>
          ) : (
            <div className="flex flex-col gap-16">
              <p className="text-xl" onClick={() => setIsEdit(true)}>
                {watchedData.name}
              </p>
              <p className="text-xl" onClick={() => setIsEdit(true)}>
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
