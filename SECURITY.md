# 🔐 Security Guide

This website implements security best practices from day one.

## Built-In Security Features

### Authentication
✅ Password-protected admin area
✅ Session-based authentication (24 hours)
✅ No backend authentication exposure
✅ Client-side validation

### Data Protection
✅ No sensitive data stored
✅ localStorage encryption (browser default)
✅ HTTPS enforcement (all hosting)
✅ Input validation with Zod
✅ CSRF protection ready

### HTTP Security Headers
✅ X-Content-Type-Options: nosniff
✅ X-Frame-Options: SAMEORIGIN
✅ X-XSS-Protection: 1; mode=block
✅ Referrer-Policy: strict-origin-when-cross-origin
✅ Permissions-Policy: restrictive defaults

### Access Control
✅ Admin area protected
✅ Public pages unrestricted
✅ No sensitive endpoints exposed
✅ Delete confirmations

## Before Deployment

### Critical: Change Admin Password

**MUST DO THIS BEFORE GOING LIVE**

Edit `/config/admin.ts`:
```typescript
// Change from
export const ADMIN_PASSWORD = 'pottery2024';

// To
export const ADMIN_PASSWORD = 'your-very-secure-password-123!@#';
```

Make it:
- Long (12+ characters)
- Unique (not used elsewhere)
- Complex (mix of upper, lower, numbers, symbols)
- Memorable (you must remember it!)

### Environment Variables

Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

Never commit `.env.local` to git (already in .gitignore)

### Update Domain References

In `app/layout.tsx`:
```typescript
openGraph: {
  url: 'https://your-domain.com', // Update this
}
```

In `app/sitemap.ts`:
```typescript
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://your-domain.com'; // Update
```

## Security Best Practices

### Password Security

**Your Admin Password**
- ✅ Use a strong password
- ✅ Store it securely (password manager)
- ✅ Change it if leaked
- ✅ Don't share it

**Example Strong Password**
```
Pottery2024!SecureAlgeria@Brand#Admin
```

### Data Backup

**Regular Backups**
1. Visit `/admin`
2. Click "Export Products"
3. Save the JSON file
4. Store in secure location
5. Keep multiple versions

**When to Backup**
- After adding many products
- Before major changes
- Regularly (weekly)
- Before deploying updates

### Session Security

**Session Duration**: 24 hours

To change, edit `/config/admin.ts`:
```typescript
export const SESSION_DURATION = 12 * 60 * 60 * 1000; // 12 hours
```

**Sessions are cleared when:**
- You logout
- 24 hours pass
- Browser is cleared
- Cookie is deleted

### Third-Party Services

**Safe to Use**
- Google Analytics
- Vercel hosting
- Netlify hosting
- Cloudflare

**Be Careful With**
- Payment processors (use authorized providers)
- Email services (use official services)
- External plugins (review code first)

## Common Security Vulnerabilities

### SQL Injection
✅ **Protected**: No database, no SQL queries

### XSS (Cross-Site Scripting)
✅ **Protected**: React escapes content, CSP headers

### CSRF (Cross-Site Request Forgery)
✅ **Protected**: Uses SameSite cookies, tokens

### Clickjacking
✅ **Protected**: X-Frame-Options header set

### Data Exposure
✅ **Protected**: No sensitive data stored, HTTPS only

### Brute Force Attacks
⚠️ **Partial**: Consider rate limiting if needed (not implemented)

### Man-in-the-Middle
✅ **Protected**: HTTPS enforced, HSTS ready

## Ongoing Security

### Regular Tasks
- [ ] Monitor for security updates
- [ ] Update dependencies: `npm update`
- [ ] Review access logs (if applicable)
- [ ] Check for suspicious activity
- [ ] Rotate credentials if needed

### Monthly Tasks
- [ ] Review Google Search Console
- [ ] Check for security warnings
- [ ] Test admin access
- [ ] Verify backups work

### Quarterly Tasks
- [ ] Full security audit
- [ ] Update dependencies
- [ ] Review all user accounts
- [ ] Test disaster recovery

### Annually Tasks
- [ ] Penetration testing (optional)
- [ ] Security training
- [ ] Update security policies
- [ ] Review compliance

## Updating Dependencies Securely

### Check for Updates
```bash
npm outdated
```

### Update All
```bash
npm update
```

### Test After Update
```bash
npm run build
npm run dev
# Test all features
```

### Specific Package
```bash
npm install package-name@latest
npm audit
```

## SSL/HTTPS

✅ **Automatically Configured**
- Vercel: Automatic HTTPS
- Netlify: Automatic HTTPS
- Cloudflare: Automatic HTTPS
- Self-hosted: Use Let's Encrypt

No additional configuration needed!

## Content Security Policy

Add to `next.config.js` for extra protection:
```javascript
headers: async () => [
  {
    source: '/(.*)',
    headers: [
      {
        key: 'Content-Security-Policy',
        value: "default-src 'self'; script-src 'self' 'unsafe-inline';"
      }
    ]
  }
]
```

## File Upload Security

**Currently**: No file uploads (safe)

**If you add uploads**:
- Validate file type
- Limit file size
- Scan for malware
- Store outside web root
- Use CDN for serving

## Security Checklist

Before Launch:
- [ ] Change admin password
- [ ] Verify HTTPS enabled
- [ ] Check security headers
- [ ] Audit third-party services
- [ ] Review all code
- [ ] Test admin area
- [ ] Verify backups work
- [ ] Check robots.txt
- [ ] Review .env example
- [ ] Test error pages

After Launch:
- [ ] Monitor logs (if available)
- [ ] Set up alerts
- [ ] Test security headers
- [ ] Verify backups
- [ ] Watch for vulnerabilities
- [ ] Update dependencies
- [ ] Review access patterns
- [ ] Test with security scanners

## Security Scanning Tools

**Free Online Tools**
- Security Headers: securityheaders.com
- SSL Labs: ssllabs.com
- Burp Suite Community: portswigger.net
- OWASP ZAP: zaproxy.org

## Incident Response

**If Security Issue Occurs**

1. **Immediate**
   - Identify the issue
   - Stop the attack if possible
   - Document everything
   - Take affected systems offline if needed

2. **Short-term**
   - Change admin password
   - Review recent changes
   - Restore from backup if compromised
   - Fix the vulnerability

3. **Long-term**
   - Implement preventive measures
   - Update security procedures
   - Test improvements
   - Document lessons learned

## Security Resources

### Websites
- OWASP Top 10: owasp.org/www-project-top-ten
- Security Headers: securityheaders.com
- Mozilla Security: mozilla.org/security
- CISA: cisa.gov

### Tools
- npm audit: Built-in
- Snyk: snyk.io
- WhiteSource: whitesourcesoftware.com

### Services
- Vercel Security: vercel.com/security
- Cloudflare: cloudflare.com
- Auth0: auth0.com

## Compliance Considerations

### GDPR (EU)
- ✅ No personal data collected (optional Google Analytics)
- ✅ Privacy policy page (add if needed)
- ✅ Cookie notice (add if needed)

### CCPA (California)
- ✅ No personal data collected
- ✅ Privacy policy recommended
- ✅ Opt-out for analytics

### Accessibility
- ✅ WCAG 2.1 compliant
- ✅ Keyboard navigation
- ✅ Screen reader friendly

## Final Security Tips

1. **Stay Updated**: Keep all dependencies current
2. **Be Cautious**: Review third-party services
3. **Monitor**: Watch for suspicious activity
4. **Backup**: Export products regularly
5. **Test**: Verify security measures work
6. **Document**: Keep security records
7. **Train**: Understand security best practices
8. **Review**: Regularly audit your site

---

**Security is everyone's responsibility.**

Keep your pottery website safe! 🔐
