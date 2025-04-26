import { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { motion } from "framer-motion";
import { GetUserLocationFromAPI } from "../../components/utils/getUserLocationFromAPI";
import API from '/src/api/axiosInstance';
import isEmail from 'validator/lib/isEmail';
import PhoneInput from 'react-phone-number-input'
import { isValidPhoneNumber } from 'react-phone-number-input'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from 'react-toastify';
import { SubmitButton } from '../../components/utils/SubmitButton'
import 'react-phone-number-input/style.css';
import '../../assets/styles/account.css';


const SignUpSignIn = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [authMode, setAuthMode] = useState("signup");
	const [formData, setFormData] = useState({ full_name: "", email: "", mobile: "", password: "", agree: false, ip: "", isp: "", city: "", region: "", country: "", countryCode: ""});
    const [inputFocus, setInputFocus] = useState({full_name: false, email: false, mobile: false, password: false, agree: false});
    const [passwordToggle, setPasswordToggle] = useState(false);
	const [errors, setErrors] = useState({});
	const [errorMsg, setErrorMsg] = useState(false);
	const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const from = searchParams.get("from") || "/give-item";

	useEffect(() => {
		const fetchUserLocation = async () => {
			try {
				const locationData = await GetUserLocationFromAPI();	
				setFormData((prevData) => ({
					...prevData,
					ip: locationData.ip,
					isp: locationData.isp,
					city: locationData.city,
					region: locationData.region,
					country: locationData.country,
					countryCode: locationData.countryCode
				}));
			} catch (error) {
				console.error("Failed to fetch location data:", error);
			}
		};
	
		fetchUserLocation();
	}, []);

    useEffect(() => {
        const is_user = JSON.parse(localStorage.getItem("Random"));
        if (is_user) {
            handleSignIn()
        }
    }, []);

	const handleSignUp = () => {
		setFormData((prevData) => ({ ...prevData, full_name: "", email: "", mobile: "", password: "", agree: false }));		
		setInputFocus({ full_name: false, email: false, mobile: false, password: false, agree: false});
        setAuthMode("signup");
        setPasswordToggle(false);
		setErrors({});
        setErrorMsg(false);
        setLoading(false);
    };

	const handleSignIn = () => {
		setFormData(({ ip, isp, city, region, country, countryCode }) => ({
			ip, isp, city, region, country, countryCode,
			email: "",
			password: "",
		}));
		setInputFocus({ email: false, password: false });
        setAuthMode("signin");
        setPasswordToggle(false);
		setErrors({});
        setLoading(false);
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
        setErrorMsg(false)
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
		if (authMode === "signup") {
			try {
				await API.post('/account/users/', formData);
				toast.success("Hurray! Sign up successful");
                setFormData({ full_name: "", email: "", mobile: "", password: "", agree: false });
                setInputFocus({ full_name: false, email: false, mobile: false, password: false, agree: false });
                login();
                navigate(`/auth/verify-email?from=${encodeURIComponent(from)}`, { replace: true });
			} catch (error) {
				const err = error.response?.data;
                if (err?.email) {
                    toast.error(err.email[0]);
                    setErrors((prev) => ({ ...prev, email: err.email }));
                } else if (err?.mobile) {
                    toast.error(err.mobile[0]);
                    setErrors((prev) => ({ ...prev, mobile: err.mobile }));
                } else if (err?.password) {
                    toast.error(err.password[0]);
                    setErrors((prev) => ({ ...prev, password: err.password }));
                } else {
                    toast.error("An error occurred, try again");
                }
			} finally {
				setLoading(false)
			}
		} else {
			try {
                const res = await API.post('/account/login/', { 'email': email, 'password': password });
                toast.success("Login successful");
                login();
                if (!res.data.is_verified) {
                    navigate(`/auth/verify-email?from=${encodeURIComponent(from)}`, { replace: true });
                } else {
                    navigate(from, { replace: true });
                }
            } catch (error) {
                if (error.response?.data?.detail) {
                    toast.error(error.response.data.detail);
                    setErrorMsg(true);
                } else {
                    toast.error("An error occurred, try again");
                }
            } finally {
                setLoading(false)
            }
		}
	};


    return (
        <>
            <div className="auth-switch relative flex justify-center mb-4 mx-auto">
                <button onClick={ handleSignUp } className={`text-center text-gray-500 text-xl py-[.7rem] px-[3rem] max-[501px]:px-9 max-[501px]:py-[.5rem] font-bold cursor-pointer ${authMode === 'signup' && 'active'} ${loading ? 'cursor-progress' : ''}`} disabled={loading}>SIGN UP</button>
                <button onClick={ handleSignIn } className={`text-center text-gray-500 text-xl py-[.7rem] px-[3rem] max-[501px]:px-9 max-[501px]:py-[.5rem] font-bold cursor-pointer ${authMode === 'signin' && 'active'} ${loading ? 'cursor-progress' : ''}`} disabled={loading}>SIGN IN</button>
            </div>
            <motion.form onSubmit={handleSubmit} className="auth-form w-[23rem] max-[501px]:w-[90%] p-7 rounded-2xl mx-auto" transition={{ duration: 0.3 }}>
                
                { authMode === "signin" && errorMsg && <p className={`text-center text-red-500`}>Wrong email or password</p>}
                { authMode === "signup" &&
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
                { authMode === "signup" &&
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
                { authMode === "signup" &&
                    <div className="form-input flex space-[0rem]" style={{ padding:"2px 0 5px 0" }}>
                        <input type="checkbox" name="agree" className="error" checked={formData.agree || false} onChange={handleChange} />
                        <p className="inline-block pl-3 text-[.95rem] leading-[1.2rem]">I agree to the <Link to="/terms-and-conditions/" className="text-[var(--p-color)]">Terms</Link> and <Link to="/privacy-policy/" className="text-[var(--p-color)]">Privacy Policy</Link> <cite className="text-red-500 text-sm">{errors.agree && "(check the box)"}</cite></p>
                    </div>
                }
                { authMode === "signin" &&
                    <p className="inline-block text-[.95rem] leading-[1.2rem]">Forgot Password? <Link to="/auth/reset-password/" className="text-[var(--p-color)] cursor-pointer">Reset Password</Link></p>
                }
                <SubmitButton loading={loading} />
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
            </motion.form>
        </>
    )
}

export default SignUpSignIn
