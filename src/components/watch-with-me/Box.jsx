import { useState } from "react";

export default function Box({ children, clas }) {
  return <div className={`box ${clas}`}>{children}</div>;
}
