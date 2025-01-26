declare module '*.svg' {
  import * as React from "react";
  export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
}

declare module '*.png' {
  const content: any;
  export default content;
}

declare module '*.jpg' {
  const content: any;
  export default content;
}

declare module '*.jpeg' {
  const content: any;
  export default content;
}