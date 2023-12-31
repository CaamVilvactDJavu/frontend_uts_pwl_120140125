import { Clock } from "./Clock"

export default function FooterView() {
    return (
        <div className='w-full dark:bg-white dark:text-black bg-black text-white flex justify-center items-center'>
            <div className='mx-4 md:mx-20 lg:mx-40'>
                <div className='flex justify-center items-center my-2 p-2'>
                    <span className="text-lg md:text-xl lg:text-2xl">
                        <Clock />
                    </span>
                </div>
            </div>
        </div>
    )
}



