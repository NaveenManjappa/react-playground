import { useState } from "react";

interface Props {
  children: string;
  maxChars?: number;
}

const ExpandableText = ({ children, maxChars = 100 }: Props) => {
  const [isExapanded, setIsExpanded] = useState(false);
  if (children.length <= maxChars) return <p>{children}</p>;
  const content = isExapanded ? children : children.substring(0, maxChars);
  return (
    <p>
      {content}{!isExapanded ? '...':null}<button onClick={() => setIsExpanded(!isExapanded)}>{isExapanded ? "Less" : "More"}</button>
    </p>
  );
};

export default ExpandableText;
