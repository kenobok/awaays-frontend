import { useEffect } from "react";

export function ContinueWithGoogle() {
    useEffect(() => {
        window.google.accounts.id.initialize({
            client_id: "972409687092-ap50aanokaofs65m8to9cn3s147f8vcp.apps.googleusercontent.com",
            callback: handleGoogleResponse,
        });
    }, []);

    const handleGoogleResponse = async (response) => {
        const idToken = response.credential;

        const res = await fetch("https://api.awaays.com/api/auth/google/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include", // for httpOnly cookie
            body: JSON.stringify({ id_token: idToken }),
        });

        if (res.ok) {
            // Handle success — update auth context or redirect
            console.log("Logged in with Google");
        } else {
            console.error("Google login failed");
        }
    };

    const triggerGoogleLogin = () => {
        window.google.accounts.id.prompt(); // opens Google's popup
    };

    console.log(window.location.origin);

    return (
        <button type="button" className="bg-[var(--bg-color)] leading-[0.8rem] rounded-lg hover:bg-white transition flex items-center justify-center" onClick={triggerGoogleLogin}>
            <img src="https://www.svgrepo.com/show/355037/google.svg" alt="Google" className="w-5 h-5 mr-1"/>
            Continue with Google
        </button>
    );
}


