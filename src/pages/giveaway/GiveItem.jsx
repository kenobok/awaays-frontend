import { useEffect, useState } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { motion } from "framer-motion";
import API from '/src/api/axiosInstance';
import { useQuery } from '@tanstack/react-query';
import { fetchGiveawaysItemDetails } from "../../services/fetchServices";
import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';
import CountryStateSelector from '../../components/utils/CountryStateSelector';
import GiveawayPurpose from '../../components/giveaway/GiveawayPurpose';
import { SubmitButton } from '../../components/utils/SubmitButton';
import { resizeImage } from '../../components/utils/resizeImage';
import '../../assets/styles/giveaway.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const GiveItem = () => {
    const { slug } = useParams();
    const useGiveawayItemDetails = (slug) => {
        return useQuery({
            queryKey: ['giveawayItemDetails', slug],
            queryFn: () => fetchGiveawaysItemDetails(slug),
            enabled: !!slug,
        });
    };
    const navigate = useNavigate();
    const location = useLocation();
    const [formData, setFormData] = useState({ purpose: "", item: "", description: "", instruction: "", country: "", state: "", showNumber: false, images: [] });
    const [inputFocus, setInputFocus] = useState({ purpose: false, item: false, description: false, instruction: false, images: false });
    const [errors, setErrors] = useState({});
    const { data, error, isLoading, refetch } = useGiveawayItemDetails(slug);
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [compressing, setCompressing] = useState(false);
    
    const params = new URLSearchParams(location.search);
    const isRepost = params.get('action') === 'repost'


    useEffect(() => {
        if (slug && data) {
            setFormData({
                purpose: data.purpose,
                item: data.name,
                description: data.description,
                instruction: data.instruction,
                country: data.country,
                state: data.state,
                images: data.images
            });
            const convertUrlsToFiles = async () => {
                const imageFiles = await Promise.all(
                    data.images.map(async (url) => {
                        const response = await fetch(url);
                        const imageBlob = await response.blob();
                        const fileName = url.split('/').pop(); 
                        const file = new File([imageBlob], fileName, { type: imageBlob.type });
                        return file;
                    })
                );
                setFormData((prev) => ({ ...prev, images: imageFiles}));
            };

            if (data.images && data.images.length > 0) {
                convertUrlsToFiles();
            }

            if (data.show_number == 'True') {
                setFormData((prev) => ({ ...prev, showNumber: true }))
            } else {
                setFormData((prev) => ({ ...prev, showNumber: false }))
            }
            setInputFocus({ purpose: true, item: true, description: true, instruction: true, images: true });
        } else {
            setFormData({ purpose: "", item: "", description: "", instruction: "", country: "", state: "", showNumber: false, images: [] });
            setInputFocus({ purpose: false, item: false, description: false, instruction: false, images: false });
            setErrors({});
            setLoading(false);
            setCompressing(false)
        }
    }, [slug, data]);

    useEffect(() => {
        return () => {
            formData.images.forEach((image) => {
                if (image instanceof File) {
                    URL.revokeObjectURL(image);
                }
            });
        };
    }, [formData.images]);

    const handleInputFocus = (field) => {
        setInputFocus((prev) => ({ ...prev, [field]: true }));
    };

    const handleInputBlur = (field) => {
        if (!formData[field]) {
            setInputFocus((prev) => ({ ...prev, [field]: false }));
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        validateField(name, value);
    };

    const handleLocationChange = (location) => {
        setFormData((prevData) => ({
            ...prevData,
            country: location.country,
            state: location.state,
        }));

        setErrors((prevErrors) => ({
            ...prevErrors,
            country: location.country ? "" : prevErrors.country,
            state: location.state ? "" : prevErrors.state,
        }));
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
    
        setCompressing(true)
        const resizeImages = async (files) => {
            const resizedFiles = await Promise.all(
                files.map((file) => resizeImage(file)) 
            );
            return resizedFiles;
        };
    
        resizeImages(files).then((resizedFiles) => {
            setFormData((prev) => ({ ...prev, images: resizedFiles }));
            validateField("images", resizedFiles);
            setCompressing(false)
        });
    };

    const handleRemoveImage = (index) => {
        setFormData((prev) => {
            const updatedImages = prev.images.filter((_, i) => i !== index);
            validateField("images", updatedImages); 
            return { ...prev, images: updatedImages };
        });
    };

    const validateField = (field, value) => {
        let error = "";
        switch (field) {
            case "purpose":
                if (!value.trim()) error = "Select purpose of giving";
                break;
            case "item":
                if (!value.trim() || value.length < 3) error = "Must be at least 3 characters";
                break;
            case "description":
                if (value.trim().split(/\s+/).filter(Boolean).length < 5) {
                    error = "Must be at least 5 words";
                }
                break;
            // case "instruction":
            //     if (!value.trim()) {
            //         error = "Pickup location or other instruction";
            //     }
            //     break;
            case "country":
                if (!value.trim()) error = "Select a country";
                break;
            case "state":
                if (!value.trim()) error = "Select a state/region";
                break;
            case "images":
                if (value.length > 3) error = "Upload between 1 to 3 images";
                break;
        }
        setErrors((prev) => ({ ...prev, [field]: error }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        let newErrors = {};
        Object.keys(formData).forEach((field) => {
            if (field === "showNumber") return;
            if (field === "instruction") return;
            if (field === 'images' && formData.images.length == 0) return;
            validateField(field, formData[field]);
            if (formData[field] == "" || errors[field]) {
                newErrors[field] = errors[field] || "This field is required";
            }
        });

        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) {
            return;
        }

        const data = new FormData();
        data.append('donor', user.id);
        data.append('purpose', formData.purpose);
        data.append('name', formData.item);
        data.append('description', formData.description);
        data.append('instruction', formData.instruction);
        data.append('state', formData.state);
        data.append('country', formData.country);
        data.append('show_number', formData.showNumber);

        for (let i = 0; i < formData.images.length; i++) {
            data.append('uploaded_images', formData.images[i]);
        }

        setLoading(true)
        try {
            // if (slug) {
            //     await API.patch(`/giveaway-items/${slug}/`, data, {
            //         headers: { "Content-Type": "multipart/form-data" }
            //     })
            // } else if (repost) {
            //     await API.post('/giveaway-items/', data, {
            //         headers: { "Content-Type": "multipart/form-data" }
            //     })
            // } else {
            //     await API.post('/giveaway-items/', data, {
            //         headers: { "Content-Type": "multipart/form-data" }
            //     })
            // }
            const method = isRepost || !slug ? 'post' : 'patch';
            const url = method === 'post' ? '/giveaway-items/' : `/giveaway-items/${slug}/`;
            await API[method](url, data, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            
            toast.success(`Thank you ${user.full_name} for your donation 💖`)
            setFormData({ purpose: "", item: "", description: "", instruction: "", country: "", state: "", showNumber: false, images: [] });
            setInputFocus({ purpose: false, item: false, description: false, instruction: false, images: false });
            setErrors({});
            navigate('/dashboard/my-giveaways')
        } catch (error) {
            const err = error?.response?.data
            console.log(error)
            if (err?.uploaded_images) {
                if (err?.uploaded_images == 'You must upload between 1 and 3 images.') {
                    toast.error('Upload between 1 - 3 Images');
                    setErrors((prev) => ({ ...prev, images: 'Upload between 1 - 3 Images' }))
                } else {
                    toast.error('Invalid or corrupt image file(.svg)');
                    setErrors((prev) => ({ ...prev, images: 'Invalid or corrupt image file(.svg)' }))
                }
            } else if (err) {
                toast.error("Failed to submit. Please try again.");
            } else {
                toast.error('An error occurred')
            }
        } finally {
            setLoading(false);
        }
    };


    return (
        <main className="give-item-wrp flex w-full m-auto overflow-x-hidden py-20 max-[993px]:pt-15 max-[768px]:pt-10 translate-y-[5.3rem] max-[941px]:translate-y-[4.2rem]">
            <motion.section className="give-item-img flex-1" initial={{ opacity: 0, x: -500 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, ease: "easeInOut" }}></motion.section>

            <motion.section className="p-10 max-[577px]:translate-y-[-2rem] max-[501px]:px-3 max-[501px]:pt-0" initial={{ opacity: 0, x: 500 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, ease: "easeInOut" }}>
                <div className="relative flex justify-center mb-4 mx-auto">
                    <button className={`border-b-2 py-2 px-6 rounded-2xl shadow-lg text-center text-[var(--p-color)] text-xl font-bold `}>{slug ? 'EDIT' : 'GIVE'} ITEM</button>
                </div>
                <motion.form className="give-item-form relative p-7 rounded-2xl mx-auto overflow-hidden" transition={{ duration: 0.3 }} onSubmit={handleSubmit}>
                    {slug && isLoading &&
                        <div className='flex items-center justify-center absolute top-0 left-0 w-full h-full bg-[rgba(255,255,255,.7)] z-3 '>
                            <FontAwesomeIcon icon='spinner' className='animate-spin text-[2rem] text-[var(--p-color)] ' />
                        </div>
                    }
                    <div className='flex gap-x-7 max-[601px]:flex-col'>
                        <GiveawayPurpose value={formData.purpose} onChange={handleChange} error={errors.purpose} />
                        <div className="form-input">
                            <label htmlFor="item" className={`block text-gray-600 font-medium ${inputFocus.item ? 'is-focus' : ''}`}>Item Name</label>
                            <input type="text" name="item" id="item" className={`${errors.item ? 'error' : ''}`} value={formData.item} onChange={handleChange} onFocus={() => handleInputFocus("item")} onBlur={() => handleInputBlur("item")} />
                            {errors.item && <small>{errors.item}</small>}
                        </div>
                    </div>
                    <div className='flex gap-x-7 max-[601px]:flex-col'>
                        <div className="form-input textarea">
                            <label htmlFor="description" className={`block text-gray-700 font-medium ${inputFocus.description ? 'is-focus' : ''}`}>Description</label>
                            <textarea name="description" id="description" className={`h-25 ${errors.description ? 'error' : ''}`} value={formData.description} onChange={handleChange} onFocus={() => handleInputFocus("description")} onBlur={() => handleInputBlur("description")} />
                            {errors.description && <small>{errors.description}</small>}
                        </div>
                        <div className="form-input textarea">
                            <label htmlFor="instruction" className={`block text-gray-700 font-medium ${inputFocus.instruction ? 'is-focus' : ''}`}>Instructions (Optional)</label>
                            <textarea name="instruction" id="instruction" className={`h-25 ${errors.instruction ? 'error' : ''}`} value={formData.instruction} onChange={handleChange} onFocus={() => handleInputFocus("instruction")} onBlur={() => handleInputBlur("instruction")} />
                            {errors.instruction && <small>{errors.instruction}</small>}
                        </div>
                    </div>
                    <CountryStateSelector value={{ country: formData.country, state: formData.state }} onChange={handleLocationChange} error={{ country: errors.country, state: errors.state }} />
                    <div className='flex gap-x-7 mb-5 max-[601px]:flex-col'>
                        <div className="form-input flex items-center gap-x-5">
                            <input type="checkbox" name="show_number" id='showNumber' className='inline-block' checked={formData.showNumber} onChange={(e) => setFormData((prev) => ({ ...prev, showNumber: e.target.checked }))} />
                            <label htmlFor='showNumber' className="block ml-3 text-gray-600 pt-[4px]" style={{ cursor: 'pointer' }}>Show my phone number</label>
                        </div>

                        <div className='form-input'>
                            <div className="block w-full">
                                {compressing ?
                                    <label className={`block px-[13px] py-[10.5px] border border-[#D1D5DB] rounded-[.5rem] text-[#888] bg-[rgba(0,0,0,.05)]`} style={{ position: 'relative', width: '99.5%', transform: 'translateX(-1rem)', cursor: 'progress' }}>Processing Image(s)...</label>
                                    :
                                    <label htmlFor="images" className={`block px-[13px] py-[10.5px] border border-[#D1D5DB] rounded-[.5rem] ${errors.images ? 'border-red-500' : ''}`} style={{ position: 'relative', width: '99.5%', transform: 'translateX(-1rem)', cursor: 'pointer' }}>{formData.images < 1 ? 'Select Image(s)' : 'Change Image(s)'} </label>
                                }
                                <input type="file" name="images" id="images" accept="image/*" className={`${errors.images ? 'error' : ''} hidden`} multiple onChange={handleImageChange} />
                                {!compressing && errors.images ? <small>{errors.images}</small> : <small style={{color:'goldenrod'}}>Please upload images (optional)</small>}
                            </div>
                            {compressing ?
                                <div className="flex justify-center items-center h-20">
                                    <FontAwesomeIcon icon='fa-spinner' className='animate-spin text-[1.7rem] text-gray-400 ' />
                                </div>
                                :
                                <div className="form-input w-full" style={{ padding: '0' }}>
                                    <div className="selected-images flex justify-start items-center gap-x-3 overflow-x-auto whitespace-nowrap">
                                        {formData.images.map((image, index) => (
                                            <div key={index} className='relative mt-3 flex-shrink-0 w-20 h-20'>
                                                <img src={typeof image === 'string' ? image : URL.createObjectURL(image)} alt={`selected-image-${index}`} className="w-20 h-20 object-cover rounded-md" />
                                                <FontAwesomeIcon icon='close' className='absolute top-0 right-0 text-red-500 font-bold bg-white rounded-full cursor-pointer' onClick={() => handleRemoveImage(index)} />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                    {
                        compressing ?
                            <div className="mt-3 mb-4">
                                <button className={`w-full bg-[var(--p-color)] cursor-pointer text-white text-[1rem] h-12 rounded-lg font-semibold shadow-md transition cursor-progress`} disabled>Processing image....</button>
                            </div>
                            :
                            <SubmitButton loading={loading} />
                    }
                </motion.form>
            </motion.section>
        </main>
    )
}

export default GiveItem;
