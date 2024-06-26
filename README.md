# **Spicetify Lucid Theme**

**A minimal and dynamic Bloom-inspired theme for Spicetify.**

## **Features:**

- **Auto updates (planned):** Bug fixes are addressed promptly to keep your theme experience smooth.
- **Dynamic background that adapts to album art:** Enjoy a visually engaging experience with a background that changes based on your current song album art.
- **Multiple color schemes:** Choose from a variety of color schemes to match your style (dark, light, dark-green, coffee, comfy, dark-fluent, greenland, biscuit, macos).
- **Easy installation via scripts or Spicetify Marketplace:** Choose the installation method that best suits you.

## Join the Community!

- **Discord:** [https://discord.gg/knXP88Zbph](https://discord.gg/knXP88Zbph)
- **GitHub Issues:** [https://github.com/sanoojes/Spicetify-Lucid/issues](https://github.com/sanoojes/Spicetify-Lucid/issues)

## **Installation**

### **Manual installation using Scripts (recomended):**

#### **Windows (Powershell)**

```powershell
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
iex "& { $(iwr -useb 'https://sanooj.is-a.dev/Spicetify-Lucid/install/Lucid.ps1') }"
```

#### **Linux/macOS (Bash)**

```sh
curl -fsSL https://raw.githubusercontent.com/sanoojes/Spicetify-Lucid/main/install/install.sh | sh
```

### **Using Spicetify Marketplace (simpler installation):**

1. Install the `spicetify-marketplace` extension following its instructions: [https://github.com/spicetify/spicetify-themes](https://github.com/spicetify/spicetify-themes).
2. Search for "Lucid" in the Spicetify Marketplace and click "Install."

### **Advanced Manual Installation:**:

1. **Download the repository:** Visit the Lucid GitHub repository: [https://github.com/sanoojes/Spicetify-Lucid](https://github.com/sanoojes/Spicetify-Lucid) and download the code as a ZIP archive.
2. **Locate Spicetify's Themes directory:** Use the command `spicetify path userdata` in your terminal/command prompt to find the path.
3. **Create the theme folder:** Inside the Themes directory, create a new folder named `Lucid`.
4. **Extract theme files:** Extract the downloaded ZIP archive and move all files from the `src` subfolder to the `Lucid` folder you created.
5. **Apply the theme:** Open your terminal/command prompt and run these commands (replace `<color_scheme>` with your desired scheme):

   ```bash
   spicetify config current_theme Lucid
   spicetify config color_scheme <color_scheme>  # Example: dark, light, etc.
   spicetify config inject_css 1 replace_colors 1 overwrite_assets 1 inject_theme_js 1
   spicetify apply
   ```

## **Customization**

### **Color scheme:**

- The default scheme is `dark`. You can change it using the command:

  ```bash
  spicetify config color_scheme <color_scheme>
  spicetify apply
  ```

Available schemes: `dark`, `light`, `darkgreen`, `coffee`, `comfy`, `violet`, `dark-fluent`, `dark-bloom`,`midnight-catppuccin`,`greenland`,`biscuit`,`macos`.

- If you installed via Marketplace, the color scheme can be changed directly in the theme options.

### **Accent color:**

1. Navigate to the Spicetify Themes directory using `spicetify path userdata` in your terminal.
2. Open the `Lucid` folder.
3. Edit the `color.ini` file for your current color scheme (e.g., `color.dark.ini`).
4. Make your desired changes to the accent color values.
5. Run `spicetify apply` to apply the changes.

- If you installed via Marketplace, you can use the built-in Color.ini Editor for accent color adjustments.

## **Screenshots**

### **Dark (default) with Control Nav**

![Base Dark with Control Nav](./assets/images/lucid-control-nav.png)
![Base Dark with Control Nav 1](./assets/images/lucid-control-nav-1.png)

### **Dark (default)**

![Base Dark Preview](./assets/images/base.png)
![Dark Preview 0](./assets/images/lucid-dark.png)
![Dark Preview 1](./assets/images/lucid-dark-1.png)
![Dark 1 Preview 2](./assets/images/lucid-dark-1.png)
![Dark 2 Preview 3](./assets/images/lucid-dark-artist.png)
![Dark 2 Preview 3](./assets/images/lucid-dark-playlist.png)
![Dark 2 Preview 3](./assets/images/lucid-dark-playlist-1.png)

### Lucid Settings

![Settings Preview](./assets/images/settings.webp)

## License

[MIT License](LICENSE)
