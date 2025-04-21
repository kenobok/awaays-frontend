import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import API from '/src/AxiosInstance';
import isEmail from 'validator/lib/isEmail';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from 'react-toastify';
import { Loader2 } from "../../components/utils/Preloader";
import '../../assets/styles/account.css';


const PasswordReset = () => {
    const [inputFocus, setInputFocus] = useState({ email: false, code: false, new_password: false });
    const [passwordToggle, setPasswordToggle] = useState(false);
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({ email: "", code: "", new_password: "" });
    const [loading, setLoading] = useState(false);


    const handleSignUp = () => {
        setFormData((prevData) => ({ ...prevData, full_name: "", email: "", mobile: "", password: "", agree: false }));		
        setInputFocus({ full_name: false, email: false, mobile: false, password: false, agree: false});
        setSignUp(true);
        setSignIn(false);
        setResetPassword(false);
        setErrors({});
    };

    const handleSignIn = () => {
        setFormData(({ ip, isp, city, region, country, countryCode }) => ({
            ip, isp, city, region, country, countryCode,
            email: "",
            password: "",
        }));
        setInputFocus({ email: false, password: false });
        setSignIn(true);
        setSignUp(false);
        setResetPassword(false);
        setErrors({});
    };

    const handleResetPassword = () => {
        setFormData(({ ip, isp, city, region, country, countryCode }) => ({
            ip, isp, city, region, country, countryCode,
            email: "",
        }));
        setInputFocus({ full_name: false, email: false, mobile: false, password: false, agree: false});
        setSignUp(false);
        setSignIn(false);
        setResetPassword(true);
        setErrors({});
    }

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

    const handleChange = (e, field = null) => {
        if (field == "mobile") {
            const phoneValue = e || '';
            setFormData((prev) => ({ ...prev, mobile: phoneValue }));
            validateField("mobile", phoneValue);
        } else {
            const { name, value, type, checked } = e.target;
            const newValue = type == "checkbox" ? checked : value;
            setFormData((prev) => ({ ...prev, [name]: newValue }));
            validateField(name, newValue);
        }
    };

    const validateField = (field, value) => {
        let error = "";

        switch (field) {
            case "full_name":
                if (!value.trim() || value.length < 3) error = "Must be at least 3 characters";
                break;
            case "email":
                if (!value || !isEmail(value)) error = "Enter a valid email";
                break;
            case "mobile":
                if (!isValidPhoneNumber(value)) error = "Enter a valid mobile number";
                break;
            case "password":
                if (!value || value.length < 6) error = "Must be at least 6 characters";
                break;
            case "agree":
                if (!value) error = "You must agree to";
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
    
        let newErrors = {};
        
        Object.keys(formData).forEach((field) => {
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
    
        const { email, password } = formData;
        
        setLoading(true)
        if (signUp) {
            try {
                const response = await API.post('/account/users/', formData);
                console.log("Registration successful:", response.data);
                toast.success("Account created successfully!");
            } catch (error) {
                toast.error(error.response?.data?.email[0] || "An error occured");
                if(error.response?.data?.email[0]) {
                    setErrors((prev) => ({ ...prev, email: error.response.data.email[0] }));
                }
            } finally {
                setLoading(false)
            }
        } else {
            // Handle login or other flow
        }
    };
    
    // console.log(
    // 	signUp && "Sign Up form data:",
    // 	signIn  && "Sign In form data:",
    // 	resetPassword && "Reset Password form data:",
    // 	signUp && formData,
    // 	signIn && { email, password },
    // 	resetPassword && { email },
    // );


    return (
        <>
            <div className="auth-switch relative flex justify-center mb-4 mx-auto">
                <button onClick={ handleSignUp } className={`text-center text-gray-500 text-xl max-[501px]:text-sm max-[351px]:text-xs font-bold ${signUp && 'active'}`}>SIGN UP</button>
                <button onClick={ handleSignIn } className={`text-center text-gray-500 text-xl max-[501px]:text-sm max-[351px]:text-xs font-bold ${signIn && 'active'}`}>SIGN IN</button>
            </div>
            <motion.form onSubmit={handleSubmit} className="auth-form w-[23rem] max-[501px]:w-[90%] p-7 rounded-2xl mx-auto" transition={{ duration: 0.3 }}>
                { resetPassword && <h3 className="text-center font-semibold text-[1.3rem]">Reset Password</h3> }
                { signUp &&
                    <div className="form-input">
                        <label htmlFor="joinUsName" className={`block text-gray-600 font-medium ${inputFocus.full_name ? 'is-focus' : ''}`}>Full Name</label>
                        <input type="text" name="full_name" id="joinUsName" className={`${errors.full_name ? 'error' : ''}`} value={formData.full_name} onChange={handleChange} onFocus={() => handleInputFocus("full_name")} onBlur={() => handleInputBlur("full_name")} />
                        {errors.full_name && <small>{errors.full_name}</small>}
                    </div>
                }

                <div className="form-input">
                    <label htmlFor="joinUsEmail" className={`block text-gray-600 font-medium ${inputFocus.email ? 'is-focus' : ''}`}>Email</label>
                    <input type="email" name="email" id="joinUsEmail" className={`${errors.email ? 'error' : ''}`} value={formData.email} onChange={handleChange} onFocus={() => handleInputFocus("email")} onBlur={() => handleInputBlur("email")} />
                    {errors.email && <small>{errors.email}</small>}
                </div>
                { signUp &&
                    <div className="form-input">
                        {/* <label className={`block text-gray-600 ${inputFocus.mobile ? "is-focus" : ""}`}>Phone Number</label> */}
                        <PhoneInput
                            international
                            countryCallingCodeEditable={false}
                            defaultCountry={formData.countryCode}
                            value={formData.mobile}
                            onChange={(mobile) => handleChange(mobile, "mobile")}
                            onFocus={() => handleInputFocus("mobile")} 
                            onBlur={() => handleInputBlur("mobile")}
                            className={`${errors.mobile ? 'error' : ''}`}
                        />
                        {errors.mobile && <small>{errors.mobile}</small>}
                    </div>
                }
                { !resetPassword &&
                    <div className="form-input">
                        <label htmlFor="joinUsPassword" className={`block text-gray-600 font-medium ${inputFocus.password ? 'is-focus' : ''}`}>Password</label>
                        <input type={passwordToggle ? "text" : "password"} name="password" id="joinUsPassword" className={`${errors.password ? 'error' : ''}`} value={formData.password} onChange={handleChange} onFocus={() => handleInputFocus("password")} onBlur={() => handleInputBlur("password")} />
                        {errors.password && <small>{errors.password}</small>}
                        { passwordToggle ?
                            <FontAwesomeIcon icon="eye-slash" onClick={ handlePasswordToggle } className="absolute top-[1.9rem] right-5 cursor-pointer bg-[var(--bg-color)]" />
                            :
                            <FontAwesomeIcon icon="eye" onClick={ handlePasswordToggle } className="absolute top-[1.9rem] right-5 cursor-pointer bg-[var(--bg-color)]" />
                        }
                    </div>
                }
                { signUp &&
                    <div className="form-input flex space-[0rem]" style={{ padding:"2px 0 5px 0" }}>
                        <input type="checkbox" name="agree" className="error" checked={formData.agree || false} onChange={handleChange} />
                        <p className="inline-block pl-3 text-[.95rem] leading-[1.2rem]">I agree to the <Link to="/terms-and-conditions" className="text-[var(--p-color)]">Terms</Link> and <Link to="/privacy-policy" className="text-[var(--p-color)]">Privacy Policy</Link> <cite className="text-red-500 text-sm">{errors.agree && "(check the box)"}</cite></p>
                    </div>
                }
                { signIn &&
                    <p className="inline-block text-[.95rem] leading-[1.2rem]">Forgot Password? <span to="" className="text-[var(--p-color)] cursor-pointer" onClick={() => handleResetPassword()}>Reset Password</span></p>
                }
                <div className="mt-3 mb-4">
                    <button type="submit" className="w-full bg-[var(--p-color)] cursor-pointer text-white text-[1.2em] h-12 rounded-lg font-semibold shadow-md hover:bg-blue-700 transition disabled:cursor-not-allowed" disabled={loading}>{ loading ? <Loader2 /> : 'Submit'}</button>
                </div>
                { !resetPassword &&
                    <div className="flex justify-between gap-x-5 my-3 p-1 continue-with-google">
                        <button className="bg-[var(--bg-color)] leading-[0.8rem] rounded-lg hover:bg-white transition flex items-center justify-center">
                            <img src="https://www.svgrepo.com/show/355037/google.svg" alt="Google" className="w-5 h-5 mr-1"/>
                            Continue with Google
                        </button>
                        <button className="bg-[var(--bg-color)] leading-[0.8rem] rounded-lg hover:bg-white transition flex items-center justify-center">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" alt="Apple" className="w-5 h-5 mr-1"/>
                            Continue with Apple
                        </button>
                    </div>
                }
            </motion.form>
        </>
    )
}

export default PasswordReset
