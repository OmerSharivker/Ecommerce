import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { FaFacebookF, FaGoogle } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom';
import { customer_login, messageClear } from '../store/reducers/authReducer';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { FadeLoader } from 'react-spinners';

const Login = () => {
    const navigate = useNavigate();
    const { loader, errorMessage, successMessage, userInfo } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const [state, setState] = useState({
        email: '',
        password: ''
    });

    const inputHandle = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        });
    };

    const register = (e) => {
        e.preventDefault();
        dispatch(customer_login(state));
    };

    useEffect(() => {
        if (successMessage) {
            toast.success(successMessage);
            dispatch(messageClear());
        }
        if (errorMessage) {
            toast.error(errorMessage);
            dispatch(messageClear());
        }
        if (userInfo) {
            navigate('/');
        }
    }, [successMessage, errorMessage, userInfo, navigate, dispatch]);

    return (
        <div>
            {loader && (
                <div className='w-screen h-screen flex justify-center items-center fixed left-0 top-0 bg-[#38303033] z-[999]'>
                    <FadeLoader />
                </div>
            )}

            <Header />
            <div className='bg-slate-200 mt-4'>
                <div className='w-full justify-center items-center p-4 md:p-10'>
                    <div className='w-full md:w-[90%] lg:w-[60%] mx-auto bg-white rounded-md'>
                     
                            {/* Form Section */}
                            <div className='px-4 md:px-8 py-6 md:py-8 flex flex-col items-center'>
                                <h2 className='text-center text-xl text-slate-600 font-bold mb-6'>Login</h2>

                                <form onSubmit={register} className='text-slate-600 w-full max-w-xs'>
                                    <div className='flex flex-col gap-1 mb-4'>
                                        <label htmlFor="email">Email</label>
                                        <input
                                            onChange={inputHandle}
                                            value={state.email}
                                            className='w-full px-3 py-2 border border-slate-200 outline-none focus:border-green-500 rounded-md'
                                            type="email"
                                            name="email"
                                            id="email"
                                            placeholder='Email'
                                            required
                                        />
                                    </div>
                                    <div className='flex flex-col gap-1 mb-4'>
                                        <label htmlFor="password">Password</label>
                                        <input
                                            onChange={inputHandle}
                                            value={state.password}
                                            className='w-full px-3 py-2 border border-slate-200 outline-none focus:border-green-500 rounded-md'
                                            type="password"
                                            name="password"
                                            id="password"
                                            placeholder='Password'
                                            required
                                        />
                                    </div>

                                    <button className='px-4 py-2 w-full bg-[#059473] shadow-lg hover:shadow-green-500/40 text-white rounded-md mb-4'>
                                        Login
                                    </button>
                                </form>

                                <div className='flex justify-center items-center py-2 w-full max-w-xs'>
                                    <div className='h-[1px] bg-slate-300 w-full'></div>
                                    <span className='px-3 text-slate-600'>Or</span>
                                    <div className='h-[1px] bg-slate-300 w-full'></div>
                                </div>

                                <button className='px-4 py-2 w-full max-w-xs bg-indigo-500 shadow hover:shadow-indigo-500/50 text-white rounded-md flex justify-center items-center gap-2 mb-3'>
                                    <FaFacebookF />
                                    <span>Login With Facebook</span>
                                </button>

                                <button className='px-4 py-2 w-full max-w-xs bg-red-500 shadow hover:shadow-red-500/50 text-white rounded-md flex justify-center items-center gap-2 mb-3'>
                                    <FaGoogle />
                                    <span>Login With Google</span>
                                </button>

                                <div className='text-center text-slate-600 pt-1 mb-4'>
                                    <p>Don't Have An Account? <Link className='text-blue-500' to='/register'>Register</Link></p>
                                </div>

                                <a target='_blank' href="https://shariv-dashboard.netlify.app/login" className='block w-full max-w-xs mb-3'>
                                    <div className='px-4 py-2 w-full bg-[#02e3e0] shadow hover:shadow-red-500/50 text-white rounded-md flex justify-center items-center gap-2'>
                                        Login As a Seller
                                    </div>
                                </a>

                                <a target='_blank' href="https://shariv-dashboard.netlify.app/register" className='block w-full max-w-xs'>
                                    <div className='px-4 py-2 w-full bg-[#ad2cc4] shadow hover:shadow-red-500/50 text-white rounded-md flex justify-center items-center gap-2'>
                                        Register As a Seller
                                    </div>
                                </a>
                            </div>

                            {/* Image Section */}
                          
                       
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Login;
