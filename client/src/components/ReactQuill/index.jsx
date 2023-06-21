import "./style.css";
import React, { useState, useEffect, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Quill from "quill";
import ImageResize from "quill-image-resize-module-react";
import { ImageDrop } from "quill-image-drop-module";
Quill.register("modules/imageResize", ImageResize);
Quill.register("modules/imageDrop", ImageDrop);
// Quill.register("modules/imageUpload", ReactQuillImageUploader);
//Quill.register("modules/imageUploader", ImageUploader);
const ReactQuillEditor = ({ content, setContent }) => {
  const modules = {
    toolbar: [
      [
        { header: "1" },
        { header: "2" },
        { header: [3, 4, 5, 6] },
        { font: [] },
      ],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "video", "image"],
      ["clean"],
      ["code-block"],
      [{ color: [] }],
      [{ background: [] }], // dropdown with defaults from theme
      [{ font: [] }],
      [{ align: [] }],
      [{ script: "sub" }, { script: "super" }], // superscript/subscript
      [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
      [{ direction: "rtl" }],
    ],
    imageResize: {
      module: "Resize",
      parchment: Quill.import("parchment"),
    },
    imageDrop: true,
  };
  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "link",
    "image",
    "file",
    "video",
    "code-block",
    "color",
    "align",
    "direction",
    "indent",
    "background",
    "script",
  ];

  const handleChange = (value) => {
    setContent(value);
  };

  return (
    <ReactQuill
      value={content}
      onChange={handleChange}
      modules={modules}
      formats={formats}
      className="border border-slate-400 overflow-y-auto"
    />
  );
};

export default ReactQuillEditor;
