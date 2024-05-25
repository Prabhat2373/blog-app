const BlogPost = ({ content }) => {
  const renderContent = (node) => {
    switch (node.type) {
      case "paragraph":
        return (
          <p style={{ textAlign: node.attrs?.textAlign }}>
            {node.content &&
              node.content.map((child, index) => renderContent(child))}
          </p>
        );
      case "text":
        if (node.marks?.some((mark) => mark.type === "bold")) {
          return <b>{node.text}</b>;
        }
        return node.text;
      case "image":
        return (
          <img
            src={node.attrs.src}
            alt={node.attrs.alt || ""}
            title={node.attrs.title || ""}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div>
      {content.content.map((node, index) => (
        <div key={index}>{renderContent(node)}</div>
      ))}
    </div>
  );
};

export default BlogPost;
