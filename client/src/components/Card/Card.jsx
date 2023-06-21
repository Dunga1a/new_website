import { ReactNode } from "react";

const Card = ({ className, children, title, footer }) => {
  return (
    <div
      className={`bg-white overflow-hidden shadow clowny-card rounded-lg ${
        className ? className : ""
      }`}
    >
      {title ? (
        <div className="px-4 sm:px-6 py-5 text-base font-semibold border-b">
          {title}
        </div>
      ) : null}

      {children}

      {footer ? (
        <div className="px-4 sm:px-6 py-5 text-base font-semibold border-t">
          {footer}
        </div>
      ) : null}
    </div>
  );
};

// eslint-disable-next-line react/display-name
Card.Content = ({ className, children }) => {
  return (
    <div className={`px-4 py-5 sm:p-6 ${className ? className : ""}`}>
      {children}
    </div>
  );
};

export default Card;
