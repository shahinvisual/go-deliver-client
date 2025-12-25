import { useForm } from 'react-hook-form';
import useAuth from '../../../Hooks/useAuth';
import { Link } from 'react-router';
import SocialLogin from '../SocialLogin/SocialLogin';

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { createUser } = useAuth();
    const onSubmit = data => {
        createUser(data.email, data.password)
            .then(res => {
                console.log(res.user);
            }).catch(error => {
                console.log(error.message);
            })
    }
    return (
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <div className="card-body">
                <h1 className="text-5xl font-bold">Register now!</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <fieldset className="fieldset">
                        {/* --------------Email Field------------------ */}
                        <label className="label">Email</label>
                        <input type="email"
                            className="input"
                            placeholder="Email"
                            {...register('email', { required: true })}
                        />
                        {errors.email?.type === "required" && (
                            <p className='text-red-500'>Email is required</p>
                        )}

                        {/* --------------Password Field------------------ */}
                        <label className="label">Password</label>
                        <input type="password"
                            className="input"
                            placeholder="Password"
                            {...register('password', { required: true, minLength: 8 })}
                        />
                        {errors.password?.type === "required" && (
                            <p className='text-red-500'>password is required</p>
                        )}
                        {errors.password?.type === "minLength" && (
                            <p className='text-red-500'>Minimum 8 characters is required</p>
                        )}

                        <div><a className="link link-hover">Forgot password?</a></div>
                        <button className="btn btn-primary text-black mt-4">Register</button>
                        <p><small>Already have an account? <Link className='btn-link text-xs' to={'/login'}>Login</Link></small></p>
                    </fieldset>
                </form>
                <SocialLogin />
            </div>
        </div>
    );
};

export default Register;