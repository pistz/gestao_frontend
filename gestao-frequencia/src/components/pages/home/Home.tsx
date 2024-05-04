import { Outlet } from "react-router-dom"
import { MainLayout } from "../../shared/mainLayout/MainLayout"
import { filteredRoutes } from "../../../routes/Routes"
import { useAuth } from "../../../hooks/useAuth"

export const Home:React.FC = () =>{
    const {userRole} = useAuth();
    const list = filteredRoutes(userRole);
    
    return(
<>      
    <MainLayout listItems={list}>
        <Outlet />
    </MainLayout>
</>
    )
}