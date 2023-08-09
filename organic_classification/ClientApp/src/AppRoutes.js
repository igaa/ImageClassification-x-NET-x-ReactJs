import { Collect, collect } from "./components/Collect";
import { Counter } from "./components/Counter";
import { FetchData } from "./components/FetchData";
import { Home } from "./components/Home";
import { Upload, upload } from "./components/Upload";

const AppRoutes = [
    {
        index: true,
        element: <Home />
    },
    {
        path: '/counter',
        element: <Counter />
    },
    {
        path: '/fetch-data',
        element: <FetchData />
    }, 
    {
        path: '/upload',
        element: <Upload />
    },{
        path: '/collect',
        element: <Collect />
    }
];

export default AppRoutes;
