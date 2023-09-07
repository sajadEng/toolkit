import { Link, useNavigate } from 'react-router-dom'
import HomeLogo from "../../components/wallpainter/homepage components/HomeLogo"
import Recommended from "../../components/wallpainter/homepage components/Recommended"
function Homepage({ isLogedIn, categories, dispatch }) {

    const navigate = useNavigate();

    return (
        <div className="homepage">
            <div className="homepage-login">
                <Link to='/login'>{!isLogedIn ? "Login" :  '' }</Link>
            </div>
            <HomeLogo />
            <Recommended categories={categories} dispatch={dispatch} />
        </div>
    )
}

export default Homepage
