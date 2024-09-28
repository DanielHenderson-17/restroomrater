import './SideBar.css';

export const SideBar = () => {
    return (
        <div className="d-flex flex-column bg-light position-fixed h-100 sidebar">
            <nav className="nav flex-column py-3">
                <a className="nav-link" href="/filter1">Filter 1</a>
                <a className="nav-link" href="/filter2">Filter 2</a>
                <a className="nav-link" href="/filter3">Filter 3</a>
            </nav>
            <div className="sidebar-content flex-fill"></div>
        </div>
    );
};

export default SideBar;
