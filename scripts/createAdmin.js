import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function createAdmin() {
  const { data, error } = await supabase.auth.signUp({
    email: 'admin@finlitai.com',
    password: 'AdminTest123!'
  });
  if (error) {
    console.error('Error creating admin:', error.message);
  } else {
    console.log('Admin account created:', data);
  }
}

createAdmin();
