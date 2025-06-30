import Link from "next/link";


export default function NotFound() {
    return (
        <div className="bg-[#0B0033] text-white font-bold w-full h-screen flex flex-col justify-center items-center">
            <span className="text-3xl font-mono"><b className="text-5xl text-red-400">404</b> Page Not Found.....</span>
            <Link href="/" 
            className="border border-purple-300 text-white font-bold bg-[#13A5D2]/35 px-4 py-2 rounded mt-4 hover:bg-white hover:text-black">
                Home Page
            </Link>
        </div>
    )
}