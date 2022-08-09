interface IPopularTagsComponentProps {
  tag: String;
  setTag: (value: String) => void;
  onChangeTabHandler: (value: number) => void;
}

const PopularTagsComponent = (props: IPopularTagsComponentProps) => {
  const { tag, setTag, onChangeTabHandler } = props;
  return (
    <button
      onClick={() => {
        onChangeTabHandler(2);
        setTag(tag);
      }}
      style={{ border: "none" }}
      className="tag-pill tag-default"
    >
      {tag}
    </button>
  );
};

export default PopularTagsComponent;
