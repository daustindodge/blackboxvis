import {createBrowserRouter, Navigate} from "react-router-dom";
import {Sorting, PathFinding, DefaultLayout} from "./components/Components.js";
import {Home, Bubble, Selection, AStar, Dijkstra, Insertion, Quick, Merge, Heap} from "./views/Views.js";


const router = createBrowserRouter([
    {
        path: '/',
        element: <Navigate to="/sorting" />,
    },
    {
        path: '/',
        element: <DefaultLayout />,
        children: [
            {
                path: '/sorting',
                element: <Navigate to="/sorting/bubble" />
            },
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
            {
                path: '/sorting/merge',
                element: <Merge />
            },
            {
                path: '/sorting/heap',
                element: <Heap />
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