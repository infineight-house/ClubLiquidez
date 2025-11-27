# ClubLiquidez

## Environment Variables

This project requires the following environment variables to be set:

### Required Variables

- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Your Supabase anonymous/public key

Get these values from: https://app.supabase.com/project/_/settings/api

### Optional Variables

- `CUSTOM_KEY` - Custom configuration key (defaults to 'default-key' if not set)

## Vercel Deployment

### Setting Environment Variables in Vercel

1. Go to your project settings in Vercel: https://vercel.com/[your-project]/settings/environment-variables
2. Add each environment variable from `env.example`
3. Make sure to add them for all environments (Production, Preview, Development)
4. Redeploy your application after adding the variables

### Quick Import

You can copy the variables from `env.example` and paste them into Vercel's environment variables section. Replace the placeholder values with your actual credentials.
