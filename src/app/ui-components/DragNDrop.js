{
/**
 * DragNDrop Component
 * @author Ugur Cengiz - <muffinweb|ugurcengiz.mail@icloud.com>
 */
}
import {useEffect} from "react";

const DragNDrop = ({ actionURL, initialText }) => {

    { /** When component loads, greencss should be recognized. */}
    useEffect(() => {
        document.querySelector('.DragNDropLine').classList.remove("border-green-600")
    }, []);

    function OnDragEnterAction(event){
        event.preventDefault()
        event.stopPropagation()
        document.querySelector('.DragNDropLine').classList.add("border-green-600")
        console.log('dr enter')
    }

    function OnDragLeaveAction(event){
        event.preventDefault()
        event.stopPropagation()
        document.querySelector('.DragNDropLine').classList.remove("border-green-600")

        console.log('dr leave')
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
        console.log("dr drop")
    }

    function handleInputFile(event){
        const htmlFile = event.target.files[0];
        const fileReader = new FileReader()

        //Handler
        fileReader.onload = (evt) => {
            console.log(evt.target.result);
        }

        //Trigger
        fileReader.readAsBinaryString(htmlFile)
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