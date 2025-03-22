import { useState } from "react";

const ContactUs = () => {
    const [formData, setFormData] = useState({ name: "", email: "", message: "" });
    const [inputFocus, setInputFocus] = useState({name: false, email: false, message: false});
    
    const handleInputFocus = (field) => {
        setInputFocus((prev) => ({ ...prev, [field]: true }));
    };
    
    const handleInputBlur = (field) => {
        if (formData[field] == "") {
            setInputFocus((prev) => ({ ...prev, [field]: false }));
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormData({ name: "", email: "", message: "" });
    };

    return (
        <main className="max-w-xl mx-auto p-15 pb-20 rounded-lg translate-y-[6rem] max-[941px]:p-5">
            <h1 className="text-3xl font-bold m-0 p-0 mb-2 text-center">Contact Us</h1>
            <p className="text-center text-gray-600 m-0 p-0 mb-4">
                Have questions? We're here to help. Fill out the form below and we'll get back to you as soon as possible.
            </p>

            <form onSubmit={handleSubmit} className="space-y-3 py-1">
                <div className="form-input">
                    <label htmlFor="contactUsName" className={`block text-gray-700 font-medium ${inputFocus.name ? 'is-focus' : ''}`}>Full Name</label>
                    <input type="text" name="name" id="contactUsName" value={formData.name} onChange={handleChange} onFocus={() => handleInputFocus("name")} onBlur={() => handleInputBlur("name")} required className="w-full p-3 border border-gray-400 rounded-lg focus:ring focus:ring-blue-300"/>
                </div>

                <div className="form-input">
                    <label htmlFor="contactUsEmail" className={`block text-gray-700 font-medium ${inputFocus.email ? 'is-focus' : ''}`}>Email</label>
                    <input type="email" name="email" id="contactUsEmail" value={formData.email} onChange={handleChange} onFocus={() => handleInputFocus("email")} onBlur={() => handleInputBlur("email")} required className="w-full p-3 border border-gray-400 rounded-lg focus:ring focus:ring-blue-300"/>
                </div>

                <div className="form-input textarea">
                    <label htmlFor="contactUsMessage" className={`block text-gray-700 font-medium ${inputFocus.message ? 'is-focus' : ''}`}>Message</label>
                    <textarea name="message" id="contactUsMessage" value={formData.message} onChange={handleChange} onFocus={() => handleInputFocus("message")} onBlur={() => handleInputBlur("message")} required className="w-full p-3 border border-gray-400 rounded-lg focus:ring focus:ring-blue-300 h-32"/>
                </div>
                <div className="pb-2 px-2">
                    <button type="submit" className="w-full bg-[var(--p-color)] cursor-pointer text-white py-3 rounded-lg font-semibold shadow-md hover:bg-blue-700 transition">Send Message</button>
                </div>
            </form>

            <div className="text-center mt-6">
                <p className="text-gray-600">Or email us directly at</p>
                <a href="mailto:awaays.info@gmail.com" className="text-[var(--p-color)] cursor-pointer font-semibold">awaays.info@gmail.com</a>
            </div>
        </main>
    );
};

export default ContactUs;
