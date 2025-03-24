import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import isEmail from 'validator/lib/isEmail';
import PhoneInput from 'react-phone-number-input'
import { isValidPhoneNumber } from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '../assets/styles/auth.css'

const AuthPage = () => {
	const [joinUs, setJoinUs] = useState(true);
	const [formData, setFormData] = useState({ name: "", email: "", phone: "", password: "", agree: false});
    const [inputFocus, setInputFocus] = useState({name: false, email: false, phone: false, password: false, agree: false});
    const [passwordToggle, setPasswordToggle] = useState(false);
	const [errors, setErrors] = useState({});

	const handleJoinUs = () => {
		setFormData({ name: "", email: "", phone: "", password: "", agree: false});
		setInputFocus({name: false, email: false, phone: false, password: false, agree: false});
        setJoinUs(true);
		setErrors({});
    };

	const handleSignIn = () => {
		setFormData({ name: "", email: "", phone: "", password: "", agree: false});
		setInputFocus({name: false, email: false, phone: false, password: false, agree: false});
        setJoinUs(false);
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

    const handleChange = (e, field = null) => {
		if (field == "phone") {
			setFormData((prev) => ({ ...prev, phone: e }));
			validateField("phone", e);
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
            case "name":
                if (!value.trim() || value.length < 3) error = "Must be at least 3 characters";
                break;
            case "email":
                if (!value || !isEmail(value)) error = "Enter a valid email";
                break;
            case "phone":
                if (!isValidPhoneNumber(value)) error = "Enter a valid phone number";
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
	


	const handleSubmit = (e) => {
        e.preventDefault();

        let newErrors = {};
        Object.keys(formData).forEach((field) => {
            validateField(field, formData[field]);
            if (formData[field] == "" || errors[field]) {
                newErrors[field] = errors[field] || "This field is required";
            }
        });

        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) {
            console.log("Errors exist:", newErrors);
            return;
        }

        console.log("Form submitted successfully:", formData);
    };


	return (
		<main className="auth-wrp flex w-full m-auto overflow-hidden py-20 max-[993px]:pt-15 max-[768px]:pt-10 translate-y-[5.3rem] max-[941px]:translate-y-[4.2rem]">
			<motion.section className="auth-img flex-1"
				initial={{ opacity: 0, x: -500 }} 
				animate={{ opacity: 1, x: 0 }} 
				transition={{ duration: 1.5, ease: "easeInOut"  }}
			>
			</motion.section>

			<motion.section className="px-30 py-10 max-[1081px]:px-20 max-[993px]:px-10 max-[501px]:px-0 max-[501px]:pt-0" initial={{ opacity: 0, x: 500 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1.5, ease: "easeInOut"  }}>
				<div className="auth-switch relative flex justify-center mb-4 w-[23rem] max-[501px]:w-[90%] mx-auto">
					<button onClick={ handleJoinUs } className={`text-center text-gray-500 text-xl max-[501px]:text-sm max-[351px]:text-xs font-bold ${joinUs && 'active'}`}>JOIN US</button>
					<button onClick={ handleSignIn } className={`text-center text-gray-500 text-xl max-[501px]:text-sm max-[351px]:text-xs font-bold ${!joinUs && 'active'}`}>SIGN IN</button>
				</div>
				<motion.form onSubmit={handleSubmit} className="auth-form w-[23rem] max-[501px]:w-[90%] p-7 rounded-2xl mx-auto" transition={{ duration: 0.3 }}>
					{ joinUs &&
						<>
							<div className="form-input">
								<label htmlFor="joinUsName" className={`block text-gray-600 font-medium ${inputFocus.name ? 'is-focus' : ''}`}>Full Name</label>
								<input type="text" name="name" id="joinUsName" className={`${errors.name ? 'error' : ''}`} value={formData.name} onChange={handleChange} onFocus={() => handleInputFocus("name")} onBlur={() => handleInputBlur("name")} />
								{errors.name && <small>{errors.name}</small>}
							</div>
						</>
					}
					<div className="form-input">
						<label htmlFor="joinUsEmail" className={`block text-gray-600 font-medium ${inputFocus.email ? 'is-focus' : ''}`}>Email</label>
						<input type="email" name="email" id="joinUsEmail" className={`${errors.email ? 'error' : ''}`} value={formData.email} onChange={handleChange} onFocus={() => handleInputFocus("email")} onBlur={() => handleInputBlur("email")} />
						{errors.email && <small>{errors.email}</small>}
					</div>
					{ joinUs &&
						<>
							<div className="form-input">
								{/* <label className={`block text-gray-600 ${inputFocus.phone ? "is-focus" : ""}`}>Phone Number</label> */}
								<PhoneInput
									international
									countryCallingCodeEditable={false}
									defaultCountry="NG"
									value={formData.phone}
									onChange={(phone) => handleChange(phone, "phone")}
									onFocus={() => handleInputFocus("phone")} 
									onBlur={() => handleInputBlur("phone")}
									className={`${errors.phone ? 'error' : ''}`}
								/>
								{errors.phone && <small>{errors.phone}</small>}
							</div>
						</>
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
					{ joinUs &&
						<>
							<div className="form-input flex space-[0rem]" style={{ padding:"2px 10px 5px 10px" }}>
								<input type="checkbox" name="agree" className="error" checked={formData.agree || false} onChange={handleChange} />
								<p className="inline pl-3 text-[.95rem] leading-[1.2rem]">I agree to the <Link to="/terms-and-conditions" className="text-[var(--p-color)]">Terms</Link> and <Link to="/privacy-policy" className="text-[var(--p-color)]">Privacy Policy</Link> {errors.agree && <small>(Check the box)</small>}</p>
							</div>
						</>
					}
					<div className="mt-3 mb-4">
						<button type="submit" className="w-full bg-[var(--p-color)] cursor-pointer text-white py-3 rounded-lg font-semibold shadow-md hover:bg-blue-700 transition">Submit</button>
					</div>
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
			</motion.section>
		</main>
  	);
}

export default AuthPage
