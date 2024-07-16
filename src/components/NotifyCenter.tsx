import {toast, ToastContainer} from "react-toastify";
import * as React from "react";
import 'react-toastify/dist/ReactToastify.css';

export function notifyError(text: any) {
    toast.error(text);
}

export function notifySuccess(text: any) {
    toast.success(text);
}

export function notifyWarning(text: any) {
    toast.warning(text);
}

export default function NotifyCenter(){
    return (
        <>
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
        </>
    );
}