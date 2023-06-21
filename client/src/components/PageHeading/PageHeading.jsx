import { ReactNode } from "react";

import Loading from "../Loading/Loading";

const PageHeading = ({ title, actions = [], breadcrumb, loading = false }) => {
  return (
    <div className="page-heading">
      <div className="flex items-center justify-start">
        {breadcrumb ? (
          loading ? (
            <Loading />
          ) : (
            <div className="breadcrumb mb-2">{breadcrumb}</div>
          )
        ) : null}
      </div>
      <div className="md:flex md:items-end md:justify-between">
        <div className="flex-1 min-w-0">
          {loading ? (
            <Loading />
          ) : (
            <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
          )}
        </div>
        <div className="mt-4 flex md:mt-0 md:ml-4 gap-3">
          {actions.map((item) => item)}
        </div>
      </div>
    </div>
  );
};

export default PageHeading;
