import { useState } from "react";
import isEmail from 'validator/lib/isEmail';


const ContactUs = () => {
    const [formData, setFormData] = useState({ name: "", email: "", message: "" });
    const [inputFocus, setInputFocus] = useState({name: false, email: false, message: false});
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
        setFormData({ ...formData, [e.target.name]: e.target.value });
        validateField(e.target.name, e.target.value);
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
            case "message":
                const wordCount = value.trim().split(/\s+/).filter(Boolean).length;
                if (wordCount < 10) {
                    error = "Must be at least 10 words";
                }
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

        setFormData({ name: "", email: "", message: "" });
    };

    return (
        <main className="max-w-xl mx-auto p-15 pb-20 rounded-lg translate-y-[6rem] max-[941px]:p-5">
            <h1 className="text-3xl font-bold m-0 p-0 mb-2 text-center">Contact Us</h1>
            <p className="text-center text-gray-600 m-0 p-0 mb-4">
                Have questions? We're here to help. Fill out the form below and we'll get back to you as soon as possible.
            </p>

            <form onSubmit={handleSubmit} className=" py-1">
                <div className="form-input">
                    <label htmlFor="contactUsName" className={`block text-gray-700 font-medium ${inputFocus.name ? 'is-focus' : ''}`}>Full Name</label>
                    <input type="text" name="name" id="contactUsName" className={`${errors.name ? 'error' : ''}`} value={formData.name} onChange={handleChange} onFocus={() => handleInputFocus("name")} onBlur={() => handleInputBlur("name")} />
                    {errors.name && <small>{errors.name}</small>}
                </div>

                <div className="form-input">
                    <label htmlFor="contactUsEmail" className={`block text-gray-700 font-medium ${inputFocus.email ? 'is-focus' : ''}`}>Email</label>
                    <input type="email" name="email" id="contactUsEmail" className={`${errors.email ? 'error' : ''}`} value={formData.email} onChange={handleChange} onFocus={() => handleInputFocus("email")} onBlur={() => handleInputBlur("email")} />
                    {errors.email && <small>{errors.email}</small>}    
                </div>

                <div className="form-input textarea">
                    <label htmlFor="contactUsMessage" className={`block text-gray-700 font-medium ${inputFocus.message ? 'is-focus' : ''}`}>Message</label>
                    <textarea name="message" id="contactUsMessage" className={`h-32 ${errors.message ? 'error' : ''}`} value={formData.message} onChange={handleChange} onFocus={() => handleInputFocus("message")} onBlur={() => handleInputBlur("message")} />
                    {errors.message && <small>{errors.message}</small>}
                </div>
                <div className="pb-2 mt-2">
                    <button type="submit" className="w-full bg-[var(--p-color)] cursor-pointer text-white py-3 rounded-lg font-semibold shadow-md hover:bg-blue-700 transition">Send Message</button>
                </div>
            </form>

            <div className="text-center mt-3">
                <p className="text-gray-600">Or email us directly at</p>
                <a href="mailto:awaays.info@gmail.com" className="text-[var(--p-color)] cursor-pointer font-semibold">awaays.info@gmail.com</a>
            </div>
        </main>
    );
};

export default ContactUs;
