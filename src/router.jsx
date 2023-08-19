import {createBrowserRouter} from "react-router-dom";
import {Sorting, PathFinding, DefaultLayout} from "./components/Components.js";
import {Home, Bubble, Selection, AStar, Dijkstra, Insertion, Quick} from "./views/Views.js";


const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
        children: [

        ]
    },
    {
        path: '/',
        element: <DefaultLayout />,
        children: [
            {
                path: '/sorting',
                element: <Sorting />,
                children: [
                    {
                        path: '/sorting/bubble',
                        element: <Bubble />
                    },
                    {
                        path: '/sorting/selection',
                        element: <Selection />
                    },
                    {
                        path: '/sorting/insertion',
                        element: <Insertion />
                    },
                    {
                        path: '/sorting/quick',
                        element: <Quick />
                    },
                ]
            },
            {
                path: '/pathfinding',
                element: <PathFinding />,
                children: [
                    {
                        path: '/pathfinding/a-star',
                        element: <AStar />
                    },
                    {
                        path: '/pathfinding/dijkstra',
                        element: <Dijkstra />
                    },
                ]
            },
        ]
    },

]);

export default router;