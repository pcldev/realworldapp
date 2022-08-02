import React, { useState } from "react";

interface ITabsProps {
  elements?: HTMLElement;
  children: any;
  activeTab?: number;
}
const Tabs = (props: ITabsProps) => {
  const { activeTab } = props;
  return <div>{props.children[activeTab]}</div>;
};

export default Tabs;
