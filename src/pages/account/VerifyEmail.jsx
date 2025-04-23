import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from '../../context/AuthContext'
import { motion } from "framer-motion";
import API from '/src/AxiosInstance';
import { toast } from 'react-toastify';
import { Loader2 } from "../../components/utils/Preloader";
import '../../assets/styles/account.css';


const VerifyEmail = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [formData, setFormData] = useState({ code: "" });
    const [inputFocus, setInputFocus] = useState({ code: false });
    const [error, setError] = useState('');
    const [cooldown, setCooldown] = useState(0);
    const [loading, setLoading] = useState(false);
    const [loading2, setLoading2] = useState(false);
    const { login } = useAuth();
    const from = searchParams.get("from") || "/give-item";


    useEffect(() => {
        if (cooldown === 0) return;
        const interval = setInterval(() => {
            setCooldown((prev) => prev - 1);
        }, 1000);
        return () => clearInterval(interval);
    }, [cooldown]);


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
            const user = JSON.parse(localStorage.getItem("user"));
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
            setError("Code is 6 digits ... check your email");
            return false;
        } else {
            setError('');
            return true;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const isValid = validateCode(formData.code);
        if (!isValid) return;
    
        setLoading(true);
        try {
            const response = await API.post('/account/verify-email/', formData);
            toast.success(response.data.message);
            setFormData({ code: '' });
            navigate(from, { replace: true });
            const user = JSON.parse(localStorage.getItem('user'));
            if (user) {
                delete user.is_verified;
                login(user)
            }
            navigate(from, { replace: true });
        } catch (error) {
            toast.error(error.response?.data?.error || "An error occurred");
            if(error.response?.data?.error) setError(error.response.data.error)
        } finally {
            setLoading(false);
        }
    };


    return (
        <>
            <div className="auth-switch relative flex justify-center mb-10 mx-auto"></div>
            <motion.form onSubmit={handleSubmit} className="auth-form w-[23rem] max-[501px]:w-[90%] p-7 rounded-2xl mx-auto" transition={{ duration: 0.3 }}>
                <h3 className="text-center font-semibold text-[1.3rem]">Verify Email</h3>
                <div className="form-input">
                    <label htmlFor="resetPasswordCode" className={`block text-gray-600 font-medium ${inputFocus.code ? 'is-focus' : ''}`}>Code</label>
                    <input type="tel" name="code" id="resetPasswordCode" className={`${error ? 'error' : ''}`}
                        value={formData.code}
                        onChange={(e) => {
                            const onlyNums = e.target.value.replace(/\D/g, '');
                            setFormData({ code: onlyNums });
                            validateCode(onlyNums);
                        }}
                        maxLength={6}
                        onFocus={() => handleInputFocus("code")}
                        onBlur={() => handleInputBlur("code")}
                    />
                    {error && <small>{error}</small>}
                </div>
                <p className="inline-block text-[.95rem] leading-[1.2rem]">No code, expired code? &nbsp; &nbsp;
                    { loading2 ?
                        <span>Sending OTP...</span>
                        :
                        <span to="" className={`text-[var(--p-color)] cursor-pointer ${cooldown > 0 ? 'cursor-not-allowed' : ''}`} onClick={() => handleRequestNewCode()}>{cooldown > 0 ? `OTP Sent - (${cooldown}s)` : 'Request new code'}</span>
                    }
                </p>
                <div className="mt-3 mb-4">
                    <button type="submit" className={`w-full bg-[var(--p-color)] cursor-pointer text-white text-[1.2em] h-12 rounded-lg font-semibold shadow-md hover:bg-blue-700 transition disabled:cursor-not-allowed`} disabled={loading}>{loading ? <Loader2 /> : 'Submit'}</button>
                </div>
            </motion.form>
        </>
    )
}

export default VerifyEmail
