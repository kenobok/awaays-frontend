import { ButtonLoader } from "./Preloader";

const SubmitButton = ({ loading = false, disabled = false }) => {

    return (
        <div className="mt-3 mb-4">
            <button type="submit" 
                className={`w-full bg-[var(--p-color)] cursor-pointer text-white text-[1.2rem] h-12 rounded-lg font-semibold shadow-md hover:bg-blue-700 transition disabled:cursor-progress`} 
                disabled={loading || disabled}
            >
            {loading ? <ButtonLoader /> : 'Submit'}
            </button>
        </div>
    )
}

export { SubmitButton }
