import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  throw new Error('Both supabaseUrl and serviceRoleKey are required.');
}

const supabase = createClient(supabaseUrl, serviceRoleKey);

async function confirmAdminEmail() {
  // Get the user by email
  const { data: users, error: fetchError } = await supabase.auth.admin.listUsers({
    email: 'admin@finlitai.com'
  });
  if (fetchError) {
    console.error('Error fetching user:', fetchError.message);
    return;
  }
  const user = users?.users?.[0];
  if (!user) {
    console.error('Admin user not found.');
    return;
  }
  // Confirm the email by updating email_confirmed_at
  const { data, error } = await supabase.auth.admin.updateUserById(user.id, {
    email_confirm: true
  });
  if (error) {
    console.error('Error confirming email:', error.message);
  } else {
    console.log('Admin email confirmed:', data);
  }
}

confirmAdminEmail();
