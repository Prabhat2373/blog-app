import { useEffect, useRef, useState } from "react";

import { EditorProvider } from "@tiptap/react";

import { Color } from "@tiptap/extension-color";
import Document from "@tiptap/extension-document";
import Highlight from "@tiptap/extension-highlight";
import Image from "@tiptap/extension-image";
import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import TextAlign from "@tiptap/extension-text-align";
import TextStyle from "@tiptap/extension-text-style";
import StarterKit from "@tiptap/starter-kit";
import PropTypes from "prop-types";
import Placeholder from "@tiptap/extension-placeholder";
import ImageResize from "tiptap-extension-resize-image";
import Code from "@tiptap/extension-code";

import ErrorText from "../error-text";
import MenuBar from "./MenuBar";

const RichText = (props) => {
  const {
    name,
    label,
    error,
    disabled,
    required,
    ellipsis,
    onChange = () => {},
    value,
    toolbar = {},
    tableResize = false,
  } = props;

  const CustomDocument = Document.extend({
    content: "heading block*",
  });

  const extensions = [
    Code.configure({
      HTMLAttributes: {
        class: "my-custom-class",
      },
    }),
    ImageResize,
    StarterKit.configure({
      document: false,
    }),
    CustomDocument,
    TextAlign.configure({
      types: ["heading", "paragraph"],
    }),
    Highlight,
    // Text,
    TextStyle,
    Color,
    Document,
    Table.configure({
      resizable: tableResize,
    }),
    Image.configure({
      allowBase64: true,
      inline: true,
    }),
    TableCell,
    TableHeader,
    TableRow,
    Placeholder.configure({
      placeholder: ({ node }) => {
        console.log("node", node);
        if (node.type.name === "heading") {
          return "What’s the title?";
        }

        return "Can you add some further context?";
      },
    }),
  ];
  const contentRef = useRef(value);

  const [border, setBorder] = useState("");
  const handleInput = (style) => {
    if (error && !disabled) {
      setBorder("error");
    } else {
      setBorder(style);
    }
  };

  useEffect(() => {
    if (disabled) {
      setBorder("");
    }
  }, []);

  useEffect(() => {
    handleInput("");
  }, [error]);

  return (
    <div className="input-rich-container rich-editor  ">
      <fieldset
        className={"border rounded-md"}
        onFocusCapture={() => handleInput("active")}
        onBlur={() => handleInput("")}
      >
        {label && (
          <legend>
            {/* <FormLabel
              disabled={disabled}
              label={label}
              required={required}
              ellipsis={ellipsis}
            /> */}
            <label>{label}</label>
          </legend>
        )}

        <EditorProvider
          autofocus
          slotBefore={<MenuBar value={value} toolbar={toolbar} />}
          extensions={extensions}
          editorProps={{
            attributes: {
              class:
                "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none min-h-48",
            },
          }}
          content={contentRef.target}
          onUpdate={({ editor }) => {
            onChange(editor?.getJSON());
          }}
          name={name}
        />
      </fieldset>
      {!disabled && error && <ErrorText error={error} />}
    </div>
  );
};

RichText.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  error: PropTypes.string,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  ellipsis: PropTypes.bool,
  value: PropTypes.string,
};

RichText.defaultProps = {
  error: "",
  disabled: false,
  required: false,
  ellipsis: false,
  value: "",
};

export default RichText;
