import { useState, useEffect } from 'react'
import { useAuth } from "../../context/AuthContext";
import API from '/src/api/axiosInstance';
import { motion } from 'framer-motion'
import { toast } from 'react-toastify';
import isEmail from 'validator/lib/isEmail';
import PhoneInput from 'react-phone-number-input'
import { isValidPhoneNumber } from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import { useUserLocation } from "/src/hooks/useUserLocationFromAPI";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SubmitButton } from '../../components/utils/SubmitButton'
import uploadToCloudinary from '../../components/utils/uploadToCloudinary';
import imageCompression from 'browser-image-compression';


const Profile = () => {
    const { user, updateUser, isValidating } = useAuth();
    const { locationFromApi } = useUserLocation();
    const [userLocation, setUserLocation] = useState('');
    const [formData, setFormData] = useState({ full_name: "", mobile: "", old_password: "", new_password: "" });
    const [profileImage, setProfileImage] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [inputFocus, setInputFocus] = useState({ full_name: false, mobile: false, old_password: false, new_password: false });
    const [passwordToggle, setPasswordToggle] = useState(false);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [uploadingImage, setUploadingImage] = useState(false);


    useEffect(() => {
        setUserLocation(locationFromApi.country_code);
    }, [locationFromApi]);

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
            const { name, value } = e.target;
            setFormData((prev) => ({ ...prev, [name]: value }));
            validateField(name, value);
        }
    };

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (!file) {
            toast.error('Please select a valid file');
            return;
        }
    
        setSelectedImage(file);
        
        try {
            await processImage(file); 
        } catch (err) {
            toast.error('Image processing failed, please try again');
        }
    };
    
    const processImage = async (file) => {
        if (!file) {
            throw new Error('No file to process');
        }
    
        setUploadingImage(true); 
    
        try {
            const options = { maxSizeMB: 1, maxWidthOrHeight: 800, useWebWorker: true };
            const compressedFile = await imageCompression(file, options);
            const imageUrl = await uploadToCloudinary(compressedFile);
            
            setProfileImage(imageUrl);
    
        } catch (err) {
            throw new Error('Unable to upload image, try again'); 
        } finally {
            setUploadingImage(false);
        }
    };

    const validateField = (field, value) => {
        let error = "";

        switch (field) {
            case "full_name":
                if (value.trim() && value.length < 3) error = "Must be at least 3 characters";
                break;
            // case "email":
            //     if(value.trim() && !isEmail(value)) error = "Enter a valid email";
            //     break;
            case "mobile":
                if (!isValidPhoneNumber(value)) error = "Enter a valid phone number";
                break;
            case "old_password":
                if (value.trim() && value.length < 6) error = "Enter old password";
                break;
            case "new_password":
                if (value.length > 0 && !formData.old_password) {
                    setErrors((prev) => ({ ...prev, old_password: 'Enter old password' }));
                } else { setErrors((prev) => ({ ...prev, old_password: '' })) }
                if (value.trim() && value.length < 6) {
                    error = "Must be at least 6 characters";
                }
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

        const allFieldsEmpty = Object.values(formData).every(value => !value?.toString().trim());
        const isImageEmpty = !profileImage;

        if (allFieldsEmpty && isImageEmpty) {
            setErrors({ form: "At least one field is required" });
            return;
        }

        let newErrors = {};
        Object.keys(formData).forEach((field) => {
            if (formData[field]) {
                if (field !== 'old_password' && field !== 'new_password') {
                    validateField(field, formData[field]);
                    if (errors[field]) {
                        newErrors[field] = errors[field];
                    }
                }
            }
        });
        setErrors(newErrors);


        const { old_password, new_password } = formData
        if (old_password && !new_password) {
            setErrors((prev) => ({
                ...prev,
                new_password: 'New password is required',
            }));
            return;
        } else if (!old_password && new_password) {
            setErrors((prev) => ({ ...prev, old_password: 'Old password is required'}));
            return;
        }

        if ((old_password && old_password.length < 6) || (new_password && new_password.length < 6)) {
            setErrors((prev) => ({
                ...prev,
                old_password: old_password && old_password.length < 6 ? 'Minimum of 6 characters' : prev.old_password,
                new_password: new_password && new_password.length < 6 ? 'Minimum of 6 characters' : prev.new_password,
            }));
            return;
        }

        setErrors(newErrors);
        if (Object.keys(newErrors).length > 0) {
            return;
        }

        setLoading(true);

        try {
            const data = new FormData();
            if (formData.full_name) data.append('full_name', formData.full_name);
            if (formData.mobile) data.append('mobile', formData.mobile);
            if (profileImage) data.append('profile_image', profileImage);

            if (data.has('full_name') || data.has('mobile') || data.has('profile_image')) {
                const res = await API.patch(`/account/users/${user.id}/`, data, {
                    headers: { "Content-Type": "multipart/form-data" }
                });
                updateUser(res.data);
            }

            if (old_password && new_password) {
                await API.post(`/account/users/change-password/`, { old_password, new_password, });
            }

            toast.success("Profile update successful");

            setFormData({ full_name: "", mobile: "", old_password: "", new_password: "" });
            setInputFocus({ full_name: false, mobile: false, old_password: false, new_password: false });
            setProfileImage(null);
            setSelectedImage(null);
        } catch (error) {
            const err = error.response?.data;
            if (err?.full_name) {
                toast.error(err.full_name[0]);
                setErrors((prev) => ({ ...prev, full_name: err.full_name }));
            } else if (err?.mobile) {
                toast.error(err.mobile[0]);
                setErrors((prev) => ({ ...prev, mobile: err.mobile }));
            } else if (err?.old_password) {
                toast.error(err.old_password[0]);
                setErrors((prev) => ({ ...prev, old_password: err.old_password }));
                setFormData({ full_name: "", mobile: "", old_password: old_password, new_password: new_password });
                setInputFocus({ full_name: false, mobile: false, old_password: true, new_password: true });
                setProfileImage(null);
                setSelectedImage(null);
            } else if (err?.new_password) {
                toast.error(err.new_password[0]);
                setErrors((prev) => ({ ...prev, new_password: err.new_password }));
                setFormData({ full_name: "", mobile: "", old_password: old_password, new_password: new_password });
                setInputFocus({ full_name: false, mobile: false, old_password: true, new_password: true });
                setProfileImage(null);
                setSelectedImage(null);
            } else {
                toast.error("An error occurred, try again");
            }
        } finally {
            setLoading(false);
        }
    };



    return (
        <motion.section className='user-profile flex-1 p-7 pb-20 max-[391px]:px-5' initial={{ opacity: 0, x: -300 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <h2 className='text-xl font-bold text-center border-b border-gray-100 mb-10'>Profile</h2>
            <div className='flex max-[671px]:flex-col max-[671px]:items-center gap-x-5 justify-evenly'>
                <div>
                    <div className='profile-data border border-gray-300 w-[20rem] p-10 px-8 max-[941px]:mb-10 overflow-hidden rounded-2xl'>
                        <div>
                            <h4>Full Name</h4>
                            <p>{user.full_name}</p>
                        </div>
                        <div>
                            <h4>Email</h4>
                            <p>{user.email}</p>
                        </div>
                        <div>
                            <h4>Phone Number</h4>
                            <p>{user.mobile}</p>
                        </div>
                        <div>
                            <h4>Country</h4>
                            <p>{user.country || 'None'}</p>
                        </div>
                        <div>
                            <h4>State/Region</h4>
                            <p>{user.state || 'None'}</p>
                        </div>
                    </div>
                </div>

                <div>
                    <form onSubmit={handleSubmit} className='w-[20rem] mb-10 border border-gray-300 rounded-2xl p-5'>
                        <h4 className='text-center font-bold'>Edit Profile</h4>
                        <small className='text-center text-sm block text-orange-600'>All fields are optional</small>
                        <div className='form-input'>
                            <label htmlFor="editFullName" className={`block ${inputFocus.full_name ? 'is-focus' : ''}`}>Full Name</label>
                            <input type='text' name="full_name" id="editFullName" className={`${errors.full_name ? 'error' : ''}`} value={formData.full_name} onChange={handleChange} onFocus={() => handleInputFocus("full_name")} onBlur={() => handleInputBlur("full_name")} />
                            {errors.full_name && <small>{errors.full_name}</small>}
                        </div>
                        {/* <div className='form-input'>
                            <label htmlFor="editEmail" className={`block ${inputFocus.email ? 'is-focus' : ''}`}>Email</label>
                            <input type='email' name="email" id="editEmail" className={`${errors.email ? 'error' : ''}`} value={formData.email} onChange={handleChange} onFocus={() => handleInputFocus("email")} onBlur={() => handleInputBlur("email")} />
                            {errors.email && <small>{errors.email}</small>}
                        </div> */}
                        <div className="form-input">
                            <PhoneInput
                                international
                                countryCallingCodeEditable={false}
                                defaultCountry={userLocation}
                                value={formData.mobile}
                                onChange={(mobile) => handleChange(mobile, "mobile")}
                                onFocus={() => handleInputFocus("mobile")}
                                onBlur={() => handleInputBlur("mobile")}
                                className={`${errors.mobile ? 'error' : ''}`}
                            />
                            {errors.mobile && <small>{errors.mobile}</small>}
                        </div>
                        <div className="py-[1rem] relative overflow-hidden">
                            <label htmlFor="editProfileImage" className={`block py-[11px] pl-4 border border-[#D1D5DB] rounded-[.5rem] cursor-pointer`} style={{position:'relative',width:'100% '}}>{ !selectedImage ? 'Select Image' : 'Change Image' } </label>
                            <input type="file" accept="image/*" id="editProfileImage" className={`pr-16 ${errors.image ? 'error' : ''} hidden`} onChange={handleImageChange}/>

                            {selectedImage && (
                                <img src={URL.createObjectURL(selectedImage)} alt="preview" className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 object-cover rounded-full border"/>
                            )}

                            {uploadingImage && (
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full py-[13px] pt-[14px] rounded-lg flex justify-center items-center bg-[rgba(255,255,255,.5)]">
                                    <FontAwesomeIcon icon="fa-spinner" className="animate-spin text-[1.3rem] text-[var(--p-color)]" />
                                </div>
                            )}
                            {errors.image && <small>{errors.image}</small>}
                        </div>

                        <h4 className='text-center font-bold mt-4'>Change Password</h4>
                        <div className="form-input">
                            <label htmlFor="oldPassword" className={`${inputFocus.old_password ? 'is-focus' : ''}`}>Old Password</label>
                            <input type={passwordToggle ? "text" : "password"} name="old_password" id="oldPassword" className={`${errors.old_password ? 'error' : ''}`} value={formData.old_password} onChange={handleChange} onFocus={() => handleInputFocus("old_password")} onBlur={() => handleInputBlur("old_password")} />
                            {errors.old_password && <small>{errors.old_password}</small>}
                            {passwordToggle ?
                                <FontAwesomeIcon icon="eye-slash" onClick={handlePasswordToggle} className="absolute top-[1.9rem] right-5 cursor-pointer bg-[var(--bg-color)]" />
                                :
                                <FontAwesomeIcon icon="eye" onClick={handlePasswordToggle} className="absolute top-[1.9rem] right-5 cursor-pointer bg-[var(--bg-color)]" />
                            }
                        </div>
                        <div className="form-input">
                            <label htmlFor="newPassword" className={`${inputFocus.new_password ? 'is-focus' : ''}`}>New Password</label>
                            <input type={passwordToggle ? "text" : "password"} name="new_password" id="newPassword" className={`${errors.new_password ? 'error' : ''}`} value={formData.new_password} onChange={handleChange} onFocus={() => handleInputFocus("new_password")} onBlur={() => handleInputBlur("new_password")} />
                            {errors.new_password && <small>{errors.new_password}</small>}
                            {passwordToggle ?
                                <FontAwesomeIcon icon="eye-slash" onClick={handlePasswordToggle} className="absolute top-[1.9rem] right-5 cursor-pointer bg-[var(--bg-color)]" />
                                :
                                <FontAwesomeIcon icon="eye" onClick={handlePasswordToggle} className="absolute top-[1.9rem] right-5 cursor-pointer bg-[var(--bg-color)]" />
                            }
                        </div>
                        {
                            uploadingImage ?
                                <div className="mt-3 mb-4">
                                    <button className={`w-full bg-[var(--p-color)] cursor-pointer text-white text-[1rem] h-12 rounded-lg font-semibold shadow-md transition cursor-progress`} disabled>Processing image....</button>
                                </div>
                                :
                                <SubmitButton loading={loading} />
                        }
                    </form>
                </div>
            </div>
        </motion.section>
    )
}

export default Profile;
