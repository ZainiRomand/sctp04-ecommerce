import React, { useState } from 'react';
import { useJwt } from './UserStore';
import { useFlashMessage } from './FlashMessageStore';
import { useLocation } from 'wouter';

export default function UserLogout() {
    const { getJwt, clearJwt } = useJwt();
    const { showMessage } = useFlashMessage();
    const [showDialog, setShowDialog] = useState(false);
    const [, setLocation] = useLocation();

    const confirmLogout = () => {
        console.log('logout clicked');
        const token = getJwt();
        if (!token) {
            showMessage('You are not logged in.', 'danger');
            return;
        }

        setShowDialog(true);
        console.log(showDialog);
    }

    const onConfirm = () => {
        handleLogout();
        setShowDialog(false);
    }

    const onCancel = () => {
        setShowDialog(false);
    }

    const handleLogout = () => {
        clearJwt();
        setLocation("/login");
        showMessage("You have successfully logout from E-Shop", "success");
    }

    return (
        <div className="container mt-5 mb-3">
            <h2>Logout</h2>
            {
                showDialog &&
                <div className="overlay">
                <div className="dialog">
                  <h4>Proceed to logout from E-Shop?</h4>
                  <div>
                    <button className="btn btn-primary m-2" onClick={onConfirm}>Yes</button>
                    <button className="btn btn-secondary m-2" onClick={onCancel}>No</button>
                  </div>
                </div>
              </div>
            }
            <button type="submit" className="btn btn-primary" onClick={confirmLogout}>Logout</button>
        </div>
    )
}