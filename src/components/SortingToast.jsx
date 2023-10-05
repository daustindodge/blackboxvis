import React, {useRef} from "react";
import {Toast} from "bootstrap";

export default function SortingToast({title, bg, toastRef})
{
    return (
        <div className="toast-container position-fixed bottom-0 end-0 p-3">
            <div ref={toastRef} id="liveToast" className={`toast align-items-center ${bg} border-0`} role="alert" aria-live="assertive" aria-atomic="true">
                <div className="d-flex">
                    <div className="toast-body">
                        {title}
                    </div>
                    <button type="button" className="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
            </div>
        </div>
    )
}