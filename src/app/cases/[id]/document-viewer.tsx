import React, { useCallback, useEffect, useRef } from "react";
import { PdfHighlighter, Highlight, AreaHighlight, Tip, PdfLoader, ScaledPosition, Content, IHighlight, Popup } from "react-pdf-highlighter";
// import { pdfjs } from "react-pdf";
import "react-pdf-highlighter/dist/style.css";
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import { DocumentHighlight } from "@/models/case";
// import pdfJsWorkerSrc from "pdfjs-dist/build/pdf.worker.entry";

// Set the worker for PDF.js
// pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
// pdfjs.GlobalWorkerOptions.workerSrc = "pdfjs-dist/build/pdf.worker.entry";
// pdfjs.GlobalWorkerOptions.workerSrc = new pdfjs.PDFWorker();

type DocumentViewerProps = {
  url: string;
  highlights: DocumentHighlight[];
};

const parseIdFromHash = () =>
  document.location.hash.slice("#highlight-".length);

const resetHash = () => {
  document.location.hash = "";
};


export default function DocumentViewer({ url, highlights }: DocumentViewerProps) {
  // const renderHighlight = (highlight: Highlight) => (
  //   <AreaHighlight
  //     key={highlight.id}
  //     highlight={highlight}
  //   // position={highlight.position}
  //   // comment={<Tip>{highlight.content}</Tip>}
  //   />
  // );

  // const renderPopup = (highlight: BoundingBox) => (
  //   <Popup
  //     position={highlight.position.boundingRect}
  //     pageNumber={highlight.position.pageNumber}
  //     children={<div>{highlight.content}</div>}
  //   />
  // );
  // const highlighterUtilsRef = useRef<PdfHighlighterUtils>(null);

  const scrollViewerTo = useRef((highlight: IHighlight) => {});

  const getHighlightById = (id: string) => {
    return highlights.find((highlight) => highlight.id === id);
  };

  const scrollToHighlightFromHash = useCallback(() => {
    console.log("scrollToHighlightFromHash", parseIdFromHash(), highlights);
    const highlight = getHighlightById(parseIdFromHash());
    // const highlight = highlights[0];
    if (highlight) {
      console.log("Highlight found", highlight);
      scrollViewerTo.current(highlight);
    }
  }, [highlights]);

  useEffect(() => {
    window.addEventListener("hashchange", scrollToHighlightFromHash, false);
    return () => {
      window.removeEventListener(
        "hashchange",
        scrollToHighlightFromHash,
        false,
      );
    };
  }, [scrollToHighlightFromHash]);

  // const addHighlight = (highlight: NewHighlight) => {
  //   console.log("Saving highlight", highlight);
  //   setHighlights((prevHighlights) => [
  //     { ...highlight, id: getNextId() },
  //     ...prevHighlights,
  //   ]);
  // };

  const updateHighlight = (
    highlightId: string,
    position: Partial<ScaledPosition>,
    content: Partial<Content>,
  ) => {
    console.log("Updating highlight", highlightId, position, content);
    // setHighlights((prevHighlights) =>
    //   prevHighlights.map((h) => {
    //     const {
    //       id,
    //       position: originalPosition,
    //       content: originalContent,
    //       ...rest
    //     } = h;
    //     return id === highlightId
    //       ? {
    //           id,
    //           position: { ...originalPosition, ...position },
    //           content: { ...originalContent, ...content },
    //           ...rest,
    //         }
    //       : h;
    //   }),
    // );
  };

  const HighlightPopup = ({
    comment,
  }: {
    comment: { text: string; emoji: string };
  }) =>
    comment.text ? (
      <div className="Highlight__popup">
        {comment.emoji} {comment.text}
      </div>
    ) : null;

  document.location.hash = `highlight-${highlights[0].id}`;

  return (
    <div className="flex flex-col w-full h-full">
      <PdfLoader url={url} beforeLoad={<div className="loader" autoFocus={true}/>}>
        {(pdfDocument) => (
          <PdfHighlighter
            pdfDocument={pdfDocument}
            highlights={highlights}
            enableAreaSelection={(event) => event.altKey}
            onScrollChange={resetHash}
            scrollRef={(scrollTo) => {
              scrollViewerTo.current = scrollTo;
              scrollToHighlightFromHash();
              // scrollToHighlight(highlights[0]);
            }}
            onSelectionFinished={(
              position,
              content,
              hideTipAndSelection,
              transformSelection,
            ) => (
              <Tip
                onOpen={transformSelection}
                onConfirm={(comment) => {
                  // addHighlight({ content, position, comment });
                  hideTipAndSelection();
                }}
              />
            )}
            highlightTransform={(
              highlight,
              index,
              setTip,
              hideTip,
              viewportToScaled,
              screenshot,
              isScrolledTo,
            ) => {
              const isTextHighlight = !highlight.content?.image;
              
              const component = isTextHighlight ? (
                <Highlight
                  isScrolledTo={index === 0 ? true : isScrolledTo}
                  position={highlight.position}
                  comment={highlight.comment}
                />
              ) : (
                <AreaHighlight
                  isScrolledTo={index === 0 ? true : isScrolledTo}
                  highlight={highlight}
                  onChange={(boundingRect) => {
                    updateHighlight(
                      highlight.id,
                      { boundingRect: viewportToScaled(boundingRect) },
                      { image: screenshot(boundingRect) },
                    );
                  }}
                />
              );

              return (
                <Popup
                  popupContent={<HighlightPopup {...highlight} />}
                  onMouseOver={(popupContent) =>
                    setTip(highlight, (highlight) => popupContent)
                  }
                  onMouseOut={hideTip}
                  key={index}
                >
                  {component}
                </Popup>
              );

            }}
          >
          </PdfHighlighter>
        )}
      </PdfLoader>
    </div>
  );
}