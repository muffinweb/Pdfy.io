const fs = require("fs");
const path = require("path");
const { html_to_pdf } = require("./../convert/convert-pack");

async function convertHtmlToPdf(fullFileNameWithPath, fileMeta){

    var convertionResult = await new Promise((resolve, reject) => {
        try {
            (async () => {
                const dataBinding = {
                    items: [
                        {
                            name: "item 1",
                            price: 100,
                        },
                        {
                            name: "item 2",
                            price: 200,
                        },
                        {
                            name: "item 3",
                            price: 300,
                        },
                    ],
                    total: 600,
                    isWatermark: true,
                };
        
                const templateHtml = fs.readFileSync(
                    path.join(process.cwd(), fullFileNameWithPath),
                    "utf8"
                );
        
                const options = {
                    format: "A4",
                    displayHeaderFooter: false,
                    margin: {
                        right: "30px",
                        left: "30px"
                    },
                    printBackground: true,
                    path: "./public/outputs/" + fileMeta.fileName + ".pdf",
                };
        
                await html_to_pdf({ templateHtml, dataBinding, options });
        
                resolve({
                    isSuccess: true,
                    outputPath: "/outputs/" + fileMeta.fileName + ".pdf",
                    message: "Successfully converted"
                });

            })();
        } catch (err) {
            reject({
                isSuccess: false,
                message: err
            })
        }
    })

    return convertionResult;

}

export { convertHtmlToPdf }
