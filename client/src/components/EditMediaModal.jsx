import { useState, useEffect } from 'react';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle, Description } from '@headlessui/react';
import PropTypes from 'prop-types';
import Cookies from 'js-cookie';

const EditMediaModal = (props) => {
    const [text, setText] = useState("");
    const [image, setImage] = useState("");

    useEffect(() => {
        setText(props.initialItem.txt);
        setImage(props.initialItem.img_link);
    }, [props]);

    const buttonHandler = () => {
        props.setEditModalCallback(false)
    }

    const saveEdit = async (event) => {
        try {
            event.preventDefault();
            const csrfToken = Cookies.get('csrftoken');
            console.log(props.initialItem.id);
            const response = await fetch(`/api/edit_media/${props.initialItem.id}/`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                    'X-CSRFToken': csrfToken},
                body: JSON.stringify({
                    img_link: image,
                    txt: text
                })
            })
            if (response.status == 201) {
                const responseJSON = await response.json();
                const newMediaList = props.mediaList.map((item) => item.id === responseJSON.result[0].id
                    ? 
                    {
                        id: responseJSON.result[0].id,
                        vibe_room_id: props.initialItem.vibe_room_id,
                        img_link: image,
                        txt: text
                    }
                    :
                    item
                );
                props.editMediaListCallback(newMediaList);
                props.setEditModalCallback(false);
            }
        }
        catch (e) {
            console.log(e);
        }
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
                        transition
                        className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 w-5/6 sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
                    >
        
                        <div className="bg-white px-4 pt-5 sm:pb-8 sm:pb-4">
                            <div className="sm:flex sm:items-start">
                                <div className="mt-3 text-center sm:ml-4 sm:mr-5 sm:mt-0 sm:text-left w-full">
        
                                    <div style={{display:"flex", flexDirection:"row", height:"15rem"}}>
                                        <div className="pr-5 w-1/2">
                                            <form>
                                                <label htmlFor="title">
                                                <DialogTitle as="h3" className="text-base font-semibold text-gray-900 mb-2">
                                                    Edit Media
                                                </DialogTitle>
                                                </label>
            
                                                <Description>Text</Description>
                                                <input type="text" onChange={(event) => {setText(event.target.value)}} placeholder="Text" value={text} className="outline outline-2 outline-gray-300 focus:outline-pink-300 rounded-sm mx-0.5 my-3 w-full px-1.5 py-0.5" id="title"></input>
            
                                                <Description>Image Link</Description>
                                                <input type="text" onChange={(event) => {setImage(event.target.value)}} placeholder="Image Link" value={image} className="outline outline-2 outline-gray-300 focus:outline-pink-300 rounded-sm mx-0.5 my-3 w-full px-1.5 py-0.5" id="title"></input>
            
                                                <button
                                                        type="submit"
                                                        onClick={saveEdit}
                                                        className="inline-flex w-full justify-center rounded-md bg-pink-600 px-3 py-2 text-sm font-semibold text-white shadow-sm mt-2 hover:bg-pink-500 sm:w-auto"
                                                    >
                                                    Save
                                                </button>
                                            </form>
                                        </div>
        
                                    </div>
            
                                </div>
                            </div>
                        </div>
            
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    )
}

EditMediaModal.propTypes = {
    initialItem: PropTypes.object,
    open: PropTypes.bool,
    setEditModalCallback: PropTypes.func,
    editMediaListCallback: PropTypes.func,
    mediaList: PropTypes.array
}

export default EditMediaModal;