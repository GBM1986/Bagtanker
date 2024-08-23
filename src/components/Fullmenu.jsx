import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSupabase } from '../providers/SupabaseProvider';
import { BiCategory } from 'react-icons/bi';

export const FullMenu = () => {
  const [data, setData] = useState([]);
  const {supabase} = useSupabase();

  const getData = async () => {
    if (!supabase) return;

    const { data, error } = await supabase.from("categories")
    .select("id,title")

    if (error) {
      console.error("Error fetching data:", error);
    } else {
      setData(data);
    }

   


  }

  useEffect(()=>{
    getData();
  },[supabase])
  return (
    <div className="w-full bg-[#323540E5] xl:flex space-x-24 text-lg pt-10 pb-10 pl-10 text-[#F5F5F0] font-sans font-light">
      {data && data.map(category => {
        return (
          <Link key={category.id} className="cursor-pointer" to={`/produkter/${category.id}`}>{category.title}</Link>
          )
        })
      }
    </div>
  );
};


