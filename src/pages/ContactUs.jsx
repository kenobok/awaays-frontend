import { useState, useEffect } from "react";
import API from '/src/api/axiosInstance'
import isEmail from 'validator/lib/isEmail';
import { useQuery } from "@tanstack/react-query";
import { fetchContacts } from "../services/fetchServices";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SubmitButton } from "../components/utils/SubmitButton";
import { toast } from 'react-toastify'


const ContactUs = () => {
    const [formData, setFormData] = useState({ name: "", email: "", message: "" });
    const [inputFocus, setInputFocus] = useState({name: false, email: false, message: false});
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [contact, setContact] = useState({phone_number: '', email: ''})

    const { data, isLoading, isError, refetch, isFetching } = useQuery({
        queryKey: ['contacts'],
        queryFn: fetchContacts,
        staleTime: 1000 * 60 * 60 * 24 * 30,
        cacheTime: 1000 * 60 * 60 * 24 * 30,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
    })

    useEffect(() => {
        const localContact = localStorage.getItem('contact_info');
        if (localContact) {
            try {
                const parsed = JSON.parse(localContact);
                setContact(parsed);
            } catch (err) {
                console.error("Failed to parse contact info from localStorage:", err);
            }
        }
    }, []);
    
    useEffect(() => {
        if (data?.phone_number && data?.email) {
            const contactDetails = {phone_number: data.phone_number, email: data.email};
            localStorage.setItem('contact_info', JSON.stringify(contactDetails));
            setContact(contactDetails);
        }
    }, [data]);
    
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
                if (wordCount < 5) {
                    error = "Must be at least 5 words";
                }
                break;
        }
        setErrors((prev) => ({ ...prev, [field]: error }));
    }

    const handleSubmit = async (e) => {
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
            return;
        }

        setLoading(true)
        try {
            const res = await API.post('/contact/message/', formData)
            toast.success("Message sent, we'll get back to you shortly")
            setFormData({ name: "", email: "", message: "" });
            setInputFocus({name: false, email: false, message: false});
            setErrors({});
        } catch(error) {
            toast.error('An error occured, try again...')
        } finally {
            setLoading(false)
        }
    };

    return (
        <main className="max-w-xl mx-auto p-15 pb-20 rounded-lg translate-y-[6rem] max-[941px]:p-5">
            <h1 className="text-3xl font-bold m-0 p-0 mb-3 text-center">Contact Us</h1>
            <p className="text-center text-gray-600 m-0 p-0 leading-[1.3rem]">Have questions? We're here to help.</p>

            <div className="text-center my-4">
                {/* <div>
                    <b><FontAwesomeIcon icon={['fab', 'whatsapp']} className="text-green-800 text-[1.2rem]"/> : </b>
                    <a href={`https://wa.me/${contact?.phone_number.slice(1)}`} target="_blank" rel="noopener noreferrer" className="text-[var(--p-color)] cursor-pointer font-semibold text-[1.2rem]">{contact?.phone_number || 'Fetching data.....'}</a>
                </div> */}
                <div>
                    <b><FontAwesomeIcon icon={['far', 'envelope']} className="text-blue-800 text-[1.2rem] translate-y-[.2rem]"/> : </b><a href={`mailto:${contact?.email}`} className="text-[var(--p-color)] cursor-pointer  text-[1.2rem]">{contact?.email || 'Fetching data.....'}</a>
                </div>
            </div>

            <p className="text-gray-600 text-center">Or fill the form below, we'll get back to you shortly!</p>

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
                <SubmitButton loading={loading} />
            </form>
        </main>
    );
};

export default ContactUs;
