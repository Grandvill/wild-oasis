import { createClient } from '@supabase/supabase-js';

export const supabaseUrl = 'https://ndrewwfmvfowbsqmekkg.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5kcmV3d2ZtdmZvd2JzcW1la2tnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQzODgyNjIsImV4cCI6MjA1OTk2NDI2Mn0.nWWGub5TV7yx-zhZRSG7QQ6kRdrfI_HY6ZaVRbT5Sek';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;

// install supabase
// npm install --save @supabase/supabase-js
