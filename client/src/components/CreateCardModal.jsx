import { useState, useRef } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import PropTypes from 'prop-types';

import { HexColorPicker } from "react-colorful";
import selectable_fonts from "../fonts/fonts.js";

// For font dropdown
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'


export default function CreateCardModal(props) {

    const [color1, setColor1] = useState("#aabbcc");
    const [color2, setColor2] = useState("#aabbcc");
    const [selectedFont, setSelectedFont] = useState("Arial");
    const [colorPicker1Open, setColorPicker1Open] = useState(false);
    const [colorPicker2Open, setColorPicker2Open] = useState(false);

    const colorPicker1Ref = useRef(null);
    const colorPicker2Ref = useRef(null);

    const buttonHandler = () => {
        props.setModalCallback(false)
    }

    const toggleColorPicker1 = (event) => {
        if (!colorPicker1Open) {
            event.stopPropagation();
            const element = colorPicker1Ref.current;
            if (element) {
                setColorPicker1Open(true);
                element.showPopover();
            }
        }
    }

    const toggleColorPicker2 = (event) => {
        if (!colorPicker2Open) {
            event.stopPropagation();
            const element = colorPicker2Ref.current;
            if (element) {
                setColorPicker2Open(true);
                element.showPopover();
            }
        }
    }

    const closeColorPickers = () => {
        if (colorPicker1Open) {
            const element1 = colorPicker1Ref.current;
            if (element1) {
                element1.hidePopover();
            }
            setColorPicker1Open(false);
        }
        if (colorPicker2Open) {
            const element2 = colorPicker2Ref.current;
            if (element2) {
                element2.hidePopover();
            }
            setColorPicker2Open(false);
        }
    }

    const handlePopup1Click = (event) => {
        event.stopPropagation();
    }

    const handlePopup2Click = (event) => {
        event.stopPropagation();
    }

    return (
        <Dialog open={props.open} onClose={buttonHandler} className="relative z-10">
        <DialogBackdrop
            transition
            className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
                onClick={closeColorPickers}
                transition
                className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-1/2 sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
            >
                <form>

                <div className="bg-white px-4 pt-5 sm:pb-8 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                        <div className="mt-3 text-center sm:ml-4 sm:mr-5 sm:mt-0 sm:text-left w-full">

                            <label htmlFor="title">
                            <DialogTitle as="h3" className="text-base font-semibold text-gray-900">
                                Title
                            </DialogTitle>
                            </label>

                            <input type="text" className="outline outline-2 outline-gray-300 focus:outline-pink-300 rounded-sm mx-0.5 my-2 w-full px-0.5 py-0.5" id="title"></input>

                            <label htmlFor="font">
                            <DialogTitle as="h3" className="text-base font-semibold text-gray-900">
                                Font
                            </DialogTitle>
                            </label>

                            <Menu as="div" className="relative inline-block text-left mt-2 mb-1">

                                <div>
                                    <MenuButton style={{fontFamily: `${selectedFont}`, fontSize: "1.1em"}} className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                                    {selectedFont}
                                    <ChevronDownIcon aria-hidden="true" className="-mr-1 size-5 text-gray-400" />
                                    </MenuButton>
                                </div>

                                <MenuItems
                                    transition
                                    style={{position:"fixed", height:"195px", overflowY:"auto"}}
                                    className="mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                                >
                                    <div className="py-1">
                                    {selectable_fonts.map((f, index) => (

                                        <MenuItem key={index} value={f.font} style={{fontFamily: `${f.font}`, fontSize: "1.25em"}}>
                                        <button
                                        type="button"
                                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
                                        onClick={() => {setSelectedFont(f.font)}}
                                        >
                                            {f.font}
                                        </button>
                                        </MenuItem>))
                                    }
                                    </div>
                                </MenuItems>
                            </Menu>

                            {/* <select>
                                {selectable_fonts.map((f, index) => (

                                    <option key={index} value={f.font}>
                                    <button
                                    type="button"
                                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
                                    onClick={() => {setSelectedFont(f.font)}}
                                    style={{fontFamily: `${f.font}`, fontSize: "1.25em"}}
                                    >
                                        {f.font}
                                    </button>
                                    </option>))
                                }
                            </select> */}


                            <DialogTitle as="h3" className="text-base font-semibold text-gray-900 my-2">
                                Background Color Gradient
                            </DialogTitle>

                            <button
                                type="button"
                                className="inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm hover:opacity-80 sm:mr-3 sm:w-auto"
                                style={{backgroundColor:`${color1}`}}
                                onClick={toggleColorPicker1}>
                                    Color 1
                            </button>
                            <button
                                type="button"
                                className="inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm hover:opacity-80 sm:my-2 sm:w-auto"
                                style={{backgroundColor:`${color2}`}}
                                onClick={toggleColorPicker2}>
                                    Color 2
                            </button>

                            <div className="outline outline-2 outline-gray-300 rounded-sm mx-0.5 mt-4 mb-3 w-9/10 h-7" id="gradient-bar" style={{background: `linear-gradient(45deg, ${color1}, ${color2})`}}></div>

                            <div popover="true" ref={colorPicker1Ref} onClick={handlePopup1Click} style={{position:"fixed", bottom:"200px", zIndex:"10"}}><HexColorPicker color={color1} onChange={setColor1}></HexColorPicker></div>
                            <div popover="true" ref={colorPicker2Ref} onClick={handlePopup2Click} style={{position:"fixed", bottom:"200px", zIndex:"10"}}><HexColorPicker color={color2} onChange={setColor2}></HexColorPicker></div>

                            <div className="bg-gray-50 pt-5 sm:flex sm:flex-row-reverse sm:items-end">
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

                        </div>
                    </div>
                </div>

                </form>

            </DialogPanel>
            </div>
        </div>
        </Dialog>
    )
}

CreateCardModal.propTypes = {
    open: PropTypes.bool,
    setModalCallback: PropTypes.func
};