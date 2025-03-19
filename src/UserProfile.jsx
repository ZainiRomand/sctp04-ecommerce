import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useJwt } from "./UserStore";
import { Formik, Form, Field, ErrorMessage, useFormikContext } from 'formik';
import { useFlashMessage } from './FlashMessageStore';
import { atom, useAtom } from 'jotai';
import * as Yup from 'yup';

export default function UserProfile() {
    const { getJwt } = useJwt();
    const [initialValues, setInitialValues] = useState({});
    const { showMessage } = useFlashMessage();
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [showUpdateDialog, setShowUpdateDialog] = useState(false);

    useEffect(() => {
        async function fetchData() {
            const token = getJwt();
            const response = await axios.get(import.meta.env.VITE_API_URL + "/api/users/me", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            console.log(" at useEffect");
            console.log(response.data.user);
            setInitialValues(response.data.user);
        }

        fetchData();
    }, []);

    const validationSchema = Yup.object({
        name: Yup.string().required('Required'),
        email: Yup.string().email('Invalid email address').required('Required'),
        salutation: Yup.string(),
        marketingPreferences: Yup.array().of(Yup.string()),
        country: Yup.string(),
    });

    const handleSubmit = async (values, actions) => {
        try {
            console.log('update clicked');
            const token = getJwt();
            if (!token) {
                showMessage('You are not logged in.', 'danger');
                return;
            }

            await axios.put(import.meta.env.VITE_API_URL + '/api/users/me', values, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            showMessage('Profile updated successfully!', 'success');
            actions.setSubmitting(false);

        } catch (error) {
            console.error('Error updating profile:', error);
            actions.setErrors({ submit: error.response?.data?.message || 'An error occurred' });
            actions.setSubmitting(false);
        }
    };

    const onConfirmDelete = () => {
        handleDeleteAccount();
        setShowDeleteDialog(false);
    }

    const onCancelDelete = () => {
        setShowDeleteDialog(false);
    }

    const onDeleteAccount = () => {
        console.log('delete clicked');
        const token = getJwt();
        if (!token) {
            showMessage('You are not logged in.', 'danger');
            return;
        }

        setShowDeleteDialog(true);
        console.log(showDeleteDialog);
    }

    const handleDeleteAccount = async () => {
        const token = getJwt();
        if (!token) {
            showMessage('You are not logged in.', 'danger');
            return;
        }
        await axios.delete(import.meta.env.VITE_API_URL + "/api/users/me", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        showMessage("Account has been deleted", "danger");
        setLocation("/");
    }

    return (
        <div className="container mt-5">
            <h2>Edit Profile</h2>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
                enableReinitialize // Allows form to reinitialize with fetched profile data
            >
                {function (formik) {
                    return (
                        <Form>
                            <div className="container mt-5 mb-3">
                                {
                                    showDeleteDialog &&
                                    <div className="overlay">
                                        <div className="dialog">
                                            <h4>Proceed to delete account?</h4>
                                            <div>
                                                <button className="btn btn-primary m-2" onClick={onConfirmDelete}>Yes</button>
                                                <button className="btn btn-secondary m-2" onClick={onCancelDelete}>No</button>
                                            </div>
                                        </div>
                                    </div>
                                }
                            </div>
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Name</label>
                                <Field type="text" id="name" name="name" className="form-control" />
                                <ErrorMessage name="name" component="div" className="text-danger" />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email</label>
                                <Field type="email" id="email" name="email" className="form-control" />
                                <ErrorMessage name="email" component="div" className="text-danger" />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="salutation" className="form-label">Salutation</label>
                                <Field as="select" id="salutation" name="salutation" className="form-control">
                                    <option value="">Select</option>
                                    <option value="Mr">Mr.</option>
                                    <option value="Ms">Ms.</option>
                                    <option value="Mrs">Mrs.</option>
                                    <option value="Dr">Dr.</option>
                                </Field>
                                <ErrorMessage name="salutation" component="div" className="text-danger" />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Marketing Preferences</label>
                                <div className="form-check">
                                    <Field
                                        className="form-check-input"
                                        type="checkbox"
                                        id="emailMarketing"
                                        name="marketingPreferences"
                                        value="email"
                                    />
                                    <label className="form-check-label" htmlFor="emailMarketing">
                                        Email Marketing
                                    </label>
                                </div>
                                <div className="form-check">
                                    <Field
                                        className="form-check-input"
                                        type="checkbox"
                                        id="smsMarketing"
                                        name="marketingPreferences"
                                        value="sms"
                                    />
                                    <label className="form-check-label" htmlFor="smsMarketing">
                                        SMS Marketing
                                    </label>
                                </div>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="country" className="form-label">Country</label>
                                <Field as="select" className="form-select" id="country" name="country">
                                    <option value="">Select Country</option>
                                    <option value="sg">Singapore</option>
                                    <option value="my">Malaysia</option>
                                    <option value="in">Indonesia</option>
                                    <option value="th">Thailand</option>
                                </Field>
                                <ErrorMessage name="country" component="div" className="text-danger" />
                            </div>

                            {formik.errors.submit && <div className="alert alert-danger">{formik.errors.submit}</div>}
                            <table>
                                <tbody>
                                    <tr>
                                        <td>
                                            <button type="submit" className="btn btn-primary m-3" disabled={formik.isSubmitting}>
                                                {formik.isSubmitting ? 'Updating...' : 'Update Profile'}
                                            </button>
                                        </td>
                                        <td>
                                            <button type="button" className="btn btn-danger m-3" disabled={formik.isSubmitting} onClick={onDeleteAccount}>Delete Account</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </Form>
                    );
                }}
            </Formik>

        </div>
    )
}