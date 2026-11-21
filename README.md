# Digital Wedding Invitations — Egypt

Zero-build static site. Run `node server.js` and open http://localhost:5500

## Site architecture
```
index.html          Home: hero, how it works, categories, featured designs, brand teaser, CTA
collection.html     Searchable, filterable catalogue (category / language / text), grouped by category
personalise.html    Live customiser: names, date, venue, guest greeting -> phone preview + shareable link
brand.html          Name shortlist, 6 logo concepts, comparison, identity kit, social kit
pricing.html        Packages (EGP), add-ons, process, FAQ, WhatsApp order form
samples/01..16      The 16 standalone invitation designs
assets/
  data.js           SINGLE SOURCE OF TRUTH: samples, categories, brands, packages, WhatsApp number
  site.css          shared design system
  site.js           shared shell: nav, footer, brand switching, preview modal
  shared.js         engine used inside invitations (sounds, motion, RSVP, QR, countdown)
  logos/            logo concepts (1-4 JPG, 5-6 SVG)
  images/           artwork used by some designs
```

## Things to edit
- WhatsApp number: `SITE.WHATSAPP` in `assets/data.js` and `defaultWhatsapp` in `assets/shared.js`
- Prices/packages and brand names: `assets/data.js`
- Pick a brand on `brand.html` ("Use this identity") — nav, footer and brand kit update everywhere.

## Invitation URL parameters
`?guest=Name` `?couple=Mahmoud+%26+Merna` `?venue=...` `?date=2027-06-19` `?clean=1`
