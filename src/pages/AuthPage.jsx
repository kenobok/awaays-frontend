import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import authImg from '../assets/images/awaays1.png'
import '../assets/styles/auth.css'

const AuthPage = () => {
	const [isSignUp, setIsSignUp] = useState(true);
	const [formData, setFormData] = useState({ name: "", email: "", phone: "", password: "" });
    const [inputFocus, setInputFocus] = useState({name: false, email: false, phone: false, password: false});
    
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
        setFormData({ name: "", email: "", phone: "", password: ""});
    };


	return (
		<main className="flex bg-gray-400 w-full my-auto overflow-hidden translate-y-[6rem]">
			<section className="auth-img flex-1"></section>

			<section className="px-30 py-10">
				<div className="auth-switch relative flex justify-center mb-4">
					<button className="text-center text-gray-400 text-xl font-bold">JOIN US</button>
					<button className="text-center text-gray-400 text-xl font-bold">SIGN IN</button>
				</div>
				<form onSubmit={handleSubmit} className="auth-form bspace-y-[0.5rem] w-[23rem] px-5 py-10 rounded-3xl bg-[var(--bg-color)]">
					<div className="form-input">
						<label htmlFor="joinUsName" className={`block text-gray-600 font-medium ${inputFocus.name ? 'is-focus' : ''}`}>Full Name</label>
						<input type="text" name="name" id="joinUsName" value={formData.name} onChange={handleChange} onFocus={() => handleInputFocus("name")} onBlur={() => handleInputBlur("name")} required className="w-full p-3 border border-gray-400 rounded-lg focus:ring focus:ring-blue-300"/>
					</div>
					<div className="form-input">
						<label htmlFor="joinUsEmail" className={`block text-gray-600 font-medium ${inputFocus.email ? 'is-focus' : ''}`}>Email</label>
						<input type="email" name="email" id="joinUsEmail" value={formData.email} onChange={handleChange} onFocus={() => handleInputFocus("email")} onBlur={() => handleInputBlur("email")} required className="w-full p-3 border border-gray-400 rounded-lg focus:ring focus:ring-blue-300"/>
					</div>
					<div className="form-input">
						<label htmlFor="joinUsPhone" className={`block text-gray-600 font-medium ${inputFocus.phone ? 'is-focus' : ''}`}>Phone Number</label>
						<input type="tel" name="phone" id="joinUsPhone" value={formData.phone} onChange={handleChange} onFocus={() => handleInputFocus("phone")} onBlur={() => handleInputBlur("phone")} required className="w-full p-3 border border-gray-400 rounded-lg focus:ring focus:ring-blue-300"/>
					</div>
					<div className="form-input">
						<label htmlFor="joinUsPassword" className={`block text-gray-600 font-medium ${inputFocus.password ? 'is-focus' : ''}`}>Password</label>
						<input type="password" name="password" id="joinUsPassword" value={formData.password} onChange={handleChange} onFocus={() => handleInputFocus("password")} onBlur={() => handleInputBlur("password")} required className="w-full p-3 border border-gray-400 rounded-lg focus:ring focus:ring-blue-300"/>
						<FontAwesomeIcon icon="eye" className="absolute top-6 right-5" />
					</div>
					<div className="form-input flex" style={{ padding:"0 10px" }}>
						<input type="checkbox" name="agree" className="inline-block w-5" />
						<p className="inline-block pl-3 text-[.95rem] leading-[1.2rem]">I agree to the <Link to="/terms-and-conditions" className="text-[var(--p-color)]">Terms of Service</Link> and <Link to="/privacy-policy" className="text-[var(--p-color)]">Privacy Policy</Link></p>
					</div>
					<div className="mt-3 pb-2 px-2">
						<button type="submit" className="w-full bg-[var(--p-color)] cursor-pointer text-white py-3 rounded-lg font-semibold shadow-md hover:bg-blue-700 transition">Submit</button>
					</div>
					<p className="p-0 m-0 px-3 text-[.9rem]">Already have an Account? <Link to="" className="text-[var(--p-color)] text-[1rem]">Login</Link></p>
					<div className="flex justify-between my-3 p-1 continue-with-google">
						<button className="bg-[var(--bg-color)] rounded-lg hover:bg-white transition flex items-center justify-center">
							<img src="https://www.svgrepo.com/show/355037/google.svg" alt="Google" className="w-4 h-4 mr-1"/>
							Proceed with Google
						</button>
						<button className="bg-[var(--bg-color)] rounded-lg hover:bg-white transition flex items-center justify-center">
							<img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" alt="Apple" className="w-4 h-4 mr-1"/>
							Proceed with Apple
						</button>
					</div>
				</form>
			</section>
		</main>
    // <div className="flex items-center justify-center h-screen bg-gradient-to-r from-purple-500 to-indigo-600">
    //   <div className="relative w-[24rem] bg-white p-8 rounded-2xl shadow-xl overflow-hidden">
    //     <div className="flex justify-center mb-6">
    //       <button onClick={() => setIsSignUp(!isSignUp)} className="px-4 py-2 bg-indigo-600 text-white rounded-lg shadow-md transition-all hover:bg-indigo-700">
    //         {isSignUp ? "Switch to Sign In" : "Switch to Sign Up"}
    //       </button>
    //     </div>

    //     <motion.div key={isSignUp ? "signup" : "signin"} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} transition={{ duration: 0.5 }}>
    //       <h2 className="text-center text-2xl font-bold mb-4 text-gray-800">
    //         {isSignUp ? "Sign Up" : "Sign In"}
    //       </h2>

    //       <form className="flex flex-col gap-4">
    //         {isSignUp && (
    //           <input
    //             type="text"
    //             placeholder="Full Name"
    //             className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-indigo-300"
    //           />
    //         )}

    //         <input
    //           type="email"
    //           placeholder="Email Address"
    //           className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-indigo-300"
    //         />

    //         <input
    //           type="password"
    //           placeholder="Password"
    //           className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-indigo-300"
    //         />

    //         <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg transition-all">
    //           {isSignUp ? "Create Account" : "Sign In"}
    //         </button>
    //       </form>
    //     </motion.div>
    //   </div>
    // </div>
  	);
}

export default AuthPage
