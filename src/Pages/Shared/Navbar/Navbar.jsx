import { Link, NavLink } from 'react-router';
import GoDeliverLogo from '../GoDeliverLogo/GoDeliverLogo';
import useAuth from '../../../Hooks/useAuth';

const Navbar = () => {
    const { user, LogOutUser } = useAuth();
    const NavItems = <>
        <li><NavLink to='/'>Home</NavLink></li>
        <li><NavLink to='/sendParcel'>Send Parcel</NavLink></li>
        {
            user && <>
                <li><NavLink to='/dashboard'>DashBoard</NavLink></li>
            </>
        }
        <li><NavLink to='/coverage'>coverage</NavLink></li>
        <li><NavLink to='/about'>About</NavLink></li>
    </>
    const handleSignOut = () => {
        LogOutUser();
    }
    return (
        <div className="navbar bg-base-100 shadow-sm">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex="-1"
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        {NavItems}
                    </ul>
                </div>
                <div className="btn btn-ghost text-xl"><GoDeliverLogo /></div>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {NavItems}
                </ul>
            </div>
            <div className="navbar-end">
                {user ? (
                    <div className="flex items-center gap-4">

                        {/* PHOTO WITH TOOLTIP ON HOVER */}
                        <div className="tooltip tooltip-bottom" data-tip={user?.displayName || "User"}>
                            <div className="avatar">
                                <div className="w-11 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                    <img
                                        src={user?.photoURL || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
                                        alt="User Profile"
                                    />
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={handleSignOut}
                            className="btn btn-outline btn-error btn-sm"
                        >
                            Logout
                        </button>
                    </div>
                ) : (
                    <Link to="/login" className="btn text-black btn-primary btn-sm md:btn-md">
                        Login
                    </Link>
                )}
            </div>
        </div>
    );
};

export default Navbar;