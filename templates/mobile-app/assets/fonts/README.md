# Fonts Directory

Place your custom fonts here. The template expects:

- `SpaceMono-Regular.ttf`

You can download SpaceMono from Google Fonts or use your own fonts.

After adding fonts, update `app/_layout.tsx` to load them:

```typescript
const [loaded] = useFonts({
  SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  YourCustomFont: require('../assets/fonts/YourFont.ttf'),
});
```
