import { useState, useEffect, useRef } from 'react'
import { Link, Outlet, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query';
import { fetchForums } from '../../../services/fetchServices';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { toast } from 'react-toastify'
import { SubmitButton } from '../../../components/utils/SubmitButton'
import API from '/src/api/axiosInstance';
import '/src/assets/styles/community.css'

const Forums = () => {
    const { slug } = useParams();
    const forumFormRef = useRef();
    const [forumForm, setForumForm] = useState(false);
    const [formData, setFormData] = useState({ forum: null, topic: "", content: "" });
    const [inputFocus, setInputFocus] = useState({ topic: false, content: false });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const { data: forums, isLoading, isError, refetch } = useQuery({
        queryKey: ['forums-list'],
        queryFn: fetchForums,
    })

    useEffect(() => {
        setForumForm(false)
        setFormData({ topic: "", content: "" })
        setInputFocus({ topic: false, content: false })
        setErrors({})
    }, [slug])

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        forums?.forEach((forum) => {
            if (forum?.slug === slug) {
                setFormData((prev) => ({ ...prev, forum: forum.id }));
            }
        });
    }, [forums, slug]);

    const handleClickOutside = (e) => {
        if (forumFormRef.current && !forumFormRef.current.contains(e.target)) {
            setForumForm(false);
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
            case "topic":
                if (!value.trim() || value.length < 5) error = "Must be at least 5 characters";
                break;
            case "content":
                const wordCount = value.trim().split(/\s+/).filter(Boolean).length;
                if (wordCount < 10) {
                    error = "Must be at least 10 words";
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
            console.log("Errors exist:", newErrors);
            return;
        }

        setLoading(true)
        try {
            await API.post('/community/forum-conversations/', formData)
            toast.success('Conversation created')
            refetch()
            setFormData({ topic: "", content: "" });
            setForumForm(false)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    };


    return (
        <main className='space-x-10 flex max-[768px]:flex-col mt-[5.5rem] max-[941px]:mt-[4rem] py-10'>
            <section className='w-[10rem] max-[768px]:w-[80%]'>
                    <div className='px-5 min-[768px]:fixed max-[768px]:mb-10'>
                        <ul className='com-side-link relative space-y-5 p-7 text-center border-r-2 border-[var(--p-color)] min-[768px]:max-w-[17rem]'>
                            { isLoading ? <div><FontAwesomeIcon icon='spinner' className='animate-spin text-[1.2rem] text-[var(--p-color)] w-[10rem]' /></div> :
                                <>
                                    {forums?.map((forum, index) => (
                                        <li key={index} className={`lb-link border-b border-gray-300 hover:text-[var(--p-color)] hover:border-[var(--p-color)] ${forum?.slug === slug ? 'active show-icon' : ''}`}><Link to={`/community/forums/${forum?.slug}`}>{forum?.name}</Link></li>
                                    ))}
                                    {forums?.map((forum, index) => (
                                        <button key={index} className={`mt-2 border-2 border-[var(--p-color)] p-1 pt-[5px] px-3 rounded-full text-[var(--p-color)] cursor-pointer shadow-md hover:scale-105 ${forum?.slug === slug ? '' : 'hidden'}`} onClick={() => setForumForm(true)} >{forum?.button}</button>
                                    ))}
                                </>
                            }
                        </ul>
                    </div>
            </section>

            <section className='relative flex-1 overflow-hidden'>
                <Outlet context={{ forums, isLoading, isError, refetch, loading }} />
                <div className={`fixed w-full h-full top-0 left-0 bg-[rgba(0,0,0,.2)] overflow-hidden ${!slug ? 'hidden' : ''} ${!forumForm ? 'hidden' : ''}`}>
                    {forums?.map((forum, index) => (
                        forum?.slug === slug &&
                        <form ref={forumFormRef} key={index} onSubmit={handleSubmit} className='absolute top-[50%] left-[50%] -translate-y-[50%] -translate-x-[50%] w-xl max-[577px]:w-[90%] bg-[var(--bg-color)] py-7 px-5 rounded-xl shadow-lg'>
                            <FontAwesomeIcon icon='times' className='absolute top-2 right-2 cursor-pointer ' onClick={() => setForumForm(false)} />
                            <h4 className='font-semibold text-[1.2rem] mb-5 text-center border-b border-gray-100'>{forum?.name}</h4>
                            <div className="form-input">
                                <label htmlFor="Topic" className={`block text-gray-700 font-medium ${inputFocus.topic ? 'is-focus' : ''}`}>Topic</label>
                                <input type="text" name="topic" id="Topic" className={`${errors.topic ? 'error' : ''}`} value={formData.topic} onChange={handleChange} onFocus={() => handleInputFocus("topic")} onBlur={() => handleInputBlur("topic")} />
                                {errors.topic && <small>{errors.topic}</small>}
                            </div>
                            <div className="form-input textarea">
                                <label htmlFor="Content" className={`block text-gray-700 font-medium ${inputFocus.content ? 'is-focus' : ''}`}>Content</label>
                                <textarea name="content" id="Content" className={`h-32 ${errors.content ? 'error' : ''}`} value={formData.content} onChange={handleChange} onFocus={() => handleInputFocus("content")} onBlur={() => handleInputBlur("content")} />
                                {errors.content && <small>{errors.content}</small>}
                            </div>
                            <div className="pb-2 mt-2">
                                {/* <button type="submit" className="w-full bg-[var(--p-color)] cursor-pointer text-white py-3 rounded-lg font-semibold shadow-md hover:bg-blue-700 transition">{forum?.button}</button> */}
                                <SubmitButton loading={loading} label={forum?.button}/>
                            </div>
                        </form>
                    ))}
                </div>
            </section>
        </main>
    )
}

export default Forums

