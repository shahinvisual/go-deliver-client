import { Outlet } from 'react-router';
import authImg from '../assets/authImage.png'
import GoDeliverLogo from '../Pages/Shared/GoDeliverLogo/GoDeliverLogo';

const AuthLayouts = () => {
    return (
        <div className="p-10 bg-base-200">
            <div><GoDeliverLogo /></div>
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className='flex-1'>
                    <img
                        src={authImg}
                    />
                </div>
                <div className='flex-1'>
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default AuthLayouts;