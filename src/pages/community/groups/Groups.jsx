import { useState, useEffect, useRef } from 'react'
import { Link, Outlet, useParams, useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { groups } from '/src/components/utils/UtilsData';
import '/src/assets/styles/community.css'

const Groups = () => {
    const { slug } = useParams();
    const location = useLocation();
    const groupFormRef = useRef();
    const [createGroupForm, setCreateGroupForm] = useState(false);
    const [formData, setFormData] = useState({ name: "", description: "" });
    const [inputFocus, setInputFocus] = useState({name: false, description: false});
    const [errors, setErrors] = useState({});

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    
    const handleClickOutside = (e) => {
        if (groupFormRef.current && !groupFormRef.current.contains(e.target)) {
            setCreateGroupForm(false);
        }
    };
    
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
                if (!value.trim() || value.length < 5) error = "Must be at least 5 characters";
                break;
            case "description":
                const wordCount = value.trim().split(/\s+/).filter(Boolean).length;
                if (wordCount > 10) {
                    error = "Not more than 10 words";
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

        setFormData({ name: "", description: "" });
    };


    return (
        <main className={`group-wrp space-x-10 flex max-[768px]:flex-col mt-[5.5rem] max-[941px]:mt-[4rem] py-10 ${location.pathname.includes(slug) ? 'display-flex-col' : ''}`}>
            <section className={`group-navs-sec w-[10rem] max-[768px]:w-[80%] ${location.pathname.includes(slug) ? 'more-width' : ''}`}>
                <div className={`group-navs text-center px-5 min-[768px]:fixed max-[768px]:mb-10 h-[90vh] max-[768px]:h-[20rem] overflow-y-auto pb-10 max-[768px]:pb-0 ${slug ? 'position-rel' : ''}`}>
                    <ul className='com-side-link relative space-y-5 p-7 text-center border-r-2 border-[var(--p-color)]'>
                        <button className='border-2 border-[var(--p-color)] p-[7px] px-5 rounded-full text-[var(--p-color)] cursor-pointer' onClick={() => setCreateGroupForm(true)}>Create Group</button>
                        { groups.map((group, index) => (
                            <li key={index} className={`lb-link border-b border-gray-300 hover:text-[var(--p-color)] hover:border-[var(--p-color)] ${slug === group.slug ? 'active show-icon' : ''}`}><Link to={group.slug}>{group.name}</Link></li>
                        ))}
                    </ul>
                </div>
            </section>

            <section className='flex-1 overflow-hidden mr-0'><Outlet /></section>
            <div className={`fixed w-full h-full top-0 left-0 bg-[rgba(0,0,0,.2)] overflow-hidden ${!createGroupForm ? 'hidden' : ''}`}>
                <form ref={groupFormRef} onSubmit={handleSubmit} className='absolute top-[50%] left-[50%] -translate-y-[50%] -translate-x-[50%] w-xl max-[577px]:w-[90%] bg-[var(--bg-color)] py-7 px-5 rounded-xl shadow-lg'>
                    <FontAwesomeIcon icon='times' className='absolute top-2 right-2 cursor-pointer ' onClick={() => setCreateGroupForm(false)}/>
                    <h4 className='font-semibold text-[1.2rem] mb-5 text-center border-b border-gray-100'>Create Group</h4>
                    <div className="form-input">
                        <label htmlFor="Name" className={`block text-gray-700 font-medium ${inputFocus.name ? 'is-focus' : ''}`}>Name</label>
                        <input type="text" name="name" id="Name" className={`${errors.name ? 'error' : ''}`} value={formData.name} onChange={handleChange} onFocus={() => handleInputFocus("name")} onBlur={() => handleInputBlur("name")} />
                        {errors.name && <small>{errors.name}</small>}
                    </div>
                    <div className="form-input textarea">
                        <label htmlFor="Description" className={`block text-gray-700 font-medium ${inputFocus.description ? 'is-focus' : ''}`}>Description</label>
                        <textarea name="description" id="Description" className={`h-20 resize-none ${errors.description ? 'error' : ''}`} value={formData.description} onChange={handleChange} onFocus={() => handleInputFocus("description")} onBlur={() => handleInputBlur("description")} />
                        {errors.description && <small>{errors.description}</small>}
                    </div>
                    <div className="pb-2 mt-2">
                        <button type="submit" className="w-full bg-[var(--p-color)] cursor-pointer text-white py-3 rounded-lg font-semibold shadow-md hover:bg-blue-700 transition">Create Group</button>
                    </div>
                </form>
            </div>
        </main>
    )
}

export default Groups

