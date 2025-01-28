import { useState, useEffect } from 'react';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle, Description } from '@headlessui/react';
import PropTypes from 'prop-types';
import Cookies from 'js-cookie';
import MediaCard from './MediaCard';
import EditMediaModal from './EditMediaModal';
import './MediaCard.css';
import { apiClient } from '../../client';


const MediaModal = (props) => {

    const [mediaList, setMediaList] = useState([]);
    const [text, setText] = useState("");
    const [image, setImage] = useState("");
    const [id, setId] = useState(0);

    const[editModalOpen, setEditModalOpen] = useState(false);
    const [initialEditItem, setInitialEditItem] = useState({id: '', vibe_room_id: '', img_link: '', txt: ''});

    useEffect(() => {
        setMediaList(props.mediaList);
        setId(props.room_id);
    }, [props]);

    const buttonHandler = () => {
        props.setModalCallback(false)
    }

    const deleteMedia = async (event, media_id) => {
        try {
            event.preventDefault();
            console.log(media_id);
            const csrfToken = Cookies.get('csrftoken');
            const response = await apiClient.fetch(`/media/${media_id}/`, {
                method: "DELETE",
                headers: {
                    "Content-type": "application/json",
                    'X-CSRFToken': csrfToken}
            })
            if (response.status == 200) {
                const responseJSON = await response.json();
                const newMediaList = mediaList.filter((item) => item.id !== responseJSON.result[0].id);
                props.setMediaListCallback(newMediaList);
            }
        }
        catch (e) {
            console.log(e);
        }
    }

    const addMedia = async (event) => {
        try {
            event.preventDefault();
            console.log(props.room_id);
            const csrfToken = Cookies.get('csrftoken');
            const response = await apiClient.fetch(`/media/${id}/`, {
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
                props.setMediaListCallback([...mediaList,
                    {
                        id: responseJSON.result[0].id,
                        vibe_room_id: props.room_id,
                        img_link: image,
                        txt: text
                    }
                ]);
                setText("");
                setImage("");
            }
        }
        catch (e) {
            console.log(e);
        }
    }

    const editMedia = (event, edit_item) => {
        event.preventDefault();
        setInitialEditItem(edit_item);
        setEditModalOpen(true); // Open edit media modal
    }

    const editMediaListCallback = (state) => {
        props.setMediaListCallback(state);
    }

    const setEditModalCallback = (state) => {
        setEditModalOpen(state);
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
                                        Add Media
                                    </DialogTitle>
                                    </label>

                                    <Description>Text</Description>
                                    <input type="text" onChange={(event) => {setText(event.target.value)}} placeholder="Text" value={text} className="outline outline-2 outline-gray-300 focus:outline-pink-300 rounded-sm mx-0.5 my-3 w-full px-1.5 py-0.5" id="title"></input>

                                    <Description>Image Link</Description>
                                    <input type="text" onChange={(event) => {setImage(event.target.value)}} placeholder="Image Link" value={image} className="outline outline-2 outline-gray-300 focus:outline-pink-300 rounded-sm mx-0.5 my-3 w-full px-1.5 py-0.5" id="title"></input>

                                    <button
                                            type="submit"
                                            onClick={addMedia}
                                            className="inline-flex w-full justify-center rounded-md bg-pink-600 px-3 py-2 text-sm font-semibold text-white shadow-sm mt-2 hover:bg-pink-500 sm:w-auto"
                                        >
                                        Save
                                    </button>
                                </form>
                                </div>

                                <div className="pl-2 w-3/4" style={{display:"flex", flexDirection:"column", }}>

                                    <DialogTitle as="h3" className="text-base font-semibold text-gray-900 mb-2">
                                        Edit Media
                                    </DialogTitle>

                                    <div className="w-full bg-pink-200 rounded-md outline outline-2 outline-gray-300 mb-1 mt-2 overflow-y-auto" id="media_items" style={{height:"8.3rem"}}>
                                        <div className="flex flex-col pr-4 py-1">
                                            {mediaList.map((item, index) => (
                                                <div key={index} className="flex flex-row">
                                                    <MediaCard text={item.txt} image={item.img_link}></MediaCard>
                                                    <div className="flex flex-col justify-center">
                                                        <svg onClick={(event) => deleteMedia(event, item.id)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-3 hover:scale-110">
                                                            <path fillRule="evenodd" d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4ZM8.58 7.72a.75.75 0 0 0-1.5.06l.3 7.5a.75.75 0 1 0 1.5-.06l-.3-7.5Zm4.34.06a.75.75 0 1 0-1.5-.06l-.3 7.5a.75.75 0 1 0 1.5.06l.3-7.5Z" clipRule="evenodd" />
                                                        </svg>
                                                        <svg onClick={(event) => editMedia(event, item)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-3 hover:scale-110">
                                                            <path d="m5.433 13.917 1.262-3.155A4 4 0 0 1 7.58 9.42l6.92-6.918a2.121 2.121 0 0 1 3 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 0 1-.65-.65Z" />
                                                            <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0 0 10 3H4.75A2.75 2.75 0 0 0 2 5.75v9.5A2.75 2.75 0 0 0 4.75 18h9.5A2.75 2.75 0 0 0 17 15.25V10a.75.75 0 0 0-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5Z" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <EditMediaModal
                                        setEditModalCallback={setEditModalCallback}
                                        open={editModalOpen}
                                        editMediaListCallback={editMediaListCallback}
                                        initialItem={initialEditItem}
                                        mediaList={mediaList}></EditMediaModal>

                                    <div className="pt-4 w-full sm:flex sm:flex-row-reverse sm:items-end">
                                        <button
                                            type="submit"
                                            onClick={buttonHandler}
                                            className="inline-flex w-full justify-center rounded-md bg-pink-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-pink-500 sm:w-auto"
                                        >
                                            Exit
                                        </button>
                                    </div>
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

MediaModal.propTypes = {
    open: PropTypes.bool,
    setModalCallback: PropTypes.func,
    mediaList: PropTypes.array,
    setMediaListCallback: PropTypes.func,
    room_id: PropTypes.number
}

export default MediaModal;