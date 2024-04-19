import React, { useState, useEffect } from "react";
import AppPrisma from "./FormExamplePrisma";
import AppPrismaRef from "./FormExamplePrismaRef";

import { api } from "~/utils/api";

const ReactHookForm = () => {
  const { data: posts } = api.post.getAll.useQuery();
  const post = posts?.[0];

  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest("form") && !target.closest("input")) {
        setIsEdit(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-12">
        {post && <AppPrisma post={post} />}
        {post && (
          <AppPrismaRef post={post} isEdit={isEdit} setIsEdit={setIsEdit} />
        )}
      </div>
    </div>
  );
};

export default ReactHookForm;
