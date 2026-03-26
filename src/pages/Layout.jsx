import { Outlet, Link } from "react-router-dom";

function Layout() {

    return (
        <div>
            <nav>
                <Link to="/">Home|</Link>
                <Link to="/stats">Stats</Link>
            </nav>
            <main>
                <Outlet />
            </main>
            <footer>
                <p>&copy; My App 2026</p>
            </footer>
        </div>
    );
}

export default Layout;