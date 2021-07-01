import "./App.css";

import { saveAs } from "file-saver";
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  FootnoteReferenceRun,
} from "docx";

const footnotes = {
  1: {
    children: [
      new Paragraph({
        text: "    This is the first footnote",
      }),
    ],
  },
  2: {
    children: [
      new Paragraph({
        text: "    This is the second footnote",
      }),
    ],
  },
};

function App() {
  const generate = () => {
    const doc = new Document({
      sections: [
        {
          children: [
            new Paragraph({
              style: "paragraph",
              children: [
                new TextRun({
                  children: ["Some Text.", new FootnoteReferenceRun(1)],
                }),
                new TextRun({
                  children: [
                    "Some Additional Text.",
                    new FootnoteReferenceRun(2),
                  ],
                }),
              ],
            }),
          ],
        },
      ],
      footnotes,
    });

    Packer.toBlob(doc).then((blob) => {
      saveAs(blob, "example.docx");
    });
  };

  return (
    <div>
      <p>
        Click the button and observe the footnote number duplicating every
        click.
        <button onClick={generate}>Generate doc</button>
      </p>
    </div>
  );
}

export default App;
