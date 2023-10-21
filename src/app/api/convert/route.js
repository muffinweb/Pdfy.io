'use server';

import { NextRequest, NextResponse } from "next/server";
import { convertHtmlToPdf } from "../function-hooks/html-to-pdf-hook";
import * as fs from 'node:fs/promises';
import path from "path"

//UUID Generator
function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
        .replace(/[xy]/g, function (c) {
            const r = Math.random() * 16 | 0,
                v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
}

export async function POST(request, response){

    //Get HTML Binary from request
   const { htmlBinary } = await request.json();

   const randomName = uuidv4();
   const ext = "html";

   //Create file randomName.extension
   const generatedFileName = randomName + "." + ext;

   const generatedFileNamePathed = "public/uploads/" + generatedFileName;

   const fileMeta = {
       ext: ext,
       fileName: randomName,
       fullName: generatedFileName,
       fullPath: generatedFileNamePathed
   }

   //Move uploaded file
   await fs.writeFile(path.join(process.cwd(), generatedFileNamePathed), htmlBinary);


    var processInfo = await convertHtmlToPdf(generatedFileNamePathed, fileMeta)
    
    return NextResponse.json(processInfo)
}