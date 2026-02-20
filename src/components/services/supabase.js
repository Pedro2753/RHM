import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://zburlbvdnouwzzhkhvfx.supabase.co";
const supabaseKey = "sb_publishable_dUYTJeQB6Q6qSHQk7gxcvQ_VeCn2RD5";

export const supabase = createClient(supabaseUrl, supabaseKey);
