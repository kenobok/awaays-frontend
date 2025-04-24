import '../../assets/styles/preloader.css'


const Loader1 = () => {
    return (
        <div className="preloader1">
            <div className="loader1"></div>
        </div>
    );
};

const ButtonLoader = () => {
    return (
        <div className="preloader1">
            <div className="loader2"></div>
        </div>
    );
};

const LogoutLoader = () => {
    return (
        <div className="preloader1">
            <div className="loader2 logout-loader"></div>
        </div>
    );
};

export { Loader1, ButtonLoader, LogoutLoader }
