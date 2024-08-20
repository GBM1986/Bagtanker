import { createClient } from "@supabase/supabase-js"
import React, { createContext, useContext, useEffect, useState } from "react"

// Opretter en kontekst til Supabase, som kan bruges til at dele Supabase-klienten på tværs af komponenter
const SupabaseContext = createContext()

// Definerer komponent
export const SupabaseProvider = ({ children }) => {
  // State Variabel Hook
  const [supabase, setSupabase] = useState(null)

  // Henter URL og API-nøgle til Supabase fra .env
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
  const supabaseKey = import.meta.env.VITE_SUPABASE_KEY
  
  // Brug useEffect til at initialisere Supabase-klienten, når komponenten mountes
  useEffect(() => {
    // Opretter Supabase-klienten og gemmer den i state
    setSupabase(createClient(supabaseUrl, supabaseKey))
  }, [supabaseKey]) // Dependency array med supabaseKey, så klienten opdateres kun hvis denne ændres

  // Returnerer en kontekst provider, der giver adgang til Supabase-klienten
  return (
    <SupabaseContext.Provider value={{ supabase }}>
      {children}
    </SupabaseContext.Provider>
  )
}

// Custom hook til at bruge Supabase-konteksten i andre komponenter
export const useSupabase = () => useContext(SupabaseContext)