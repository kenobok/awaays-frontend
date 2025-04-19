import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";
import CountryStateSelector from '../../components/utils/CountryStateSelector';
import GiveawayPurpose from '../../components/giveaway/GiveawayPurpose';
import Select from 'react-select';
import '../../assets/styles/giveaway.css'


const GiveItem = () => {
    const [formData, setFormData] = useState({ purpose: "", item: "", description: "", instructions: "", country: "", state: "", images: [] });
    const [inputFocus, setInputFocus] = useState({ purpose: false, item: false, description: false, instructions: false, images: false });
    const [errors, setErrors] = useState({});

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
        setFormData((prev) => ({ ...prev, images: files }));
        validateField("images", files);
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
            case "instructions":
                if (!value.trim()) {
                    error = "Pickup location or other instructions";
                }
                break;
            case "country":
                if (!value.trim()) error = "Select a country";
                break;
            case "state":
                if (!value.trim()) error = "Select a state/region";
                break;
            case "images":
                if (value.length < 1 || value.length > 5) error = "Upload between 1 to 5 images";
                break;
        }
        setErrors((prev) => ({ ...prev, [field]: error }));
    }

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

        console.log(formData)
        // setFormData({ name: "", email: "", message: "" });
    };


    return(
        <main className="give-item-wrp flex w-full m-auto overflow-x-hidden py-20 max-[993px]:pt-15 max-[768px]:pt-10 translate-y-[5.3rem] max-[941px]:translate-y-[4.2rem]">
			<motion.section className="give-item-img flex-1" initial={{ opacity: 0, x: -500 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, ease: "easeInOut" }}></motion.section>

            <motion.section className="p-10 max-[577px]:translate-y-[-2rem] max-[501px]:px-5 max-[501px]:pt-0" initial={{ opacity: 0, x: 500 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, ease: "easeInOut"  }}>
				{/* <div className="relative flex justify-center mb-4 w-[23rem] max-[501px]:w-[90%] mx-auto">
					<h2 className="text-2xl font-bold">Give Item</h2>
				</div> */}
                <div className="relative flex justify-center mb-4 mx-auto">
					<button className={`border border-2 py-2 px-6 rounded-full shadow-lg text-center text-[var(--p-color)] text-xl max-[501px]:text-sm max-[351px]:text-xs font-bold }`}>GIVE ITEM</button>
				</div>
				<motion.form className="give-item-form p-7 rounded-2xl mx-auto" transition={{ duration: 0.3 }} onSubmit={ handleSubmit }>
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
                            <label htmlFor="instructions" className={`block text-gray-700 font-medium ${inputFocus.instructions ? 'is-focus' : ''}`}>Instructions</label>
                            <textarea name="instructions" id="instructions" className={`h-25 ${errors.instructions ? 'error' : ''}`} value={formData.instructions} onChange={handleChange} onFocus={() => handleInputFocus("instructions")} onBlur={() => handleInputBlur("instructions")} />
                            {errors.instructions && <small>{errors.instructions}</small>}
                        </div>
                    </div>
                    <CountryStateSelector value={{ country: formData.country, state: formData.state }} onChange={handleLocationChange} error={{ country: errors.country, state: errors.state }} />
                    <div className="form-input" style={{ width: '100%' }}>
                        {/* <label htmlFor="images" className="block text-gray-600 font-medium">Upload Images</label> */}
                        <input type="file" name="images" id="images" accept="image/*" className={`${errors.images ? 'error' : ''}`} multiple onChange={handleImageChange} />
                        {errors.images && <small>{errors.images}</small>}
                    </div>
                    {formData.images.length > 0 &&
                        <div className="form-input">
                            {formData.images.length > 0 && (
                                <div className="selected-images flex justify-start items-center gap-x-3 overflow-x-auto">
                                    {formData.images.map((image, index) => (
                                        <img key={index} src={URL.createObjectURL(image)} alt={`selected-image-${index}`} className="w-20 h-20 object-cover rounded-md" />
                                    ))}
                                </div>
                            )}
                        </div>
                    }
                    <div className="mt-3 mb-4">
						<button type="submit" className="w-full bg-[var(--p-color)] cursor-pointer text-white py-3 rounded-lg font-semibold shadow-md hover:bg-blue-700 transition">Submit</button>
					</div>
				</motion.form>
			</motion.section>
		</main>
    )
}

export default GiveItem;
