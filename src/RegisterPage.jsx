import React from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useLocation } from 'wouter';
import { useState } from 'react'

import { useFlashMessage } from './FlashMessageStore';

export default function RegisterPage() {

    const { showMessage } = useFlashMessage();

    const initialValues = {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        salutation: '',
        marketingPreferences: [],
        country: ''
    };

    const [, setLocation] = useLocation();
    const [showSuccess, setShowSuccess] = useState(false);

    // event handler that will be called automatically by Formik
    // when the user submits the form
    // const handleSubmit = (values, formikHelpers) => {
    //     console.log(values);
    //     showMessage("Registration is successful", "success");
    //     setLocation('/');
    // }

    const handleSubmit = async (values, formikHelpers) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/users/register`,
                values
            );
            // Handle successful registration (e.g., redirect to login page)
            showMessage("Registration is successful", "success");
            setLocation('/');
        } catch (err) {
            console.log(err);
            showMessage("Registration failed. Please try again.", "danger");
        }
    };

    const validationSchema = Yup.object({
        name: Yup.string().required('Name is required'),
        email: Yup.string().email('Invalid email address').required('Email is required'),
        password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Confirm Password is required'),
        salutation: Yup.string().required('Salutation is required'),
        country: Yup.string().required('Country is required'),
    });

    return (
        <div className="container mt-5">
            <h1>Register</h1>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {(formik) => (
                    <Form>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name</label>
                            <Field
                                type="text"
                                className="form-control"
                                id="name"
                                name="name"
                            />
                            {formik.errors.name && formik.touched.name ? <div className="text-danger">{formik.errors.name}</div> : null}
                        </div>

                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <Field
                                type="email"
                                className="form-control"
                                id="email"
                                name="email"
                            />
                            {formik.errors.email && formik.touched.email ? <div className="text-danger">{formik.errors.email}</div> : null}
                        </div>

                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <Field
                                type="password"
                                className="form-control"
                                id="password"
                                name="password"
                            />
                            {formik.errors.password && formik.touched.password ? <div className="text-danger">{formik.errors.password}</div> : null}
                        </div>

                        <div className="mb-3">
                            <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                            <Field
                                type="password"
                                className="form-control"
                                id="confirmPassword"
                                name="confirmPassword"
                            />
                            {formik.errors.confirmPassword && formik.touched.confirmPassword ? <div className="text-danger">{formik.errors.confirmPassword}</div> : null}
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Salutation</label>
                            <div>
                                <div className="form-check form-check-inline">
                                    <Field
                                        className="form-check-input"
                                        type="radio"
                                        name="salutation"
                                        id="mr"
                                        value="Mr"
                                    />
                                    <label className="form-check-label" htmlFor="mr">Mr</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <Field
                                        className="form-check-input"
                                        type="radio"
                                        name="salutation"
                                        id="ms"
                                        value="Ms"
                                    />
                                    <label className="form-check-label" htmlFor="ms">Ms</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <Field
                                        className="form-check-input"
                                        type="radio"
                                        name="salutation"
                                        id="mrs"
                                        value="Mrs"
                                    />
                                    <label className="form-check-label" htmlFor="mrs">Mrs</label>
                                </div>
                            </div>
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
                            <Field
                                as="select"
                                className="form-select"
                                id="country"
                                name="country"
                            >
                                <option value="">Select Country</option>
                                <option value="sg">Singapore</option>
                                <option value="my">Malaysia</option>
                                <option value="in">Indonesia</option>
                                <option value="th">Thailand</option>
                            </Field>
                            {formik.errors.country && formik.touched.country ? <div className="text-danger">{formik.errors.country}</div> : null}
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={formik.isSubmitting}
                        >
                            Register
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
}
