

import { useNavigate, Link } from "react-router-dom";
import useLogout from "./hooks/useLogout";
import style from './Header.module.css'

const Header = () =>{


    const navigate = useNavigate();
    const logout = useLogout();

    const signOut = async () => {
        await logout();
        navigate('/login');
    }


    return(
        <div className={style.header}>
            <h1 className={style.title}>Slogger</h1>
           <button className={style.logOutButton} onClick={signOut}>Log out</button>

        </div>
    )
}

export default Header