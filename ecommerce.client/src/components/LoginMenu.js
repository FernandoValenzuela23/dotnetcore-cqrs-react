import { Link } from 'react-router-dom';
import {
    NavLink
} from 'reactstrap';

const LoginMenu = (props) => {

    const menuText = props.menuText;
    const menuURL = props.menuURL;

    const loginMenu = (
        menuText && menuURL ? (
            <NavLink tag={Link} className='text-dark' to={menuURL}>{menuText}</NavLink>
        ) : (
            <NavLink tag={Link} className='text-dark' to="/login">Login</NavLink>
        )
    )

    return loginMenu;

}

export default LoginMenu;