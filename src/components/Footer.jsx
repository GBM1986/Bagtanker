import React, { useState } from 'react';
import { useSupabase } from '../providers/SupabaseProvider';

export const Footer = () => {
  const { supabase } = useSupabase();
  const [email, setEmail] = useState('');
  const [statusMessage, setStatusMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate email
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setStatusMessage('Please enter a valid email address.');
      return;
    }

    // Insert email into Supabase
    const { data, error } = await supabase
      .from('newsletter_emails')
      .insert([{ email, created_at: new Date().toISOString() }]);

    if (error) {
      console.error('Error inserting email:', error);
      setStatusMessage('There was an error. Please try again.');
    } else {
      setEmail(''); // Clear the input field
      setStatusMessage('Thank you for subscribing!');
    }
  };

  return (
    <footer className="bg-[#323540] text-white fixed bottom-0 left-0 right-0 py-6">
      <div className="max-w-screen-xl px-6 mx-auto">
        <div className="flex flex-wrap gap-96">
          {/* Contact Information Section */}
          <div className="flex-1">
            <h4 className="text-4xl font-extralight font-irish">Bagtanker</h4>
            <section className="flex flex-col mt-4 space-y-2 text-sm">
              <p>Øster Utterupvej 1</p>
              <p>9000 Aalborg</p>
              <br />
              <a className="hover:opacity-75 cursor-pointer" href="#">Tlf: 12345678</a>
              <a className="hover:opacity-75 cursor-pointer" href="#">Email: info@bagtanker.dk</a>
            </section>
          </div>

          {/* Newsletter Signup Section */}
          <div className="flex-1">
            <section className="flex flex-col mt-4 space-y-4 text-sm">
              <h4 className="text-4xl font-extralight">Tilmeld dig Bagtankers nyhedsbrev</h4>
              <p className="text-lg">Få vores nyheder direkte i din indbakke</p>
              <form className="flex flex-col space-y-4">
                <input
                  className="px-4 py-2 w-64 max-w-md border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 self-end text-black"
                  type="email"
                  placeholder="Indtast din email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button
                  className="px-4 py-2 w-32 max-w-md text-white bg-[#5F657B] hover:bg-blue-600 self-end"
                  type="submit"
                  onClick={handleSubmit}
                >
                  TILMELD
                </button>
              </form>
              {statusMessage && <p className="mt-4 text-center">{statusMessage}</p>}
            </section>
          </div>
        </div>
      </div>
    </footer>
  );
};
