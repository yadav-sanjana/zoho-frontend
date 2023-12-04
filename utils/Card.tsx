import { IconType } from "react-icons"

interface HelpCardProps {
    title: string;
    content: string;
    icon: IconType;
}

const HelpCard: React.FC<HelpCardProps> = ({ title, content, icon: Icon }) => {
    
    return (
        <>

            <div className="max-w-sm hover:bg-cyan-100 p-6 bg-white border border-gray-200 rounded-lg shadow">

                <div className="items-center">
                    <Icon className="h-8 w-8 text-cyan-500" />
                    <a href="#">
                        <p className="my-2  text-2xl font-semibold tracking-tight text-gray-900 dark:text-gray-600">{title}</p>
                    </a>
                </div>
                <p className="mb-2 font-normal text-gray-500 dark:text-gray-400">{content}</p>
            </div >
            


        </>

    );
};

export default HelpCard;
