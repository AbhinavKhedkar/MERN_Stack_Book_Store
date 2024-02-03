import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom"
import { Link  } from "react-router-dom"
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import { useSnackbar } from 'notistack';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const Login = () => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const handleLogin = () => {
          const data = {
            userName,
            password,
          };
          setLoading(true);
          axios
            .post('http://localhost:5555/Login', data)
            .then(() => {
              setLoading(false);
              enqueueSnackbar('Login Successfully', { variant: 'success' });
              navigate('/');
            })
            .catch((error) => {
              setLoading(false);
              enqueueSnackbar('Error', { variant: 'error' });
              console.log(error);
            });
    };

    return (
        <div className='p-4 mt-28 relative'>
            <div className='shadow-md w-full sticky top-0 relative z-20'>
                <Header />
            </div>
            <div className='relative z-10'>
                <Navbar />
            </div>
            <BackButton />
            <h1 className='text-3xl my-4'>LOGIN</h1>
            {loading ? <Spinner /> : ''}
            <div className='flex flex-col bg-gray-100 border-2 border-indigo-400 rounded-xl p-4 mx-auto max-w-md'>
                <div className='my-4'>
                    <label className='text-lg mr-4 text-gray-700'>USER NAME</label>
                    <input
                        type='text'
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        className='border-2 border-gray-500 px-4 py-2 w-full focus:outline-none focus:border-blue-500'
                    />
                </div>
                <div className='my-4'>
                    <label className='text-lg mr-4 text-gray-700'>PASSWORD</label>
                    <input
                        type='text'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className='border-2 border-gray-500 px-4 py-2 w-full focus:outline-none focus:border-blue-500'
                    />
                </div>
                <button
                    className='p-2 bg-indigo-600 text-white rounded hover:bg-blue-600 focus:outline-none'
                    onClick={handleLogin}
                >
                    LOGIN
                </button>
            </div>
            <Footer />
        </div>
    );
};

export default Login;
