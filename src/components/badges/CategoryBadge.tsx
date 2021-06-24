interface Props {
    categoryName: string;
}

const CategoryBadge: React.FC<Props> = ({ categoryName }) => {
    return (
        <div className="bg-pink-500 py-1 px-2 text-white rounded-lg">
            {categoryName}
        </div>
    );
};

export default CategoryBadge;
