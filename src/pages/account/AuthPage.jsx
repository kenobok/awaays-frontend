import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import '../../assets/styles/account.css';

const AuthPage = () => {

	return (
		<main className="auth-wrp flex w-full m-auto py-20 max-[993px]:pt-15 max-[768px]:pt-10 mt-[5.3rem] max-[941px]:mt-[4.2rem]">
			<motion.section className="auth-img flex-1" initial={{ opacity: 0, x: -500 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, ease: "easeInOut"  }}></motion.section>

			<motion.section className="px-30 py-10 max-[1081px]:px-20 max-[993px]:px-10 max-[577px]:translate-y-[-2rem] max-[501px]:px-0 max-[501px]:pt-0" initial={{ opacity: 0, x: 500 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, ease: "easeInOut"  }}>
				<Outlet />
			</motion.section>
		</main>
	);
}

export default AuthPage
