import React, { useEffect, useRef, useState, useCallback } from "react";

import {
  BubbleMenu,
  EditorProvider,
  FloatingMenu,
  useCurrentEditor,
} from "@tiptap/react";

import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import Document from "@tiptap/extension-document";
import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import { Color } from "@tiptap/extension-color";
import TextStyle from "@tiptap/extension-text-style";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import PropTypes from "prop-types";
import classNames from "classnames";

import ErrorText from "../error-text";
import {
  IconAlignCenter,
  IconAlignLeft,
  IconAlignRight,
  IconArrowBackUp,
  IconArrowBarDown,
  IconArrowForwardUp,
  IconArrowMoveDown,
  IconArrowNarrowDown,
  IconBold,
  IconDivide,
  IconDownload,
  IconHighlight,
  IconImageInPicture,
  IconItalic,
  IconList,
  IconPalette,
  IconPhotoScan,
  IconSeparatorHorizontal,
  IconStrikethrough,
  IconTable,
  IconUnderline,
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import WithTooltip from "../WithTooltip";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const MenuBar = ({ value, toolbar = {} }) => {
  const { editor } = useCurrentEditor();
  const { image = true, table = true, color = true } = toolbar;
  const inputRef = useRef(null);
  const inputFileRef = useRef(null);

  useEffect(() => {
    if (value && editor && !editor.focused) {
      // Save cursor position
      const { from, to } = editor.state.selection;

      // Update content
      editor.commands.setContent(value, false, { preserveWhitespace: "full" });

      // Restore cursor position
      const newFrom = Math.min(from, editor.state.doc.content.size);
      const newTo = Math.min(to, editor.state.doc.content.size);
      editor.commands.setTextSelection({ from: newFrom, to: newTo });
    }
  }, [value, editor]);

  const handleClick = () => {
    inputRef.current.click();
  };

  const fileBlob = (data) => {
    const blob = new Blob([data], {
      type: data.type,
    });
    return blob;
  };

  // const addImage = useCallback(
  //   (data) => {
  //     if (data) {
  //       const file = data[0];
  //       const url = fileBlob(file);
  //       const reader = new FileReader();
  //       reader.readAsDataURL(url);
  //       reader.onloadend = function render() {
  //         const base64data = reader.result;
  //         if (base64data) {
  //           editor.chain().focus().setImage({ src: base64data }).run();
  //         }
  //       };
  //     }
  //   },
  //   [editor]
  // );
  const addImage = useCallback(() => {
    const url = window.prompt("URL");

    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);

  if (!editor) {
    return null;
  }
  useEffect(() => {
    editor.chain().focus().toggleHeading({ level: 1 }).run();
  }, []);

  return (
    <>
      {editor && (
        <BubbleMenu
          className="bubble-menu"
          tippyOptions={{ duration: 100 }}
          editor={editor}
        >
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={editor.isActive("bold") ? "is-active" : ""}
          >
            Bold
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={editor.isActive("italic") ? "is-active" : ""}
          >
            Italic
          </button>
          <button
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={editor.isActive("strike") ? "is-active" : ""}
          >
            Strike
          </button>
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            className={editor.isActive("strike") ? "is-active" : ""}
          >
            H1
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHighlight().run()}
            disabled={!editor.can().chain().focus().toggleStrike().run()}
            className={editor.isActive("strike") ? "is-active" : ""}
          >
            Highlight
          </button>
        </BubbleMenu>
      )}

      {/* {editor && (
        <FloatingMenu
          className="floating-menu"
          tippyOptions={{ duration: 100 }}
          editor={editor}
        >
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            className={
              editor.isActive("heading", { level: 1 }) ? "is-active" : ""
            }
          >
            H1
          </button>
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            className={
              editor.isActive("heading", { level: 2 }) ? "is-active" : ""
            }
          >
            H2
          </button>
          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={editor.isActive("bulletList") ? "is-active" : ""}
          >
            Bullet List
          </button>
        </FloatingMenu>
      )} */}
      <div className="flex gap-2 items-center border-b py-2 px-2 flex-wrap">
        <Button
          type="button"
          value="undo"
          variant={"outline"}
          aria-label="undo"
          // className={classNames({
          //   "bg-gray-200": editor.isActive("bold"),
          // })}
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
        >
          <IconArrowBackUp className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          value="redo"
          variant={"outline"}
          aria-label="undo"
          // className={classNames({
          //   "bg-gray-200": editor.isActive("bold"),
          // })}
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
        >
          <IconArrowForwardUp className="h-4 w-4" />
        </Button>
        <Select
          defaultValue="1"
          onValueChange={(value) => {
            if (value !== "p") {
              editor
                .chain()
                .focus()
                .toggleHeading({ level: Number(value) })
                .run();
            } else {
              editor.chain().focus().setParagraph().run();
            }
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Tag" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {/* <SelectLabel>Tags</SelectLabel> */}

              <SelectItem
                onClick={() =>
                  editor.chain().focus().toggleHeading({ level: 1 }).run()
                }
                className={
                  editor.isActive("heading", { level: 1 }) ? "is-active" : ""
                }
                variant="unstyled"
                size="xs"
                value="1"
              >
                Heading 1
              </SelectItem>
              <SelectItem
                value="2"
                onClick={() =>
                  editor.chain().focus().toggleHeading({ level: 2 }).run()
                }
                className={
                  editor.isActive("heading", { level: 2 }) ? "is-active" : ""
                }
                variant="unstyled"
                size="xs"
              >
                Heading 2
              </SelectItem>
              <SelectItem
                onClick={() =>
                  editor.chain().focus().toggleHeading({ level: 3 }).run()
                }
                className={
                  editor.isActive("heading", { level: 3 }) ? "is-active" : ""
                }
                variant="unstyled"
                size="xs"
                value="3"
              >
                Heading 3
              </SelectItem>
              <SelectItem
                onClick={() =>
                  editor.chain().focus().toggleHeading({ level: 4 }).run()
                }
                className={
                  editor.isActive("heading", { level: 4 }) ? "is-active" : ""
                }
                variant="unstyled"
                size="xs"
                value="4"
              >
                Heading 4
              </SelectItem>
              <SelectItem
                onClick={() =>
                  editor.chain().focus().toggleHeading({ level: 5 }).run()
                }
                className={
                  editor.isActive("heading", { level: 5 }) ? "is-active" : ""
                }
                variant="unstyled"
                size="xs"
                value="5"
              >
                Heading 5
              </SelectItem>
              <SelectItem
                onClick={() => editor.chain().focus().setParagraph().run()}
                className={editor.isActive("paragraph") ? "is-active" : ""}
                variant="unstyled"
                size="xs"
                value="p"
              >
                Paragraph
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Button
          type="button"
          value="bold"
          variant={"outline"}
          aria-label="Toggle bold"
          className={classNames({
            "bg-gray-200": editor.isActive("bold"),
          })}
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
        >
          <IconBold className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          value="italic"
          variant={"outline"}
          aria-label="Toggle italic"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={classNames({
            "bg-gray-200": editor.isActive("italic"),
          })}
        >
          <IconItalic className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          value="underline"
          variant={"outline"}
          aria-label="Toggle underline"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
          className={classNames({
            "bg-gray-200": editor.isActive("strike"),
          })}
        >
          <IconUnderline className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          value="highlight"
          variant={"outline"}
          aria-label="Toggle underline"
          onClick={() => editor.chain().focus().toggleHighlight().run()}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
          className={classNames({
            "bg-gray-200": editor.isActive("highlight"),
          })}
        >
          <IconHighlight className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant={"outline"}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          // disabled={!editor.chain().focus().toggleBulletList().run()}
          className={classNames({
            "bg-gray-200": editor.isActive("bulletList"),
          })}
        >
          <IconList className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant={"outline"}
          onClick={() => editor.commands.setTextAlign("left")}
          // disabled={!editor.chain().focus().toggleBulletList().run()}
          className={classNames({
            "bg-gray-200": editor.isActive("left"),
          })}
        >
          <IconAlignLeft className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant={"outline"}
          onClick={() => editor.commands.setTextAlign("center")}
          // disabled={!editor.chain().focus().toggleBulletList().run()}
          className={classNames({
            "bg-gray-200": editor.isActive("center"),
          })}
        >
          <IconAlignCenter className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant={"outline"}
          onClick={() => editor.commands.setTextAlign("right")}
          // disabled={!editor.chain().focus().toggleBulletList().run()}
          className={classNames({
            "bg-gray-200": editor.isActive("right"),
          })}
        >
          <IconAlignRight className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant={"outline"}
          onClick={() => editor.chain().focus().setHorizontalRule().run()}

          // className={classNames({
          //   "bg-gray-200": editor.isActive("divide"),
          // })}
        >
          <IconDivide className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant={"outline"}
          onClick={() => editor.chain().focus().setHardBreak().run()}

          // className={classNames({
          //   "bg-gray-200": editor.isActive("divide"),
          // })}
        >
          <IconArrowBarDown className="h-4 w-4" />
        </Button>
        {/* <Button
type="button"
            variant={"outline"}
            value={editor.getAttributes("textStyle").color}
            onInput={(event) =>
              editor.chain().focus().setColor(event.target.value).run()
            }
  
            // className={classNames({
            //   "bg-gray-200": editor.isActive("divide"),
            // })}
          >
            <IconPalette className="h-4 w-4" />
          </Button> */}
        {color && (
          <input
            type="color"
            onInput={(event) =>
              editor.chain().focus().setColor(event.target.value).run()
            }
            value={editor.getAttributes("textStyle").color}
            data-testid="setColor"
            style={{ width: "21px", height: "21px" }}
          />
        )}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button type="button" variant="outline">
              <IconTable />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuGroup>
              <DropdownMenuItem
                onClick={() =>
                  editor
                    .chain()
                    .focus()
                    .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
                    .run()
                }
              >
                New Table
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => editor.chain().focus().addColumnBefore().run()}
                disabled={!editor.can().addColumnBefore()}
              >
                Add Column Before
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => editor.chain().focus().addColumnAfter().run()}
                disabled={!editor.can().addColumnAfter()}
              >
                Add Column After
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => editor.chain().focus().deleteColumn().run()}
                disabled={!editor.can().deleteColumn()}
              >
                Delete Column
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => editor.chain().focus().addRowBefore().run()}
                disabled={!editor.can().addRowBefore()}
              >
                Add Row Before
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => editor.chain().focus().addRowAfter().run()}
                disabled={!editor.can().addRowAfter()}
              >
                Add Row After
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => editor.chain().focus().deleteRow().run()}
                disabled={!editor.can().deleteRow()}
              >
                Delete Row
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => editor.chain().focus().deleteTable().run()}
                disabled={!editor.can().deleteTable()}
              >
                Delete Table
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        {image && (
          <WithTooltip description="Insert Image">
            <Button
              type="button"
              variant={"outline"}
              // icon={<ImageIcon />}
              // ref={inputFileRef}
              // onClick={handleClick}
              onClick={addImage}
            >
              <IconImageInPicture />
            </Button>
          </WithTooltip>
        )}
        <input
          type="file"
          onChange={(event) => addImage(event.target.files)}
          ref={inputRef}
          hidden
          accept="image/jpeg,image/gif,image/png,image/x-eps"
        />
        <Button
          type="button"
          variant={"outline"}
          onClick={() => console.log("output", editor.getJSON())}
        >
          <IconDownload />
        </Button>
      </div>
    </>
  );
};

export default MenuBar;
