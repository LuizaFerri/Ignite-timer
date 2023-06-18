import { HeaderContainer } from "./styles";
import logo from '../../assets/logo.svg';
import timer from '../../assets/timer.svg';
import history from '../../assets/history.svg';
import { NavLink } from "react-router-dom";

export function Header() {
    return(
        <HeaderContainer>
            <img src={logo} />
            <nav>
                <NavLink to="/"><img src={timer} title="Timer" /></NavLink>
                <NavLink to="/history"><img src={history} title="Histórico" /></NavLink>
            </nav>
        </HeaderContainer>
    )
}