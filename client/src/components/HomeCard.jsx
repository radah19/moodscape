import React from 'react';
import './HomeCard.css'

const HomeCard = () => {
    return (
        // <div style={{display:"flex",justifyContent:"center",textAlign:"center"}}>
        //     <div class="w-4/5 max-w-ex rounded overflow-hidden shadow-lg">
        //         {/* <img class="w-full" src="/img/card-top.jpg" alt="Sunset in the mountains"/> */}
        //         <div class="px-6 py-4">
        //             <div class="font-bold text-xl mb-2">The Coldest Sunset</div>
        //             <p class="text-gray-700 text-base">
        //             Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
        //             </p>
        //         </divS>
        //         <div class="px-6 pt-4 pb-2">
        //             <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
        //             <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
        //             <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#winter</span>
        //         </div>
        //     </div>
        // </div>

        <div class="bg-white dark:bg-slate-800 rounded-lg px-6 py-8 ring-1 ring-slate-900/5 shadow-xl" id="tab" style={{display:"flex",justifyContent:"center",textAlign:"center"}}>
            <div class="italic" id="text" style={{fontFamily:"Arial, Helvetica, sans-serif"}}>
                Vibe Room Name
            </div>
            <div class="tabColor"></div>
        </div>
    )
}

export default HomeCard;