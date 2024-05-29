import React, { useEffect, useRef, useState } from "react";

import {
  EditorContent,
  EditorProvider,
  useCurrentEditor,
  useEditor,
} from "@tiptap/react";

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

import {
  TableOfContents,
  getHierarchicalIndexes,
} from "@tiptap-pro/extension-table-of-contents";

// import UniqueID from '@tiptap-pro/extension-unique-id'
// import UniqueId from "tiptap-unique-id";
import ErrorText from "../error-text";
import MenuBar from "./MenuBar";
import UniqueID from "@tiptap-pro/extension-unique-id";
import { ToC } from "./ToC";
import classNames from "classnames";

const RichTextEditor = (props) => {
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
  const readOnly = props?.readOnly;

  const CustomDocument = Document.extend({
    content: "heading block*",
  });

  const [items, setItems] = useState([]);

  const extensions = [
    Code.configure({
      HTMLAttributes: {
        class: "my-custom-class",
      },
    }),
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
    ImageResize,
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
    UniqueID.configure({
      types: ["heading", "paragraph"],
    }),
    // TableOfContents.configure({
    //   anchorTypes: ["heading", "customAnchorType"],
    // }),
    TableOfContents.configure({
      getIndex: getHierarchicalIndexes,
      onUpdate(content) {
        setItems(content);
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
  const editor = useEditor({
    editable: !readOnly,
    // enableCoreExtensions
    // autofocus,
    // slotBefore:{
    //   <MenuBar readOnly={readOnly} value={value} toolbar={toolbar} />
    // }
    extensions: extensions,
    // editorProps={{
    //   attributes: {
    //     class:
    //       "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none min-h-48",
    //   },
    // }}
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none min-h-48 p-4",
      },
    },
    content: contentRef.current,

    onUpdate: ({ editor }) => {
      onChange(editor?.getJSON());
    },
    // name: name,
  });

  // const { editor } = useCurrentEditor();

  return (
    <div className="grid grid-cols-12 gap-4">
      <div
        className={classNames({
          "col-span-2 ": readOnly,
          hidden: !readOnly,
        })}
      >
        <div className="sticky top-0">
          <h1>Table Of Contents</h1>
          {readOnly ? <ToC items={items} editor={editor} /> : null}
        </div>
      </div>
      <div
        className={classNames("input-rich-container rich-editor  ", {
          "col-span-12": !readOnly,
          "col-span-10": readOnly,
        })}
      >
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

          {/* <EditorProvider
          editable={!readOnly}
          enableCoreExtensions
          autofocus
          slotBefore={
            <MenuBar readOnly={readOnly} value={value} toolbar={toolbar} />
          }
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
        >
          <></>
        </EditorProvider> */}
          <MenuBar editor={editor} readOnly={readOnly} value={value} />
          <EditorContent editor={editor} content={contentRef.target} />
        </fieldset>
        {!disabled && error && <ErrorText error={error} />}
      </div>
    </div>
  );
};

RichTextEditor.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  error: PropTypes.string,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  ellipsis: PropTypes.bool,
  value: PropTypes.string,
};

RichTextEditor.defaultProps = {
  error: "",
  disabled: false,
  required: false,
  ellipsis: false,
  value: "",
};

export default RichTextEditor;
