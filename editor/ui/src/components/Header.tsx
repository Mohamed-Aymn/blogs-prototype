import { useConfig } from "../context/ConfigContext";

function Header() {

    const { config } = useConfig();
    return (
        <header className="flex flex-wrap w-full bg-white text-sm py-4">
            <nav className="max-w-[85rem] w-full mx-auto px-6 flex items-center justify-between" aria-label="Global">
                <a className="flex-none text-xl font-semibold" href={config.apiUrl}>
                    Blogs Prorotype
                </a>

                <div id="navbar-with-collapse" className="transition-all">
                    <a className="font-medium text-gray-600 hover:text-gray-400" href={config.apiUrl}>Home</a>
                </div>
            </nav >
        </header >
    )
}

export default Header