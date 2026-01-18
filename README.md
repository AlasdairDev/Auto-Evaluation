# Auto Evaluation

A minimal Chrome extension for automated course evaluations.

## Features

- Clean, minimalist interface
- One-click evaluation with customizable ratings
- Support for 5-point scale system
- Lightweight and fast

## Installation

### Step 1: Download

1. Click the green **Code** button above
2. Select **Download ZIP**
3. Extract the ZIP file to a folder on your computer

### Step 2: Load Extension

1. Open Chrome and navigate to `chrome://extensions`
2. Enable **Developer mode** (toggle in top-right corner)
3. Click **Load unpacked**
4. Select the extracted folder
5. Extension is now installed ✓

## Usage

1. Navigate to your course evaluation page
2. Click the extension icon in your browser toolbar
3. Select your desired rating scale (1-5)
4. Click **Run Evaluation**
5. Review and submit the form

## Rating Scale

| Scale | Description | Range |
|-------|-------------|-------|
| 5 | Always manifested | 91–100% |
| 4 | Often manifested | 61–90% |
| 3 | Sometimes manifested | 31–60% |
| 2 | Seldom manifested | 11–30% |
| 1 | Never manifested | 0–10% |

## File Structure

```
auto-evaluation/
├── manifest.json       # Extension configuration
├── popup.html         # User interface
├── popup.js           # UI logic
├── content.js         # Page interaction script
└── README.md          # Documentation
```

## Troubleshooting

**Extension not appearing?**
- Make sure Developer mode is enabled
- Try removing and re-loading the extension

**"Not on evaluation page" error?**
- Ensure you're on the correct evaluation URL
- Refresh the page and try again

**No elements filled?**
- The page structure may have changed
- Check browser console for errors

## Development

Built with vanilla JavaScript. No dependencies required.

### Making Changes

1. Edit the source files
2. Go to `chrome://extensions`
3. Click the refresh icon on the extension card
4. Changes take effect immediately

## License

MIT License - feel free to modify and distribute.

## Contributing

Issues and pull requests are welcome.

---

**v1.0.0** — crafted with care
