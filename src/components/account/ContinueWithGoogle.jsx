import { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export function ContinueWithGoogle() {
    const location = useLocation();
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(location.search);
    const next = searchParams.get("next") || "/give-item";
    const [loading, setLoading] = useState(false);
    const googleButtonRef = useRef(null);

    useEffect(() => {
        if (!window.google || !googleButtonRef.current) return;
        googleButtonRef.current.innerHTML = "";

        window.google.accounts.id.initialize({
            client_id: "972409687092-ap50aanokaofs65m8to9cn3s147f8vcp.apps.googleusercontent.com",
            callback: handleGoogleResponse,
        });

        window.google.accounts.id.renderButton(googleButtonRef.current, {
            theme: "outline", // or "filled_blue"
            size: "large",    // or "medium", "small"
            type: "standard", // or "icon"
            shape: "pill",    // or "rectangular"
            logo_alignment: "center",
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
            toast.success("Login successful");
            window.location.reload()
        } else {
            toast.error("Login failed, please try again");
        }
    };

    return (
        <div className="flex justify-center mt-6 mb-3 mx-auto" ref={googleButtonRef}></div>
    );
}


