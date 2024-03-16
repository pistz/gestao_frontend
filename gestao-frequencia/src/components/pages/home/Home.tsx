import { Outlet } from "react-router-dom"
import { SideMenu } from "../../shared/menu/Menu"
import { routes } from "../../../routes/Routes"

export const Home = () =>{
    return(
<>      
        <SideMenu listItems={routes}>
            <Outlet />
        </SideMenu>
</>
    )
}