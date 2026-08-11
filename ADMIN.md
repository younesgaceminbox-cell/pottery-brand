# 🔐 Admin Dashboard Guide

## Access

**URL**: `http://localhost:3000/admin`

**Default Password**: `pottery2024`

⚠️ **Change this before deployment!** Edit `/config/admin.ts`

## Dashboard Features

### 📋 Products Management

View all your products in an organized table with:
- Product image
- Name (with slug)
- Price
- Category
- Availability status
- Quick action buttons

**Features**:
- 🔍 Search by name or description
- 📊 Sort by: Newest, Name, Price
- 🏷️ Filter by price range
- 📊 View statistics (total products, available, total value)

### ➕ Create New Product

Fields:
- **Product Name**: Required (auto-generates slug)
- **Price**: Required (number, can use decimals)
- **Description**: Required (min 10 chars, max 1000)
- **Category**: Optional (e.g., Vases, Bowls)
- **Images**: Required (at least 1, up to 10)
- **Featured**: Toggle to showcase on home page
- **Available**: Toggle to mark as in stock

**Image Management**:
- Paste image URL and click Add
- See preview before saving
- First image becomes primary
- Remove images with delete button
- Reorder by placement

### ✏️ Edit Product

Click the edit icon on any product to:
- Update all fields
- Add/remove images
- Change featured/availability status
- Keep creation date but update modification date

### 🗑️ Delete Product

Click delete and confirm to permanently remove a product.

### 🔄 Duplicate Product

Click duplicate to create a copy of any product:
- All fields copied
- Name gets "(Copy)" suffix
- Gets new ID and timestamp
- Useful for similar products

### 👁️ Preview Product

Click the eye icon to open the product on the public site (in new tab).

## Data Management

### 📥 Import Products

Click "Import Products" and select a JSON file.

**Format**:
```json
[
  {
    "id": "prod-001",
    "slug": "vase-name",
    "name": "Beautiful Vase",
    "price": 45,
    "description": "A handcrafted...",
    "images": ["url1", "url2"],
    "featured": true,
    "available": true,
    "category": "Vases",
    "createdAt": "2024-01-01T00:00:00Z",
    "updatedAt": "2024-01-01T00:00:00Z"
  }
]
```

**Steps**:
1. Click "Import Products"
2. Select your JSON file
3. Confirm to replace current products
4. Page reloads with new products

### 📤 Export Products

Click "Export Products" to download a JSON file.

**File naming**: `products-YYYY-MM-DD.json`

Use this to:
- Create backups
- Share with team
- Migrate to another site
- Version control your data

## Workflow Examples

### Add a New Pottery Item

1. Click "Create New"
2. Enter name: "Classic Terracotta Vase"
3. Set price: 45
4. Write description (minimum 10 chars)
5. Paste image URL and click Add
6. Toggle Featured if it's special
7. Verify Available is checked
8. Click "Create Product"
9. See it on Products page instantly

### Update Prices for Sale

1. Search for products
2. Click edit icon
3. Change price
4. Click "Update Product"
5. Live updates immediately

### Backup Before Big Changes

1. Click "Export Products"
2. Save the JSON file somewhere safe
3. Make your changes
4. If something goes wrong, reimport!

## Statistics Dashboard

After searching, see:
- 🔢 **Total Products**: All items in your collection
- 🟢 **Available**: In-stock items
- 💰 **Total Value**: Sum of all product prices

## Admin Features Not Yet Shown

### Future Capabilities (Optional Additions)

- Email alerts on purchases
- Customer reviews
- Inventory tracking
- Discount codes
- Analytics dashboard
- Bulk price updates
- Category management
- Variant options (colors, sizes)

## Settings

### Change Admin Password

Edit `/config/admin.ts`:

```typescript
export const ADMIN_PASSWORD = 'your-secure-password-here';
```

Then restart the server.

### Session Duration

Default: 24 hours

Change in `/config/admin.ts`:

```typescript
export const SESSION_DURATION = 24 * 60 * 60 * 1000; // milliseconds
```

## Tips & Tricks

### 💡 Pro Tips

1. **Always backup** before bulk imports
2. **Use categories** to organize products
3. **Feature best sellers** on home page
4. **Use descriptive names** for easy searching
5. **Add multiple images** for better presentation
6. **Update prices** in bulk by exporting → editing JSON → importing
7. **Keep slug format** consistent (lowercase, hyphens)

### 🚀 Quick Actions

- **Search**: Ctrl+F in product list
- **Sort**: Click column header
- **Filter**: Adjust price slider
- **New product**: Alt+N (if enabled)
- **Logout**: Click logout button top-right

## Troubleshooting

### Can't Log In
- Check password in `/config/admin.ts`
- Clear browser cache
- Verify URL is exactly: `/admin`
- Try incognito mode

### Products Don't Save
- Check browser console for errors
- Verify all required fields filled
- Check image URLs are valid
- Ensure localStorage is enabled

### Import Fails
- Verify JSON format is correct
- Check it's a valid array
- Ensure fields match expected structure
- Try re-exporting, then importing

### Session Expires
- You're logged out after 24 hours
- Re-enter password to continue
- Or increase SESSION_DURATION in config

## Security

### What's Protected
✅ Password-protected access
✅ Session-based authentication
✅ Delete confirmations
✅ Local storage only

### What's Not Secure (Important!)
⚠️ Password is client-side only
⚠️ Anyone with access can edit products
⚠️ No backend verification
⚠️ Data stored in browser localStorage

**Note**: This is suitable for small teams or single-user. For high-security needs, implement proper backend authentication.

## Data Storage

### How It Works

1. Products stored in **localStorage**
2. No backend database
3. Works completely offline
4. Syncs across tabs

### Backups

LocalStorage persists when:
- ✅ You stay on site
- ✅ Browser storage is enabled
- ✅ You don't clear browser data

**Best Practice**: Export regularly!

```bash
# Automated backup script (optional)
# Run weekly to save products.json
```

## Contact Admin

Need help?
1. Check this guide
2. Review code comments
3. Check browser console for errors
4. Test in different browser

## Keyboard Shortcuts

*Future Enhancement - Coming Soon*

- `Ctrl+N` - New product
- `Ctrl+K` - Search
- `Ctrl+S` - Save
- `Ctrl+E` - Export
- `Esc` - Close/Cancel

## Next Steps

After mastering the dashboard:

1. ✅ Add all your products
2. ✅ Feature your bestsellers
3. ✅ Export and backup
4. ✅ Deploy to production
5. ✅ Monitor updates
6. ✅ Regular backups

---

**Your admin dashboard is powerful, simple, and secure. Use it well! 🎯**
