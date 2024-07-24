function Header() {
    return (
        <header className="flex flex-wrap w-full bg-white text-sm py-4">
            <nav className="max-w-[85rem] w-full mx-auto px-6 flex items-center justify-between" aria-label="Global">
                <a className="flex-none text-xl font-semibold" href="http://blogs.demo">
                    Blogs
                </a>

                <div id="navbar-with-collapse" className="transition-all">
                    <a className="font-medium text-gray-600 hover:text-gray-400" href="http://blogs.demo">Home</a>
                </div>
            </nav >
        </header >
    )
}

export default Header