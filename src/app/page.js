'use client'

import DragNDrop from "@/app/ui-components/DragNDrop";
import { useState } from "react";

export default function Home() {

    const [previewDom, setPreviewDom] = useState("");
    const [resultPdf, setResultPdf] = useState("");

  return (
    <main className='flex flex-col w-screen h-screen bg-white'>
        <div className="w-full h-[112px] bg-blue-800">
          <div className="w-56 h-24 border border-black ml-3 mt-3 p-5">
              <DragNDrop
                  actionURL="/api/convert"
                  initialText="Choose HTML File"
                  setters={{
                      setPreviewDom,
                      setResultPdf
                  }}
              />
          </div>
        </div>

        <div className="w-full flex flex-row">
            <div className="w-1/2 h-[800px] border-black overflow-scroll">

                {
                    (previewDom.length > 0) && <iframe className="w-screen h-screen" srcDoc={previewDom} />
                }

            </div>

            <div dangerouslySetInnerHTML={{__html: resultPdf}} className="w-1/2 h-[800px] border-black bg-gray-200">

            </div>
        </div>

    </main>
  )
}
