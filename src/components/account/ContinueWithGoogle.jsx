import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function ContinueWithGoogle() {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        window.google.accounts.id.initialize({
            client_id: "972409687092-ap50aanokaofs65m8to9cn3s147f8vcp.apps.googleusercontent.com",
            callback: handleGoogleResponse,
        });
    }, []);

    const handleGoogleResponse = async (response) => {
        const idToken = response.credential;

        const res = await fetch("https://api.awaays.com/api/account/auth/google/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ id_token: idToken }),
        });

        if (res.ok) {
            console.log("Logged in with Google");
        } else {
            console.error("Google login failed");
        }
    };

    const triggerGoogleLogin = () => {
        setLoading(true);
        try {
            window.google.accounts.id.prompt();
        } catch (error) {
            console.error("An error occurred, try again...");
        } finally {
            setLoading(false);
        }
    };

    return (
        <button type="button" className="bg-[var(--bg-color)] leading-[0.8rem] rounded-lg hover:bg-white transition flex items-center justify-center" onClick={triggerGoogleLogin}>
            <img src="https://www.svgrepo.com/show/355037/google.svg" alt="Google" className="w-5 h-5 mr-1"/>
            { loading ? <FontAwesomeIcon icon='spinner' className="animate-spin px-5 text-[1rem]" /> : 'Continue with Google' }
        </button>
    );
}


