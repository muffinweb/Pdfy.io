{
/**
 * DragNDrop Component
 * @author Ugur Cengiz - <muffinweb|ugurcengiz.mail@icloud.com>
 */
}
import {useEffect} from "react";
import axios from "axios";

const DragNDrop = ({ actionURL, initialText, setters }) => {

    { /** When component loads, greencss should be recognized. */}
    useEffect(() => {
        document.querySelector('.DragNDropLine').classList.remove("border-green-600")
    }, []);

    function OnDragEnterAction(event){
        event.preventDefault()
        event.stopPropagation()
        document.querySelector('.DragNDropLine').classList.add("border-green-600")
    }

    function OnDragLeaveAction(event){
        event.preventDefault()
        event.stopPropagation()
        document.querySelector('.DragNDropLine').classList.remove("border-green-600")
    }

    {
        /**
         * @todo this will be fixed later
         */
    }
    function handleOnDrop(event){
        //Default behavior disabling..
        event.preventDefault()
        event.stopPropagation()
    }

    function handleInputFile(event){
        const htmlFile = event.target.files[0];
        const fileReader = new FileReader()

        //Handler
        fileReader.onload = (evt) => {
            //Preview HTML FILE
            setters.setPreviewDom(evt.target.result)

            uploadFileToConvert(evt.target.result)
        }

        //Trigger
        fileReader.readAsText(htmlFile, 'utf8')
    }

    function uploadFileToConvert(htmlBinaryData){
        axios.post(actionURL, {
            htmlBinary:htmlBinaryData
        }).then(res => {
            console.log('ii');
            console.log(res);
            if(res.data.isSuccess){
                window.open(res.data.outputPath,true)
            }
        })
    }

    return(
    <>
        <label htmlFor="upload-input" onDragEnter={OnDragEnterAction} onDragLeave={OnDragLeaveAction}>
            <div className="border-2 border-black border-green-600 border-dotted w-full py-3 text-center DragNDropLine">
                <span className="font-mono content-center">{ initialText }</span>
            </div>
        </label>
        <input onChange={e => handleInputFile(e)} onDrop={handleOnDrop} className="hidden" id="upload-input" type="file"/>
    </>
)
}

export default DragNDrop