import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import API from '/src/api/axiosInstance';
import isEmail from 'validator/lib/isEmail';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from 'react-toastify';
import { SubmitButton } from '../../components/utils/SubmitButton'
import '../../assets/styles/account.css';


const ResetPassword = () => {
    const navigate = useNavigate();
    const [requestCode, setRequestCode] = useState(true);
    const [resetPassword, setResetPassword] = useState(false);
    const [inputFocus, setInputFocus] = useState({ email: false, code: false, new_password: false });
    const [passwordToggle, setPasswordToggle] = useState(false);
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({ email: "", code: "", new_password: "" });
    const [loading, setLoading] = useState(false);


    const handleRequestCode = () => {
        setFormData({ email: "" });
        setInputFocus({ email: false });
        setRequestCode(true);
        setResetPassword(false);
        setPasswordToggle(false);
        setErrors({});
    };

    const handleResetPassword = () => {
        setFormData({ email: "", code: "", new_password: "" });
        setInputFocus({ email: false, code: false, new_password: false });
        setRequestCode(false);
        setResetPassword(true);
        setPasswordToggle(false);
        setErrors({});
    };

    const handlePasswordToggle = () => {
        setPasswordToggle(prevState => !prevState);
    };

    const handleInputFocus = (field) => {
        setInputFocus((prev) => ({ ...prev, [field]: true }));
    };

    const handleInputBlur = (field) => {
        if (!formData[field]) {
            setInputFocus((prev) => ({ ...prev, [field]: false }));
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        validateField(e.target.name, e.target.value);
    };

    const validateField = (field, value) => {
        let error = "";

        switch (field) {
            case "email":
                if (!value || !isEmail(value)) error = "Enter a valid email";
                break;
            case "code":
                if (!/^\d{6}$/.test(value)) error = "Code is 6 digits ... check your email";
                break;
            case "new_password":
                if (!value || value.length < 6) error = "Must be at least 6 characters";
                break;
            default:
                break;
        }

        setErrors((prev) => {
            if (prev[field] === error) return prev;
            return { ...prev, [field]: error };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        let fieldsToValidate = requestCode
            ? ["email"]
            : ["email", "code", "new_password"];

        let newErrors = {};

        fieldsToValidate.forEach((field) => {
            if (!formData[field]) {
                newErrors[field] = "This field is required";
            } else {
                validateField(field, formData[field]);
                if (errors[field]) {
                    newErrors[field] = errors[field];
                }
            }
        });

        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) {
            return;
        }

        const { email } = formData;

        setLoading(true)
        if (requestCode) {
            try {
                const response = await API.post('/account/reset-password/', { email: email });
                toast.success(response.data.message);
                setRequestCode(false)
                setResetPassword(true)
            } catch (error) {
                toast.error("An error occured");
            } finally {
                setLoading(false)
            }
        } else {
            try {
                const response = await API.post('/account/reset-password/confirm/', formData);
                toast.success(response.data.message);
                setFormData({ email: "", code: "", new_password: "" });
                setInputFocus({ email: false, code: false, new_password: false });
                navigate('/auth')
            } catch (error) {
                if(error.response?.data?.non_field_errors[0] == 'Invalid email') {
                    toast.error(error.response?.data?.non_field_errors[0]);
                    setErrors({ ...errors, email: error.response.data.non_field_errors });
                } else if(error.response?.data?.non_field_errors[0] == 'Invalid or expired code') {
                    toast.error(error.response?.data?.non_field_errors[0]);
                    setErrors({ ...errors, code: error.response.data.non_field_errors });
                } else {
                    toast.error("An error occured");    
                }
            } finally {
                setLoading(false)
            }
        }
    };


    return (
        <>
            <div className="auth-switch relative flex justify-center mb-10 mx-auto"></div>
            <motion.form onSubmit={handleSubmit} className="auth-form w-[23rem] max-[501px]:w-[90%] p-7 rounded-2xl mx-auto" transition={{ duration: 0.3 }}>
                <h3 className="text-center font-semibold text-[1.3rem]">{requestCode ? 'Reset Password' : 'Set New Password'}</h3>
                <div className="form-input">
                    <label htmlFor="resetPasswordEmail" className={`block text-gray-600 font-medium ${inputFocus.email ? 'is-focus' : ''}`}>Email</label>
                    <input type="email" name="email" id="resetPasswordEmail" className={`${errors.email ? 'error' : ''}`} value={formData.email} onChange={handleChange} onFocus={() => handleInputFocus("email")} onBlur={() => handleInputBlur("email")} />
                    {errors.email && <small>{errors.email}</small>}
                </div>
                {resetPassword &&
                    <>
                        <div className="form-input">
                            <label htmlFor="resetPasswordCode" className={`block text-gray-600 font-medium ${inputFocus.code ? 'is-focus' : ''}`}>Code</label>
                            <input type="tel" name="code" id="resetPasswordCode" className={`${errors.code ? 'error' : ''}`}
                                value={formData.code}
                                onChange={(e) => {
                                    const onlyNums = e.target.value.replace(/\D/g, '');
                                    setFormData({ ...formData, code: onlyNums });
                                    validateField("code", onlyNums);
                                }}
                                maxLength={6}
                                onFocus={() => handleInputFocus("code")}
                                onBlur={() => handleInputBlur("code")}
                            />
                            {errors.code && <small>{errors.code}</small>}
                        </div>
                        <div className="form-input">
                            <label htmlFor="newPassword" className={`block text-gray-600 font-medium ${inputFocus.new_password ? 'is-focus' : ''}`}>New Password</label>
                            <input type={passwordToggle ? "text" : "password"} name="new_password" id="newPassword" className={`${errors.new_password ? 'error' : ''}`} value={formData.new_password} onChange={handleChange} onFocus={() => handleInputFocus("new_password")} onBlur={() => handleInputBlur("new_password")} />
                            {errors.new_password && <small>{errors.new_password}</small>}
                            {passwordToggle ?
                                <FontAwesomeIcon icon="eye-slash" onClick={handlePasswordToggle} className="absolute top-[1.9rem] right-5 cursor-pointer bg-[var(--bg-color)]" />
                                :
                                <FontAwesomeIcon icon="eye" onClick={handlePasswordToggle} className="absolute top-[1.9rem] right-5 cursor-pointer bg-[var(--bg-color)]" />
                            }
                        </div>
                    </>
                }
                {requestCode ?
                    <p className="inline-block text-[.95rem] leading-[1.2rem]">Have a code? <span to="" className="text-[var(--p-color)] cursor-pointer" onClick={() => handleResetPassword()}>Reset your password</span></p>
                    :
                    <p className="inline-block text-[.95rem] leading-[1.2rem]">Don't have a code? <span to="" className="text-[var(--p-color)] cursor-pointer" onClick={() => handleRequestCode()}>Request a code</span></p>
                }
                <SubmitButton loading={loading} />
            </motion.form>
        </>
    )
}

export default ResetPassword
