'use client'

import {useEffect} from "react"
import Dropzone from "dropzone"
import DragNDrop from "@/app/ui-components/DragNDrop";

export default function Home() {

  return (
    <main className='flex w-screen h-screen bg-gray-300'>
      
      <div className="w-56 h-24 border border-black ml-3 mt-3 p-5">
          <DragNDrop actionURL="https://google.com.tr/upload" initialText="Drag'N Drop" />
      </div>
    </main>
  )
}
