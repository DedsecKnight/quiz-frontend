const Footer = () => {
    return (
        <div className="p-10 flex flex-col gap-y-4 md:flex-row justify-between items-center border-t">
            <h1 className="text-xl">Quiz Ltd.</h1>
            <div className="flex gap-x-4">
                <button
                    type="button"
                    className="text-blue-700 hover:text-blue-900"
                >
                    Terms
                </button>
                <button
                    type="button"
                    className="text-blue-700 hover:text-blue-900"
                >
                    Privacy
                </button>
                <button
                    type="button"
                    className="text-blue-700 hover:text-blue-900"
                >
                    Security
                </button>
                <button
                    type="button"
                    className="text-blue-700 hover:text-blue-900"
                >
                    Get in touch
                </button>
            </div>
        </div>
    );
};

export default Footer;
