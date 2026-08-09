# RentEasy Uganda project - files to add to your portfolio

Extract this into your portfolio repo ROOT (paths already match your structure).
It will add/overwrite exactly these files:

src/components/mdx/phone-embed.tsx (NEW - the iPhone-frame embed component)
src/components/mdx/index.tsx (MODIFIED - registers PhoneEmbed)
content/projects/renteasy-uganda.mdx (NEW - the project page)
public/media/renteasy/\*.png (NEW - 7 real screenshots from your app)
pnpm-workspace.yaml (MODIFIED - fixes an unrelated pre-existing
issue where allowBuilds had placeholder
text instead of true/false, which was
causing `pnpm install` to fail in CI)

## After extracting:

1. pnpm install
2. pnpm run build (confirm it builds clean on your machine, which has real
   internet access to Google Fonts - my sandbox couldn't
   reach fonts.googleapis.com to verify this last step)
3. pnpm run dev, visit /projects/renteasy-uganda, and check the phone embed
   actually loads your live prototype in the iframe.

## Important - please verify this one thing

I could NOT confirm from my sandbox whether ritzy-maize-10800647.figma.site
allows itself to be embedded in an iframe (my sandbox's own network policy
blocked the test, unrelated to Figma). Please check it in your browser once
you run `pnpm run dev` locally. Two possible outcomes:

- It loads and is interactive -> you're done, ship it.
- It's blocked (blank frame / refuses to connect) -> Figma Make published
  sites may set their own frame-ancestors header. If that happens, tell me
  and I'll swap the embed for a screen-recording/video inside the phone
  frame instead, with the "Open live prototype" button (already built in)
  as the way people reach the real interactive version.
