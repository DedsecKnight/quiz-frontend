interface Props {
    active?: boolean;
    icon: React.SVGProps<SVGSVGElement>;
    title: string;
    action?: () => void;
}

const NavItem: React.FC<Props> = ({ icon, title, active, action }) => {
    return (
        <button
            type="button"
            className="w-full my-3 rounded-lg focus:outline-none"
            onClick={() => {
                if (action) action();
            }}
        >
            <div
                className={`px-8 rounded-lg py-2 text-white flex flex-row justify-between items-center ${
                    active ? "bg-green-300 text-black" : " hover:bg-indigo-700"
                }`}
            >
                {icon}
                <span
                    className={`w-full text-left ml-4 text-lg ${
                        active ? "text-black" : "text-white"
                    }`}
                >
                    {title}
                </span>
            </div>
        </button>
    );
};

export default NavItem;
