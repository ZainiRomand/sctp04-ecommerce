import React from 'react';
import { atom, useAtom } from 'jotai';

export const showConfirmDialogAtom = atom(false);
export const confirmDialogCallbacksAtom = atom({
    onConfirm: null,
    onCancel: null
});

export const useConfirmDialog = () => {
    const [showDialog, setShowDialog] = useAtom(showConfirmDialogAtom);
    const [callbacks] = useAtom(confirmDialogCallbacksAtom);

    const openDialog = () => {
        setShowDialog(true);
    };

    const closeDialog = () => {
        setShowDialog(false);
    };

    const handleConfirm = () => {
        if (callbacks.onConfirm) 
            callbacks.onConfirm();  // Trigger the onConfirm callback
        setShowDialog(false);  // Close the dialog
    };

    const handleCancel = () => {
        if (callbacks.onCancel) 
            callbacks.onCancel();  // Trigger the onCancel callback
        setShowDialog(false);  // Close the dialog
    };

    return {
        showDialog,
        setShowDialog,
        openDialog,
        closeDialog,
        handleConfirm,
        handleCancel
    };
}