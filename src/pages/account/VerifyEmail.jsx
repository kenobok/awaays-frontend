import { useState, useEffect } from "react";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { useAuth } from '../../context/AuthContext'
import { motion } from "framer-motion";
import API from '/src/api/axiosInstance';
import isEmail from "validator/lib/isEmail";
import { toast } from 'react-toastify';
import { SubmitButton } from '../../components/utils/SubmitButton'
import '../../assets/styles/account.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const VerifyEmail = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const from = searchParams.get("from") || "/give-item";
    const [changeEmail, setChangeEmail] = useState(false);
    const [formData, setFormData] = useState({ code: "", email: "" });
    const [inputFocus, setInputFocus] = useState({ code: false, email: false });
    const [error, setError] = useState({});
    const [cooldown, setCooldown] = useState(0);
    const [loading, setLoading] = useState(false);
    const [loading2, setLoading2] = useState(false);
    const { user, refetch } = useAuth();

    useEffect(() => {
        if (cooldown === 0) return;
        const interval = setInterval(() => {
            setCooldown((prev) => prev - 1);
        }, 1000);
        return () => clearInterval(interval);
    }, [cooldown]);

    const handleMode = () => {
        setChangeEmail(prev => !prev)
        setFormData({ code: "", email: ""  })
        setInputFocus({ code: false, email: false })
        setError({});
    }

    const handleInputFocus = (field) => {
        setInputFocus((prev) => ({ ...prev, [field]: true }));
    };

    const handleInputBlur = (field) => {
        if (!formData[field]) {
            setInputFocus((prev) => ({ ...prev, [field]: false }));
        }
    };

    const handleRequestNewCode = async () => {
        if (cooldown > 0) return;
    
        setLoading2(true)
        try {
            const response = await API.post('/account/resend-otp/', { email: user.email });
            toast.success(response.data.detail);
            setCooldown(60);
            setFormData({code: ''})
            setInputFocus({ code: false });
            setError('')
        } catch (error) {
            toast.error('An error occurred');
        } finally {
            setLoading2(false)
        }
    };

    const validateCode = (value) => {
        if (!/^\d{6}$/.test(value)) {
            setError({code: "Code is 6 digits ... check your email"});
            return false;
        } else {
            setError({});
            return true;
        }
    };

    const validateEmail = (value) => {
        if (!value || !isEmail(value)) {
            setError({email: "Enter a valid email"});
            return false;
        } else {
            setError({});
            return true;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!changeEmail) {
            const isValid = validateCode(formData.code);
            if (!isValid) return;

            setLoading(true);

            try {
                const response = await API.post('/account/verify-email/', formData);
                toast.success(response.data.message);
                setFormData({ code: '' });
                setInputFocus({ code: false });
                setError({});
                setCooldown(0);
                refetch();
                navigate(from, { replace: true });
            } catch (error) {
                toast.error(error.response?.data?.error || "An error occurred");
                if(error.response?.data?.error) setError({'code': error.response.data.error})
            } finally {
                setLoading(false);
            }
        } else {
            const isValid = validateEmail(formData.email);
            if (!isValid) return;

            setLoading(true);

            try {
                const res = await API.patch(`/account/users/${user.id}/`, { "email": formData.email })
                toast.success('Email changed successfully');
                setFormData({ email: '' });
                setInputFocus({ email: false });
                setError({});
                refetch();
                // handleRequestNewCode();
            } catch (error) {
                console.log(error)
                const err = error?.response?.data
                if(err.email[0]) {
                    toast.error(err.email);
                    setError({'email': err.email})
                } else {
                    toast.error("An error occurred...try again");
                }
            } finally {
                setLoading(false);
            }
        }
    };


    return (
        <>
            <div className="auth-switch relative flex justify-center mb-10 mx-auto"></div>
            <motion.form onSubmit={handleSubmit} className="auth-form w-[23rem] max-[501px]:w-[90%] p-7 rounded-2xl mx-auto" transition={{ duration: 0.3 }}>
                <h3 className="text-center font-semibold text-[1.3rem]">{ changeEmail ? 'Change' : 'Verify' } Email</h3>
                <p className="leading-[.95rem] text-center ">{ user && user.email }</p>
                { !changeEmail ?
                <div className="form-input my-3">
                    <label htmlFor="resetPasswordCode" className={`block text-gray-600 font-medium ${inputFocus.code ? 'is-focus' : ''}`}>Code</label>
                    <input type="tel" name="code" id="resetPasswordCode" className={`${error.code ? 'error' : ''}`}
                        value={formData.code}
                        onChange={(e) => {const onlyNums = e.target.value.replace(/\D/g, ''); setFormData({ code: onlyNums }); validateCode(onlyNums)}}
                        maxLength={6}
                        onFocus={() => handleInputFocus("code")}
                        onBlur={() => handleInputBlur("code")}
                    />
                    {error.code && <small>{error.code}</small>}
                </div>
                :
                <div className="form-input my-3">
                    <label htmlFor="changeEmail" className={`block text-gray-600 font-medium ${inputFocus.email ? 'is-focus' : ''}`}>New Email</label>
                    <input type="email" name="email" id="changeEmail" className={`${error.email ? 'error' : ''}`}
                        value={formData.email}
                        onChange={(e) => {setFormData({ email: e.target.value }); validateEmail(e.target.value)}}
                        onFocus={() => handleInputFocus("email")}
                        onBlur={() => handleInputBlur("email")}
                    />
                    {error.email && <small>{error.email}</small>}
                </div>
                }
                { !changeEmail &&
                    <div className='flex justify-between'>
                        <p className="text-[.95rem] leading-[1.2rem]">Check email for code...</p>
                        { loading2 ?
                            <span className="text-[.95rem] leading-[1.2rem]"><FontAwesomeIcon icon='spinner' className="animate-spin text-[var(--p-color)]" /></span>
                            :
                            <span to="" className={`text-[.95rem] leading-[1.2rem] text-[var(--p-color)] cursor-pointer ${cooldown > 0 ? 'cursor-progress text-orange-600' : ''}`} onClick={() => handleRequestNewCode()}>{cooldown > 0 ? `OTP sent - (${cooldown}s)` : 'Resend code'}</span>
                        }
                    </div>
                }
                <div className={`flex justify-between ${!changeEmail ? 'mt-2' : ''}`}>
                    <p className={`text-[.95rem] leading-[1.2rem] ${!changeEmail ? 'text-orange-700' : ''}`}>{ !changeEmail ? 'Wrong email...?' : 'Verify the email...' }</p>
                    <span className={`text-[.95rem] leading-[1.2rem] text-[var(--p-color)] cursor-pointer`} onClick={handleMode}>{ !changeEmail ? 'Change' : 'Verify' } email</span>
                </div>
                
                <SubmitButton loading={loading} />
            </motion.form>
        </>
    )
}

export default VerifyEmail
