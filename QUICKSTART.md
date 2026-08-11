# ⚡ Quick Start Guide

Get your pottery website running in 5 minutes!

## Step 1: Install (1 minute)

```bash
cd pottery-brand
npm install
```

## Step 2: Run Locally (1 minute)

```bash
npm run dev
```

Open: http://localhost:3000

## Step 3: Access Admin (1 minute)

Visit: http://localhost:3000/admin

**Password**: `pottery2024`

## Step 4: Add Your Products (2 minutes)

1. Click "Create New"
2. Fill in the form:
   - Name: "My Beautiful Vase"
   - Price: 45
   - Description: "Handcrafted from clay..."
   - Image URL: (paste image link)
3. Click "Create Product"
4. Done! See it on /products page

## Step 5: Deploy (1 minute)

### Quick Deploy to Vercel

```bash
npm i -g vercel
vercel
```

Or connect your GitHub repo to Vercel and it auto-deploys!

### Other Options
- Netlify: `netlify deploy`
- Cloudflare: `wrangler pages deploy`
- GitHub Pages: Push to GitHub

## That's It! 🎉

Your pottery website is LIVE!

---

## Next: Customize

### Change Admin Password

Edit `/config/admin.ts`:
```typescript
export const ADMIN_PASSWORD = 'your-new-password';
```

### Update Contact Info

Edit `/app/contact/page.tsx`:
```typescript
const contactInfo = {
  phone: '+213 xxx xxx xxx',
  email: 'your@email.com',
  facebook: 'https://facebook.com/yourpage',
  // etc
};
```

### Update Brand Colors

Edit `tailwind.config.ts`:
```typescript
colors: {
  clay: '#YOUR_COLOR',
  terracotta: '#YOUR_COLOR',
}
```

### Add Your Logo

Replace `/public/logo.png` with your logo

---

## Key Files

- `/app/page.tsx` - Home page
- `/app/products/page.tsx` - Products page
- `/app/contact/page.tsx` - Contact page
- `/app/admin/page.tsx` - Admin dashboard
- `/config/admin.ts` - Admin password & settings
- `/lib/products.ts` - Product management
- `/tailwind.config.ts` - Colors & styling

---

## Commands

```bash
# Development
npm run dev

# Production build
npm run build

# Start production server
npm start

# Linting
npm run lint
```

---

## Deployment Checklist

Before going live:

- [ ] Changed admin password
- [ ] Updated contact info
- [ ] Added your products
- [ ] Updated brand logo
- [ ] Tested on mobile
- [ ] Tested admin dashboard
- [ ] Customized colors

---

## Helpful Links

- [Admin Guide](./ADMIN.md)
- [Full README](./README.md)
- [Deployment Guide](./DEPLOYMENT.md)
- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com)

---

## Need Help?

1. Read the README
2. Check Admin Guide
3. Review code comments
4. Check console for errors
5. Try a different browser

---

**You're all set! Start selling pottery! 🏺✨**
