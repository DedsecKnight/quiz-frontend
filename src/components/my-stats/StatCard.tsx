interface Props {
    icon: React.SVGProps<SVGSVGElement>;
    title: string;
    data: number;
}

const StatCard: React.FC<Props> = ({ icon, title, data }) => {
    return (
        <div className="flex flex-row rounded-xl mx-auto p-3 w-full lg:w-3/5 items-center  shadow-lg border-2 items-center">
            <div className="badge">{icon}</div>
            <div className="card-data ml-6">
                <h1 className="text-left font-medium text-xl text-blue-900">
                    {data}
                </h1>
                <p className="text-left text-blue-500">{title}</p>
            </div>
        </div>
    );
};

export default StatCard;
