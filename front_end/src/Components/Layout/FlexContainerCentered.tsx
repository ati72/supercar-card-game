import { ReactNode } from "react";

export const FlexContainerCentered: React.FC<{ children: ReactNode }> = (
  props
) => {
  return <div className="error-page">{props.children}</div>;
};
