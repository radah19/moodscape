import { useState } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'

import { HexColorPicker } from "react-colorful";



export default function CreateCardModal(props) {

    const [color1, setColor1] = useState("#aabbcc");
    const [color2, setColor2] = useState("#aabbcc");
    const [modal1Show, setModal1Show] = useState(false);
    const [modal2Show, setModal2Show] = useState(false);

    const buttonHandler = () => {
        props.setModalCallback(false)
    }

    const showModal1 = () => {
        setModal1Show(true);
    }

    const showModal2 = () => {
        setModal2Show(true);
    }

    const closeModals = () => {
        setModal1Show(false);
        setModal2Show(false);
    }

    return (
        <Dialog open={props.open} onClose={buttonHandler} className="relative z-10" onClick={closeModals}>
        <DialogBackdrop
            transition
            className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
                transition
                className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
            >
                <form>

                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                        <div className="mt-3 text-center sm:ml-4 sm:mr-5 sm:mt-0 sm:text-left">

                            <label for="title">
                            <DialogTitle as="h3" className="text-base font-semibold text-gray-900">
                                Title
                            </DialogTitle>
                            </label>

                            <input type="text" className="outline outline-2 outline-gray-300 focus:outline-pink-300 rounded-sm mx-0.5 my-2 w-full" id="title"></input>

                            <label for="font">
                            <DialogTitle as="h3" className="text-base font-semibold text-gray-900">
                                Font
                            </DialogTitle>
                            </label>

                            <select className="sm:my-2 w-1/2" id="font"></select>

                            <DialogTitle as="h3" className="text-base font-semibold text-gray-900">
                                Background color gradient
                            </DialogTitle>

                            <button
                                type="button"
                                className="inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm hover:opacity-80 sm:mr-3 sm:w-auto"
                                style={{backgroundColor:`${color1}`}}
                                onClick={showModal1}>
                                    Color 1
                            </button>
                            <button
                                type="button"
                                className="inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm hover:opacity-80 sm:my-2 sm:w-auto"
                                style={{backgroundColor:`${color2}`}}
                                onClick={showModal2}>
                                    Color 2
                            </button>

                            <HexColorPicker color={color1} onChange={setColor1} />
                            <HexColorPicker color={color1} onChange={setColor2} />

                            { modal1Show ? <HexColorPicker color={color1} onChange={setColor1} /> : <div></div> }

                            { modal2Show ? <HexColorPicker color={color1} onChange={setColor2} /> : <div></div> }

                        </div>
                    </div>
                </div>

                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                        type="submit"
                        onClick={buttonHandler}
                        className="inline-flex w-full justify-center rounded-md bg-pink-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-pink-500 sm:ml-3 sm:w-auto"
                    >
                        Create Room
                    </button>
                    <button
                        type="button"
                        data-autofocus
                        onClick={buttonHandler}
                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    >
                        Cancel
                    </button>
                </div>

                </form>

            </DialogPanel>
            </div>
        </div>
        </Dialog>
    )
}