import {Link, Outlet} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faCubesStacked,
    faHandPointLeft,
    faMagnifyingGlass,
    faMapLocationDot,
    faShuffle
} from "@fortawesome/free-solid-svg-icons";

const DefaultLayout = () =>
{
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-light mb-3 shadow-sm">
                <div className="container">
                    <Link className="navbar-brand" to="/">
                        <img src="/images/bbvlogo.svg" alt="algovis.io" height="45" />
                    </Link>
                    <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            <Link className="nav-link ms-4" aria-current="page" to="/sorting">
                                <FontAwesomeIcon icon={faShuffle} style={{marginRight: "5px"}} />
                                Sorting
                            </Link>
                            <Link className="nav-link ms-4" to="/pathfinding">
                                <FontAwesomeIcon icon={faMapLocationDot} style={{marginRight: "5px"}} />
                                Pathfinding
                            </Link>
                            <Link className="nav-link ms-4" to="#">
                                <FontAwesomeIcon icon={faMagnifyingGlass} style={{marginRight: "5px"}} />
                                Searching
                            </Link>
                            <Link className="nav-link ms-4" to="#">
                                <FontAwesomeIcon icon={faCubesStacked} style={{marginRight: "5px"}} />
                                Greedy
                            </Link>
                            <Link className="nav-link ms-4" to="#">
                                <FontAwesomeIcon icon={faHandPointLeft} style={{marginRight: "5px"}} />
                                Backtracking
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>
            <Outlet />
        </>
    )
}

export default DefaultLayout;