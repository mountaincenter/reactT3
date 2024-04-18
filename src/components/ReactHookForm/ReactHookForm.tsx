import React from "react";
import AppPrisma from "./FormExamplePrisma";
import AppPrismaRef from "./FormExamplePrismaRef";

import { api } from "~/utils/api";

const ReactHookForm = () => {
  const { data: posts } = api.post.getAll.useQuery();
  const post = posts && posts[0];
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-12">
        {post && <AppPrisma post={post} />}
        {post && <AppPrismaRef post={post} />}
      </div>
    </div>
  );
};

export default ReactHookForm;
