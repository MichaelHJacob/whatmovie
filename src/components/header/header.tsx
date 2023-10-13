import Link from "next/link"

export default function Header() {
    return(
        <header className="w-full sticky top-0 px-24  ">
            <div className="max-w-5xl min-h-[5vh] mx-auto flex justify-center sm:justify-between items-center w-full ">
            <Link href="/"  className='flex p-2 rounded-xl hover:bg-black hover:text-slate-300 transition-all duration-1000 '><h1>WM</h1></Link>
            </div>
        </header>
    )
}