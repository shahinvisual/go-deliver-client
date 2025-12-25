import { useForm } from 'react-hook-form';
import { Link } from 'react-router';
import SocialLogin from '../SocialLogin/SocialLogin';


const Login = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const onSubmit = data => {
        console.log(data);
    };
    
    return (
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <div className="card-body">
                <h1 className="text-5xl font-bold">Please Login!</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <fieldset className="fieldset">
                        {/* --------------------Email Input Field------------------------ */}
                        <label className="label">Email</label>
                        <input type="email"
                            {...register('email', { required: true })}
                            className="input"
                            placeholder="Email" />
                        {errors.email?.type === "required" && (
                            <p className='text-red-500'>Password is required</p>
                        )}
                        {/* --------------------Password Input Field------------------------ */}
                        <label className="label">Password</label>
                        <input type="password"
                            {...register('password', { required: true, minLength: 8 })}
                            className="input"
                            placeholder="Password" />
                        {errors.password?.type === "required" && (
                            <p className='text-red-500'>Password is required</p>
                        )}
                        {errors.password?.type === "minLength" && (
                            <p className='text-red-500'>Minimum 8 characters is required</p>
                        )}
                        <div><a className="link link-hover">Forgot password?</a></div>
                        <button className="btn btn-primary text-black mt-4">Login</button>

                    </fieldset>
                    <p><small>New to this website? <Link className='btn-link text-xs' to={'/register'}>Register</Link></small></p>
                </form>
                <SocialLogin />
            </div>
        </div>
    );
};

export default Login;