'use server';

import { NextRequest, NextResponse } from "next/server";
import { convertHtmlToPdf } from "../function-hooks/html-to-pdf-hook";
import * as fs from "node:fs";
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

    //Get Form Data FROM Request 
    const requestFormData = await request.formData();

    //Get htmlBinary prop from FormData
    const htmlBinary = requestFormData.get('htmlBinary');

    //Generate UUID
    const randomName = uuidv4();

    //File Extension
    const ext = "html";

    //Create file randomName.extension
    const generatedFileName = randomName + "." + ext;

    //Generated FullPath
    const generatedFileNamePathed = process.cwd() + "/public/uploads/" + generatedFileName;

   //Payload of required parts of data
   const fileMeta = {
       ext: ext,
       fileName: randomName,
       fullName: generatedFileName,
       fullPath: generatedFileNamePathed
   }

    // Move uploaded file
    await fs.writeFileSync(fileMeta.fullPath, htmlBinary);

 
    var processInfo = await convertHtmlToPdf(generatedFileNamePathed, fileMeta)
    return NextResponse.json(processInfo)
}