import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import isEmail from 'validator/lib/isEmail';
import PhoneInput from 'react-phone-number-input'
import { isValidPhoneNumber } from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import { GetUserLocationFromAPI } from '../../components/utils/GetUserLocationFromAPI';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Profile = () => {
    const [inputFocus, setInputFocus] = useState({name: false, email: false, phone: false, old_password: false, new_password: false});
    const [passwordToggle, setPasswordToggle] = useState(false);
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({ name: "", email: "", phone: "", old_password: "", new_password: ""});
    const [userLocation, setUserLocation] = useState('');
    
    useEffect(() => {
        const fetchUserLocation = async () => {
            try {
                const locationData = await GetUserLocationFromAPI();	
                setUserLocation(locationData.countryCode);
            } catch (error) {
                console.error("Failed to fetch location data:", error);
            }
        };
        fetchUserLocation();
    }, []);


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
            const phoneValue = e || '';
            setFormData((prev) => ({ ...prev, phone: phoneValue }));
            validateField("phone", phoneValue);
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
                if (value.trim() && value.length < 3) error = "Must be at least 3 characters";
                break;
            case "email":
                if (value.trim() && !isEmail(value)) error = "Enter a valid email";
                break;
            case "phone":
                if (!isValidPhoneNumber(value)) error = "Enter a valid phone number";
                break;
            case "old_password":
                if (value.trim() && value.length < 6) error = "Enter old password";
                break;
            case "new_password":
                if (value.trim() && value.length < 6) error = "Must be at least 6 characters";
                break;
            default:
                break;
        }
    
        setErrors((prev) => {
            if (prev[field] === error) return prev;
            return { ...prev, [field]: error };
        });
    };

    return (
        <motion.section className='user-profile flex-1 p-7 pb-20 max-[391px]:px-5' initial={{ opacity: 0, x: -300 }}  animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <h2 className='text-2xl font-bold text-center border-b border-gray-100 mb-10'>Profile</h2>
            <div className='flex max-[671px]:flex-col max-[671px]:items-center gap-x-5 justify-evenly'>
                <div>
                    <div className='profile-data border border-gray-300 w-[20rem] p-10 px-8 max-[941px]:mb-10 overflow-hidden rounded-2xl'>
                        <div>
                            <h4>Name</h4>
                            <p>Tomase Edison Ogbemodian Chuckwuemeka</p>
                        </div>
                        <div>
                            <h4>Email</h4>
                            <p>tomaseedisonintothebadlandofcorsesmediocrity@gmail.com</p>
                        </div>
                        <div>
                            <h4>Phone Number</h4>
                            <p>+234904563960</p>
                        </div>
                        <div>
                            <h4>Country</h4>
                            <p>Nigeria</p>
                        </div>
                        <div>
                            <h4>State/Region</h4>
                            <p>Lagos</p>
                        </div>
                    </div>
                </div>

                <div>
                    <form className='w-[20rem] mb-10 border border-gray-300 rounded-2xl p-5'>
                        <h4 className='text-center font-bold'>Edit Profile</h4>
                        <small className='text-center text-sm block text-orange-600'>All fields are optional</small>
                        <div className='form-input'>
                            <label htmlFor="editFullName" className={`block ${inputFocus.name ? 'is-focus' : ''}`}>Full Name</label>
                            <input type='text' name="name" id="editFullName" className={`${errors.name ? 'error' : ''}`} value={formData.name} onChange={handleChange} onFocus={() => handleInputFocus("name")} onBlur={() => handleInputBlur("name")} />
                            {errors.name && <small>{errors.name}</small>}
                        </div>
                        <div className='form-input'>
                            <label htmlFor="editEmail" className={`block ${inputFocus.email ? 'is-focus' : ''}`}>Email</label>
                            <input type='email' name="email" id="editEmail" className={`${errors.email ? 'error' : ''}`} value={formData.email} onChange={handleChange} onFocus={() => handleInputFocus("email")} onBlur={() => handleInputBlur("email")} />
                            {errors.email && <small>{errors.email}</small>}
                        </div>
                        <div className="form-input">
                            <PhoneInput
                                international
                                countryCallingCodeEditable={false}
                                defaultCountry={userLocation}
                                value={formData.phone}
                                onChange={(phone) => handleChange(phone, "phone")}
                                onFocus={() => handleInputFocus("phone")} 
                                onBlur={() => handleInputBlur("phone")}
                                className={`${errors.phone ? 'error' : ''}`}
                            />
                            {errors.phone && <small>{errors.phone}</small>}
                        </div>

                        <h4 className='text-center font-bold mt-5'>Change Password</h4>
                        <div className="form-input">
                            <label htmlFor="oldPassword" className={`${inputFocus.old_password ? 'is-focus' : ''}`}>Old Password</label>
                            <input type={passwordToggle ? "text" : "password"} name="old_password" id="oldPassword" className={`${errors.old_password ? 'error' : ''}`} value={formData.old_password} onChange={handleChange} onFocus={() => handleInputFocus("old_password")} onBlur={() => handleInputBlur("old_password")} />
                            {errors.old_password && <small>{errors.old_password}</small>}
                            { passwordToggle ?
                                <FontAwesomeIcon icon="eye-slash" onClick={ handlePasswordToggle } className="absolute top-[1.9rem] right-5 cursor-pointer bg-[var(--bg-color)]" />
                                :
                                <FontAwesomeIcon icon="eye" onClick={ handlePasswordToggle } className="absolute top-[1.9rem] right-5 cursor-pointer bg-[var(--bg-color)]" />
                            }
                        </div>
                        <div className="form-input">
                            <label htmlFor="newPassword" className={`${inputFocus.new_password ? 'is-focus' : ''}`}>New Password</label>
                            <input type={passwordToggle ? "text" : "password"} name="new_password" id="newPassword" className={`${errors.new_password ? 'error' : ''}`} value={formData.new_password} onChange={handleChange} onFocus={() => handleInputFocus("new_password")} onBlur={() => handleInputBlur("new_password")} />
                            {errors.new_password && <small>{errors.new_password}</small>}
                            { passwordToggle ?
                                <FontAwesomeIcon icon="eye-slash" onClick={ handlePasswordToggle } className="absolute top-[1.9rem] right-5 cursor-pointer bg-[var(--bg-color)]" />
                                :
                                <FontAwesomeIcon icon="eye" onClick={ handlePasswordToggle } className="absolute top-[1.9rem] right-5 cursor-pointer bg-[var(--bg-color)]" />
                            }
                        </div>
                        <div className='form-input'>
                            <input type='submit' value='Submit' className='bg-[var(--p-color)] text-white' />
                        </div>
                    </form>
                </div>
            </div>
        </motion.section>
    )
}

export default Profile;
