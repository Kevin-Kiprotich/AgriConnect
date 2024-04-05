import { BrowserRouter, Routes, Route } from "react-router-dom";
import Infrastructe from "./components/Infrastructure";
import DataUploadPage from "./components/data_upload";

export default function Pages(){
    return (
        <BrowserRouter>
            <Routes>
                <Route>
                    <Route index element={<Infrastructe/>}/>
                    <Route path='data_upload' element={<DataUploadPage/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}