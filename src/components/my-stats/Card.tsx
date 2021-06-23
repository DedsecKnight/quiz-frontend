interface Props {
    icon: React.SVGProps<SVGSVGElement>;
    title: string;
    data: number;
}

const Card: React.FC<Props> = ({ icon, title, data }) => {
    return (
        <div className="flex flex-row rounded-xl mx-auto p-8 w-4/5 lg:w-3/5 justify-between shadow-lg border-2 items-center">
            <div className="badge">{icon}</div>
            <div className="card-data">
                <h1 className="text-right font-medium text-xl text-blue-900">
                    {data}
                </h1>
                <p className="text-right text-blue-500">{title}</p>
            </div>
        </div>
    );
};

export default Card;
