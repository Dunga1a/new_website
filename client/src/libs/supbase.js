import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  process.env.SUPABASE_APP || "https://tsddbwptfwiyathksqae.supabase.co";
const supabaseKey =
  process.env.SUPABASE_SERCRET ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRzZGRid3B0ZndpeWF0aGtzcWFlIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODI1NjMxMTksImV4cCI6MTk5ODEzOTExOX0.PCIcwv584LcCuJmCwcWIVuUvbszdptvJnKbbcr5WLiU";
export const supabase = createClient(supabaseUrl, supabaseKey);
