import { TextSelection } from "@tiptap/pm/state";
import { useCurrentEditor } from "@tiptap/react";

// export const ToCItem = ({ item, onItemClick }) => {
//   return (
//     <div
//       className={`toc--item toc--item--level_${item.level}`}
//       style={{
//         "--level": item.level,
//       }}
//     >
//       <a
//         style={{
//           display: "block",
//           backgroundColor: item.isActive ? "rgba(0, 0, 0, .05)" : "transparent",
//           color: item.isScrolledOver && !item.isActive ? "#888" : "#000",
//           borderRadius: "4px",
//         }}
//         href={`#${item.id}`}
//         onClick={(e) => onItemClick(e, item.id)}
//       >
//         {item.itemIndex}. {item.textContent}
//       </a>
//     </div>
//   );
// };

const ToCItem = ({ item, onItemClick }) => {
  return (
    <div
      className={`pl-${item.level * 2} my-1`}
      style={{
        "--level": item.level,
      }}
    >
      <a
        href={`#${item.id}`}
        onClick={(e) => onItemClick(e, item.id)}
        className={`
          block 
          rounded 
          transition-colors 
          duration-200 
          ${item.isActive ? "bg-gray-200 dark:bg-gray-700" : "bg-transparent"} 
          ${
            item.isScrolledOver && !item.isActive
              ? "text-gray-500"
              : "text-black dark:text-white"
          }
        `}
      >
        {item.itemIndex}. {item.textContent}
      </a>
    </div>
  );
};
export const ToCEmptyState = () => {
  return (
    <div className="toc--empty_state">
      <p>Start editing your document to see the outline.</p>
    </div>
  );
};

export const ToC = ({ items = [], editor }) => {
  // const { editor } = useCurrentEditor();
  console.log("editor", editor);
  console.log("items", items);
  if (items.length === 0) {
    return <ToCEmptyState />;
  }

  const onItemClick = (e, id) => {
    e.preventDefault();

    if (editor) {
      const element = editor.view.dom.querySelector(`[data-toc-id="${id}"`);
      const pos = editor.view.posAtDOM(element, 0);

      // set focus
      const tr = editor.view.state.tr;

      tr.setSelection(new TextSelection(tr.doc.resolve(pos)));

      editor.view.dispatch(tr);

      editor.view.focus();

      if (history.pushState) {
        // eslint-disable-line
        history.pushState(null, null, `#${id}`); // eslint-disable-line
      }

      window.scrollTo({
        top: element.getBoundingClientRect().top + window.scrollY,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="toc--list">
      {items.map((item, i) => (
        <ToCItem
          onItemClick={onItemClick}
          key={item.id}
          item={item}
          index={i + 1}
        />
      ))}
    </div>
  );
};
