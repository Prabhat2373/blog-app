// const BlogPost = ({ content }) => {
//   const renderContent = (node) => {
//     switch (node.type) {
//       case "paragraph":
//         return (
//           <p style={{ textAlign: node.attrs?.textAlign }}>
//             {node.content &&
//               node.content.map((child, index) => renderContent(child))}
//           </p>
//         );
//       case "text":
//         if (node.marks?.some((mark) => mark.type === "bold")) {
//           return <b>{node.text}</b>;
//         }
//         return node.text;
//       case "image":
//         return (
//           <img
//             src={node.attrs.src}
//             alt={node.attrs.alt || ""}
//             title={node.attrs.title || ""}
//           />
//         );
//       default:
//         return null;
//     }
//   };

//   return (
//     <div>
//       {content.content.map((node, index) => (
//         <div key={index}>{renderContent(node)}</div>
//       ))}
//     </div>
//   );
// };

// export default BlogPost;
import React from "react";

const BlogPost = ({ content }) => {
  const renderContent = (node) => {
    switch (node.type) {
      case "heading":
        return React.createElement(
          `h${node.attrs?.level}`,
          { style: { textAlign: node.attrs?.textAlign } },
          node.content?.map((child, index) => renderContent(child))
        );
      case "paragraph":
        return (
          <p style={{ textAlign: node.attrs?.textAlign }}>
            {node.content?.map((child, index) => renderContent(child))}
          </p>
        );
      case "text":
        let textElement = node.text;
        node.marks?.forEach((mark) => {
          switch (mark.type) {
            case "bold":
              textElement = <b key={node.text}>{textElement}</b>;
              break;
            case "highlight":
              textElement = <mark key={node.text}>{textElement}</mark>;
              break;
            case "code":
              textElement = <code key={node.text}>{textElement}</code>;
              break;
            case "textStyle":
              textElement = (
                <span key={node.text} style={{ color: mark?.attrs?.color }}>
                  {textElement}
                </span>
              );
              break;
            default:
              break;
          }
        });
        return textElement;
      case "image":
        return (
          <img
            src={node.attrs?.src}
            alt={node.attrs?.alt || ""}
            title={node.attrs?.title || ""}
            style={{
              width: node.attrs?.width || "auto",
              height: node.attrs?.height || "auto",
              cursor: node.attrs?.cursor || "auto",
              justifyContent: node.attrs?.justifyContent || "auto",
              ...(node.attrs?.style
                ? node.attrs.style.split(";").reduce((acc, style) => {
                    const [key, value] = style.split(":");
                    acc[key.trim()] = value?.trim();
                    return acc;
                  }, {})
                : {}),
            }}
            draggable={node.attrs?.draggable}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div>
      {content.content?.map((node, index) => (
        <div key={index}>{renderContent(node)}</div>
      ))}
    </div>
  );
};

export default BlogPost;
