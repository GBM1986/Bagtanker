import React from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../providers/AuthProvider';
import { createClient } from '@supabase/supabase-js';
import { useSupabase } from '../providers/SupabaseProvider';
import { MinSide } from '../components/MinSide';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export const Login = () => {
  const { supabase } = useSupabase();
  const { loginData, setLoginData } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleLogin = async ({ username, password }) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: username,
      password,
    });
    if (error) {
      console.error("Error logging in:", error);
    } else {
      console.log("Logged in:", data);
      sessionStorage.setItem("supabase.auth.token", JSON.stringify(data));
      setLoginData(data);
    }
  };

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      setLoginData(null); // Set loginData to null upon logout
      sessionStorage.removeItem("supabase.auth.token");
      if (error) throw error;
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  };

  return (
    <div>
      {/* Render login form only if loginData is not present */}
      {!loginData || !loginData.user ? (
        <form className='max-w-md mx-auto bg-white' onSubmit={handleSubmit(handleLogin)}>
          <h1 className='text-4xl'><strong>Login</strong></h1>
          <p className='mt-4'>Indtast og send username og password for at logge ind.</p>
          <div>
            <label className='text-xs' htmlFor="username"></label>
            <br />
            <input
              className='w-full max-w-[480px] p-2 border-2'
              placeholder='Indtast dit brugernavn'
              type="text"
              id="username"
              {...register("username", { required: true })}
            />
          </div>
          {errors.username && <div className="error text-xs text-red-600">Username is required</div>}
          <div>
            <label className='text-xs' htmlFor="password"></label>
            <br />
            <input
              className='w-full max-w-[480px] p-2 border-2 shadow-custom-inset'
              placeholder='Indtast dit password'
              type="password"
              id="password"
              {...register("password", { required: true })}
            />
          </div>
          {errors.password && <div className="error text-xs text-red-600">Password is required</div>}
          <div className='flex justify-end'>
            <button className='bg-[#5F657B] px-16 py-2 text-white font-light rounded-sm mt-4' type="submit">LOGIN</button>
          </div>
        </form>
      ) : (
        <div>
          <MinSide />
          <p className='mt-4'>Du er logget ind som {`${loginData.user.email}`}</p>
          <button className='bg-[#5F657B] px-16 py-2 text-white font-light rounded-sm mt-2' onClick={handleLogout}>Log ud</button>
        </div>
      )}
    </div>
  );
};
