import React from "react";

type SectionTitleProps = {
  title: string;
};

const SectionTitle = ({ title }: SectionTitleProps) => {
  return <h3 className="text-4xl font-semibold">{title}</h3>;
};

export default SectionTitle;
