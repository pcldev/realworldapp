import React from "react";
import { NavLink } from "react-router-dom";

interface IPopularTagsComponentProps {
  tag: String;
}

const PopularTagsComponent = (props: IPopularTagsComponentProps) => {
  const { tag } = props;
  return (
    <NavLink to="" className="tag-pill tag-default">
      {tag}
    </NavLink>
  );
};

export default PopularTagsComponent;
