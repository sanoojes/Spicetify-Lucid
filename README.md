# **Spicetify Lucid Theme**

**A minimal and dynamic Bloom-inspired theme for Spicetify.**

## **Features:**

- **Auto updates (planned):** Bug fixes are addressed promptly to keep your theme experience smooth.
- **Dynamic background that adapts to album art:** Enjoy a visually engaging experience with a background that changes based on your current song album art.
- **Multiple color schemes:** Choose from a variety of color schemes to match your style (dark, light, dark-green, coffee, comfy, dark-fluent, greenland, biscuit, macos, rosepine, dracula, dracula-pro).
- **Easy installation via scripts or Spicetify Marketplace:** Choose the installation method that best suits you.

## Join the Community

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

## Updating

For those who used scripts and not Marketplace.

### Windows (PowerShell)

```powershell
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
iex "& { $(iwr -useb 'https://raw.githubusercontent.com/sanoojes/spicetify-lucid/main/install/Lucid.ps1') } -Action Update"
```

### Other OS

Use the [Bash installation script](#linuxmacos-bash) or [manually](#advanced-manual-installation) update the files.

## Uninstallation

For those who used scripts and not Marketplace.

### Automated (Windows PowerShell)

```powershell
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
iex "& { $(iwr -useb 'https://raw.githubusercontent.com/sanoojes/spicetify-lucid/main/install/Lucid.ps1') } -Action Uninstall"
```

### Manual Uninstallation

```shell
spicetify config color_scheme ' ' current_theme ' '
spicetify apply
```

**If you uninstall Lucid let us know how to shape our future!**

### **Using Spicetify Marketplace (simpler installation):**

1. Install the `spicetify-marketplace` extension following its instructions: [https://github.com/spicetify/spicetify-themes](https://github.com/spicetify/spicetify-themes).
2. Search for "Lucid" in the Spicetify Marketplace and click "Install."

### **Advanced Manual Installation:**

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

Available schemes: `dark`, `light`, `darkgreen`, `coffee`, `comfy`, `violet`, `dark-fluent`, `dark-bloom`,`midnight-catppuccin`,`greenland`,`biscuit`,`macos`, `rosepine`,`dracula`,`dracula-pro`.

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

## Lucid Settings

This section contains available settings for customizing the Lucid theme. Settings are grouped into sections for easier navigation.

### Background Settings

These settings control the overall appearance of the visualizer's background.

| Setting           | Options                                                     | Default            | Description                                                                                                                                                                                                                                               |
| ----------------- | ----------------------------------------------------------- | ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Background        | - Default Background- Animated Background- Solid Background | Default Background | Selects the type of background to display: - **Default Background:** Displays the default background image. - **Animated Background:** Displays an animated background that responds to audio. - **Solid Background:** Displays a solid color background. |
| Background Grains | - Stary Grains (default)- Normal Grains- No Grains          | Stary Grains       | Chooses the type of grain effect applied to the background: - **Stary Grains:** Displays a subtle, sparkling grain effect. - **Normal Grains:** Displays a standard film grain effect. - **No Grains:** Disables the grain effect.                        |

### Default Background Settings

These settings control the appearance of the default background when no audio is playing and the "Default Background" option is selected in **Background Settings**.

| Setting    | Min | Max | Default | Description                                                                                                                                                              |
| ---------- | --- | --- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Blur       | 0   | 100 | 24      | Amount of blur applied to the background. Higher values mean more blur.                                                                                                  |
| Brightness | 0   | 200 | 65      | Brightness level of the background. 100 is the default brightness, values below make it darker and above make it brighter.                                               |
| Contrast   | 0   | 200 | 80      | Contrast level of the background. 100 is the default contrast, values below make it less contrasted and above make it more contrasted.                                   |
| Saturation | 0   | 200 | 90      | Saturation level of the background. 100 is the default saturation, values below make it less saturated (more greyscale) and above make it more saturated (more vibrant). |

### Animated Background Settings

These settings control the appearance and behavior of the animated background when audio is playing and the "Animated Background" option is selected in **Background Settings**.

| Setting        | Min | Max | Default | Description                                                                                                                                                                       |
| -------------- | --- | --- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Blur           | 32  | 256 | 64      | Amount of blur applied to the animated background. Higher values mean more blur.                                                                                                  |
| Saturation     | 0   | 500 | 150     | Saturation level of the animated background. 100 is the default saturation, values below make it less saturated (more greyscale) and above make it more saturated (more vibrant). |
| Contrast       | 0   | 200 | 115     | Contrast level of the animated background. 100 is the default contrast, values below make it less contrasted and above make it more contrasted.                                   |
| Brightness     | 0   | 200 | 65      | Brightness level of the animated background. 100 is the default brightness, values below make it darker and above make it brighter.                                               |
| Animation Time | 0   | 120 | 45      | Duration in seconds for one animation cycle (0 = no animation, recommended: 30-60).                                                                                               |

### Now Playing Bar Settings

These settings control the appearance of the "Now Playing" bar.

| Setting                  | Min | Max | Default | Description                                                                                                                                                       |
| ------------------------ | --- | --- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Opacity                  | 0   | 100 | 100     | Overall opacity of the bar. 0 is completely transparent, 100 is fully opaque.                                                                                     |
| Background Color Opacity | 0   | 100 | 50      | Opacity specifically for the bar's background color. 0 is completely transparent, 100 is fully opaque.                                                            |
| Height                   | 0   | 500 | 80      | Height of the bar.                                                                                                                                                |
| Padding in X axis        | 0   | 50  | 4       | Horizontal padding within the bar. Higher values mean more space between the content and the edges of the bar.                                                    |
| Margin Bottom            | 0   | 50  | 8       | Spacing between the bottom of the bar and content below it. Higher values mean more space.                                                                        |
| Border Radius            | 0   | 100 | 8       | Rounding of the bar's corners. Higher values mean more rounded corners.                                                                                           |
| Blur                     | 0   | 100 | 32      | Blur applied to the bar. Higher values mean more blur.                                                                                                            |
| Saturation               | 0   | 200 | 100     | Saturation level of the bar. 100 is the default saturation, values below make it less saturated (more greyscale) and above make it more saturated (more vibrant). |
| Contrast                 | 0   | 200 | 100     | Contrast level of the bar. 100 is the default contrast, values below make it less contrasted and above make it more contrasted.                                   |
| Brightness               | 0   | 200 | 100     | Brightness level of the bar. 100 is the default brightness, values below make it darker and above make it brighter.                                               |

## License

[MIT License](LICENSE)
