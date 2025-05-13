import { useState, useEffect, useRef } from 'react'
import { Link, Outlet, useParams, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '/src/context/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { fetchGroups } from '../../../services/fetchServices';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SubmitButton } from '/src/components/utils/SubmitButton';
import { toast } from 'react-toastify';
import API from '/src/api/axiosInstance';
import '/src/assets/styles/community.css';

const Groups = () => {
    const { slug } = useParams();
    const { user } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const groupFormRef = useRef();
    const [createGroupForm, setCreateGroupForm] = useState(false);
    const [formData, setFormData] = useState({ name: "", description: "", image: null });
    const [inputFocus, setInputFocus] = useState({name: false, description: false});
    const [errors, setErrors] = useState({});
    const [selectedImage, setSelectedImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const from = location.pathname + location.search


    const {data: groups, isLoading, isError, refetch, isFetching} = useQuery({
        queryKey: ['groups-list'],
        queryFn: fetchGroups,
        refetchOnWindowFocus: true
    })

    // useEffect(() => {
    //     console.log(groups)
    // }, [groups])

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleCreateGroup = () => {
        if (user && user.is_verified) {
            setCreateGroupForm(true)
        } else {
            navigate(`/auth?from=${encodeURIComponent(from)}`, { replace: true });
        }
    }
    
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

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setSelectedImage(file);
        setFormData(prev => ({...prev, image: file}))
        setErrors(prev => ({...prev, image: ''}))
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
            const res = await API.post(`/community/groups/`, formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            toast.success('Group created successfully')
            refetch()
            setFormData({ name: "", description: "", image: null });
            setInputFocus({name: false, description: false});
            setSelectedImage(null)
            setCreateGroupForm(false)
        } catch (error) {
            const err = error?.response?.data
            if (err?.name) {
                toast.error(err.name[0])
                setErrors(prev => ({...prev, name: err.name[0]}))
            } 
            if (err?.image) {
                toast.error('Invalid or corrupt image')
                setErrors(prev => ({...prev, image: 'Invalid or corrupt image'}))
            } 
            if(!err?.name && !err?.image) {
                toast.error('An error occurred, try again...')
            }
        } finally {
            setLoading(false)
        }
    };


    return (
        <main className={`group-wrp space-x-10 flex max-[768px]:flex-col mt-[5.5rem] max-[941px]:mt-[4rem] py-10 max-[651px]:pb-2 ${location.pathname.includes(slug) ? 'display-flex-col' : ''}`}>
            <section className={`group-navs-sec w-[10rem] max-[768px]:w-[80%] ${location.pathname.includes(slug) ? 'more-width' : ''}`}>
                <div className={`group-navs text-center px-5 min-[768px]:fixed max-[768px]:mb-10 h-[90vh] max-[768px]:h-[17rem] overflow-y-auto pb-10 max-[768px]:pb-0 ${slug ? 'position-rel' : ''}`}>
                    <ul className='com-side-link relative space-y-5 p-7 text-center border-r-2 border-[var(--p-color)] min-[768px]:max-w-[17rem]'>
                        { 
                            isLoading ? <FontAwesomeIcon icon='spinner' className='animate-spin text-[1.2rem] text-[var(--p-color)] w-[10rem]' /> :
                            <>
                                <button className='border-2 border-[var(--p-color)] p-[7px] px-5 rounded-full text-[var(--p-color)] cursor-pointer' onClick={() => handleCreateGroup()}>Create Group</button>
                                { isFetching && <FontAwesomeIcon icon='spinner' className='animate-spin w-[13rem] text-[1.2rem] text-[var(--p-color)]' /> }
                                {groups?.map((group, index) => (
                                    <li key={index} className={`lb-link border-b border-gray-300 hover:text-[var(--p-color)] hover:border-[var(--p-color)] ${slug === group.slug ? 'active show-icon' : ''}`}><Link to={group.slug}>{group.name}</Link></li>
                                ))}
                            </>
                        }
                    </ul>
                </div>
            </section>

            <section className='flex-1 overflow-hidden mr-0'>
                <Outlet context={{ groups, isLoading, isError, refetch, isFetching }}/>
            </section>
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
                    <div className="py-[1rem] relative overflow-hidden mb-5">
                        <label htmlFor="editProfileImage" className={`block py-[11px] pl-4 border border-[#D1D5DB] rounded-[.5rem] cursor-pointer ${errors.image ? 'border-red-400' : ''}`} style={{position:'relative',width:'100% '}}>{ !selectedImage ? 'Select Image (Optional)' : 'Image selected' } </label>
                        <input type="file" accept="image/*" id="editProfileImage" className={`pr-16 hidden`} onChange={handleImageChange}/>

                        {selectedImage && (
                            <img src={URL.createObjectURL(selectedImage)} alt="preview" className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 object-cover rounded-full border"/>
                        )}
                        {errors.image && <small className='absolute text-red-500'>{errors.image}</small>}
                    </div>

                    <SubmitButton loading={loading} />
                </form>
            </div>
        </main>
    )
}

export default Groups

