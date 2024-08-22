import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSupabase } from '../providers/SupabaseProvider';

export const Kontakt = () => {
  const { supabase } = useSupabase();
  const [formSubmitted, setFormSubmitted] = useState(false); // State to control form visibility
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Handle form submission
  const handleContact = async (data) => {
    try {
      const { error } = await supabase
        .from('messages')
        .insert([data]);
      
      if (error) {
        console.error('Error sending message:', error);
        return;
      }

      // If successful, update the state to show the confirmation message
      setFormSubmitted(true);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className='flex'>
      <div className='flex-grow'>
        {formSubmitted ? (
          <div className='text-center mt-8'>
            <h1 className='text-2xl font-bold'>Dine spørgsmål er modtaget</h1>
            <p className='mt-4'>Tak for din besked! Vi vender tilbage til dig så hurtigt som muligt.</p>
          </div>
        ) : (
          <form className='max-w-md mx-auto bg-white p-4' onSubmit={handleSubmit(handleContact)}>
            <h1 className='text-4xl'><strong>Kontakt</strong></h1>
            <p className='mt-4 text-xs'>Indtast dine oplysninger og besked, så vender vi tilbage til dig hurtigst muligt.</p>
            <div className=''>
              <label className='text-xs' htmlFor="name"></label>
              <br />
              <input
                className='w-full max-w-[480px] p-2 border-2'
                placeholder='Indtast dit navn'
                type="text"
                id="name"
                {...register("name", { required: true })}
              />
              {errors.name && <div className="text-xs text-red-600">Navn er påkrævet</div>}
            </div>
            <div className=''>
              <label className='text-xs' htmlFor="email"></label>
              <br />
              <input
                className='w-full max-w-[480px] p-2 border-2'
                placeholder='Indtast din email'
                type="email"
                id="email"
                {...register("email", { required: true })}
              />
              {errors.email && <div className="text-xs text-red-600">Email er påkrævet</div>}
            </div>
            <div className=''>
              <label className='text-xs' htmlFor="message"></label>
              <br />
              <textarea
                className='w-full max-w-[480px] p-2 border-2'
                placeholder='Skriv din besked her'
                id="message"
                rows='4'
                {...register("message", { required: true })}
              />
              {errors.message && <div className="text-xs text-red-600">Besked er påkrævet</div>}
            </div>
            <div className='flex justify-end mt-4'>
              <button className='bg-[#5F657B] px-16 py-2 text-white font-light rounded-sm' type="submit">SEND</button>
            </div>
          </form>
        )}
      </div>
      <div className='ml-6 flex-grow'>
        <iframe
          width="520"
          height="400"
          frameBorder="0"
          scrolling="no"
          marginHeight="0"
          marginWidth="0"
          id="gmap_canvas"
          src="https://maps.google.com/maps?width=520&amp;height=400&amp;hl=en&amp;q=%C3%98ster%20Uttrup%20Vej%201%20Aalborg+()&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
        ></iframe>
        <script type='text/javascript' src='https://embedmaps.com/google-maps-authorization/script.js?id=6f651aa661714a2d84e4b9389d75a05672f9ccc2'></script>
      </div>
    </div>
  );
};
