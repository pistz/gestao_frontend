import { Outlet } from "react-router-dom"
import { MainLayout } from "../../shared/mainLayout/MainLayout"
import { routes } from "../../../routes/Routes"

export const Home:React.FC = () =>{
    return(
<>      
    <MainLayout listItems={routes}>
        <Outlet />
    </MainLayout>
</>
    )
}