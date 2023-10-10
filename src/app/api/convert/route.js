'use server';

import { NextRequest, NextResponse } from "next/server";
import { convertHtmlToPdf } from "../function-hooks/html-to-pdf-hook";

export async function GET(request, response){

    var processInfo = await convertHtmlToPdf('fatura.html')
    console.log(processInfo)
    
    return NextResponse.json({
        id: 1,
        message: "Islem Tamamlandi!"
    }, {
        status: 500
    })
}