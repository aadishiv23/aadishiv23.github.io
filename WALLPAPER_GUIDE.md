# How to Add Custom Wallpapers to AadiOS

## Quick Start

### 1. Add Your Wallpaper Images

Place your wallpaper images in the `public/images/` folder:

```
public/
  images/
    my-light-wallpaper.jpg    ← Light mode wallpaper
    my-dark-wallpaper.jpg     ← Dark mode wallpaper
```

**Recommended specs:**
- Format: JPG or PNG
- Resolution: 2560x1440 or higher (for Retina displays)
- File size: < 500KB (optimize for web)
- Aspect ratio: 16:9 or 16:10

### 2. Update the Background Code

Open `src/components/MacDesktop.jsx` and find the Background section (around line 898):

```jsx
<div
  onMouseDown={dismissFloatingChrome}
  onDoubleClick={toggleTheme}
  className={`absolute inset-0 transition-colors duration-500 -z-20 ${
    isDarkMode
      ? 'bg-[url("/images/my-dark-wallpaper.jpg")] bg-cover bg-center'
      : 'bg-[url("/images/my-light-wallpaper.jpg")] bg-cover bg-center'
  }`}
/>
```

### 3. Alternative: Use Same Wallpaper for Both Modes

```jsx
className={`absolute inset-0 transition-colors duration-500 -z-20 bg-[url("/images/my-wallpaper.jpg")] bg-cover bg-center`}
```

## macOS Wallpaper Sources

### Official Apple Wallpapers
- **macOS Sequoia**: [Download from Apple](https://www.apple.com/macos/)
- **macOS Sonoma**: Available in macOS settings
- **macOS Ventura**: Available in macOS settings

### Community Resources
- **dynamicwallpaper.club**: High-quality dynamic wallpapers
- **wallhaven.cc**: Curated wallpaper collection
- **unsplash.com**: Free high-resolution photos

### Extracting from macOS
If you're on a Mac:
```bash
# Wallpapers are located at:
/System/Library/Desktop Pictures/
```

## Image Optimization

Use these tools to optimize your wallpapers:

### Online Tools
- **TinyPNG**: https://tinypng.com/
- **Squoosh**: https://squoosh.app/

### Command Line (macOS/Linux)
```bash
# Install ImageMagick
brew install imagemagick

# Resize and optimize
convert input.jpg -resize 2560x1440^ -quality 85 output.jpg
```

## Advanced: Dynamic Wallpaper Based on Time

You can add time-based wallpaper switching:

```jsx
const [timeOfDay, setTimeOfDay] = useState('day');

useEffect(() => {
  const updateTimeOfDay = () => {
    const hour = new Date().getHours();
    if (hour >= 6 && hour < 12) setTimeOfDay('morning');
    else if (hour >= 12 && hour < 18) setTimeOfDay('afternoon');
    else if (hour >= 18 && hour < 21) setTimeOfDay('evening');
    else setTimeOfDay('night');
  };

  updateTimeOfDay();
  const interval = setInterval(updateTimeOfDay, 60000);
  return () => clearInterval(interval);
}, []);

// Then in your background:
const wallpapers = {
  morning: '/images/wallpaper-morning.jpg',
  afternoon: '/images/wallpaper-afternoon.jpg',
  evening: '/images/wallpaper-evening.jpg',
  night: '/images/wallpaper-night.jpg',
};

<div className={`bg-[url("${wallpapers[timeOfDay]}")] bg-cover bg-center`} />
```

## Blur Effects

To add blur to your wallpaper:

```jsx
<div
  className="absolute inset-0 bg-[url('/images/wallpaper.jpg')] bg-cover bg-center"
  style={{ filter: 'blur(2px)' }}
/>
```

## Tips

1. **Keep it subtle**: Avoid busy wallpapers that distract from content
2. **Optimize file size**: Large images slow down page load
3. **Test both modes**: Make sure wallpaper works in light and dark mode
4. **Consider contrast**: Ensure text on hero section is readable
5. **Use gradients**: Overlay a gradient for better text readability

## Example Configurations

### Minimal Gradient
```jsx
className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-black"
```

### Photo with Overlay
```jsx
<div className="absolute inset-0 bg-[url('/images/wallpaper.jpg')] bg-cover bg-center" />
<div className="absolute inset-0 bg-black/10 dark:bg-black/40" />
```

### Animated Gradient
```jsx
<div className="absolute inset-0 bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 animate-gradient-x" />
```

## Troubleshooting

### Wallpaper Not Showing
1. Check file path is correct
2. Ensure image is in `public/images/`
3. Clear browser cache (Cmd+Shift+R)
4. Check browser console for errors

### Image Too Large
1. Resize to max 2560x1440
2. Compress with TinyPNG
3. Convert to JPG (smaller than PNG)

### Text Not Readable
1. Add overlay: `<div className="absolute inset-0 bg-black/20" />`
2. Adjust hero text color
3. Use darker wallpaper
4. Add text shadow to hero

---

Need help? Check the code comments in `MacDesktop.jsx` around line 892!
