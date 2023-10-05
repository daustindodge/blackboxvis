import {Link, NavLink, Outlet} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faCubesStacked,
    faHandPointLeft,
    faMagnifyingGlass,
    faMapLocationDot, faMoon,
    faShuffle
} from "@fortawesome/free-solid-svg-icons";

const DefaultLayout = () =>
{
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-light mb-3 shadow-sm">
                <div className="container">
                    <Link className="navbar-brand" to="/">
                        <img src="/images/bbvlogo.svg" alt="Black Box Visualizer Logo" height="45" />
                    </Link>
                    <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            <NavLink className="nav-link position-relative ms-4" aria-current="page" to="/sorting">
                                <FontAwesomeIcon icon={faShuffle} style={{marginRight: "5px"}} />
                                Sorting
                                <span className="nav-span bg-primary" />
                            </NavLink>
                            <NavLink className="nav-link position-relative ms-4 disabled" to="/pathfinding">
                                <FontAwesomeIcon icon={faMapLocationDot} style={{marginRight: "5px"}} />
                                Pathfinding
                                <span className="nav-span bg-primary" />
                            </NavLink>
                            <NavLink className="nav-link position-relative ms-4 me-3 disabled" to="/searching">
                                <FontAwesomeIcon icon={faMagnifyingGlass} style={{marginRight: "5px"}} />
                                Searching
                                <span className="nav-span bg-primary" />
                            </NavLink>
                            {/*<NavLink className="nav-link position-relative ms-4 disabled" to="/greedy">*/}
                            {/*    <FontAwesomeIcon icon={faCubesStacked} style={{marginRight: "5px"}} />*/}
                            {/*    Greedy*/}
                            {/*    <span className="nav-span bg-primary" />*/}
                            {/*</NavLink>*/}
                            {/*<NavLink className="nav-link position-relative ms-4 me-3 disabled" to="/backtracking">*/}
                            {/*    <FontAwesomeIcon icon={faHandPointLeft} style={{marginRight: "5px"}} />*/}
                            {/*    Backtracking*/}
                            {/*    <span className="nav-span bg-primary" />*/}
                            {/*</NavLink>*/}
                            <button className="nav-link ps-4 border-start">
                                <FontAwesomeIcon icon={faMoon} style={{marginRight: "5px"}} />
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
            <div className="container">
                <Outlet />
            </div>
        </>
    )
}

export default DefaultLayout;