Vercel Deployment Checklist

This checklist prepares the project for deployment to Vercel and ensures runtime APIs function correctly.

1) Repository & branch
   - Use the branch 'agents/app-launch-instructions' (already pushed).

2) Environment variables (Vercel Project Settings -> Environment Variables)
   - MONGODB_URI          = mongodb+srv://<user>:<pass>@cluster0.mongodb.net/geeky?retryWrites=true&w=majority
   - NEXT_PUBLIC_API_URL  = (optional) https://api.geekyedu.in  # set only if you want the browser to call remote API directly
   - SEED_DEMO_USER       = true (optional)  # when running the seed script in production

   Notes:
   - For a self-contained deploy that uses this app's API routes, leave NEXT_PUBLIC_API_URL blank/unset.
   - Use Vercel Secrets for DB credentials if preferred.

3) MongoDB Atlas
   - Create an Atlas cluster and user.
   - Add Vercel's outbound IPs to Atlas IP Access List or temporarily allow access from anywhere (0.0.0.0/0) while testing.

4) Seeding the database
   - Locally: copy .env.example -> .env.local and set MONGODB_URI, then run:
       npm run seed
   - On Atlas (run from your machine): set MONGODB_URI env and run the same seed command.

5) Build & test locally
   - Install deps: npm ci
   - Build: npm run build
   - Start: npm run start (ensure MONGODB_URI is set)
   - Test flows: register, login, subject pages, recall flashcards

6) Vercel project setup
   - Create a project and connect GitHub repo.
   - Set Environment Variables above for both Preview and Production.
   - Deploy the branch and open the preview URL.

7) Post-deploy verification
   - Open deployed site. Confirm register/login calls go to /api/auth/* (same-origin) unless NEXT_PUBLIC_API_URL is set.
   - Check browser Network tab for any 4xx/5xx responses.
   - Verify /api/subjects returns seeded subjects (or that remote API returns expected content if using external API)

8) Troubleshooting
   - If API routes return 500: check Vercel logs (Functions) and confirm MONGODB_URI and network access.
   - If client shows "Network connection error": ensure NEXT_PUBLIC_API_URL is set correctly or unset for same-origin, and check CORS if using remote API.

9) Optional improvements
   - Move tokens to httpOnly cookies for better security.
   - Add monitoring/logging for serverless functions.
   - Add CI checks to run build and smoke tests before merging.

If you want, I can:
- Add a PR description summarizing these changes and next steps.
- Run seed against an Atlas URI you provide (I won't store credentials; you can paste it for a one-time test), or provide the exact commands to run.
- Create a minimal vercel.json if you need custom build options.
