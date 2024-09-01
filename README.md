# **Spicetify Lucid Theme**

**A minimal and dynamic Bloom-inspired theme for Spicetify.**
Go to [Screenshots](#screenshots)

<details>
  <summary style="font-size: 1.1em; font-weight: bold;">Table of Contents</summary>
  <ul>
    <li><a href="#features"><strong>Features</strong></a></li>
    <li>
      <a href="#installation"><strong>Installation</strong></a>
      <ul>
        <li><a href="#manual-installation-using-scripts-recomended"><strong>Manual Installation using Scripts (Recommended)</strong></a>
        <ul>
            <li><a href="#windows-powershell">Windows (Powershell)</a></li>
            <li><a href="#linuxmacos-bash">Linux/macOS (Bash)</a></li>
        </ul>
        </li>
        <li><a href="#updating"><strong>Updating</strong></a>
        <ul>
            <li><a href="#windows-powershell-1">Windows (Powershell)</a></li>
            <li><a href="#other-os">Other OS</a></li>
        </ul>
        </li>
        <li><a href="#uninstallation"><strong>Uninstallation</strong></a>
        <ul>
            <li><a href="#automated-windows-powershell">Automated (Windows PowerShell)</a></li>
            <li><a href="#manual-uninstallation">Manual Uninstallation</a></li>
        </ul>
        </li>
        <li><a href="#using-spicetify-marketplace-simpler-installation"><strong>Using Spicetify Marketplace (Simpler Installation)</strong></a></li>
        <li><a href="#advanced-manual-installation"><strong>Advanced Manual Installation</strong></a></li>
      </ul>
    </li>
    <li>
        <a href="#customization"><strong>Customization</strong></a>
        <ul>
            <li><a href="#color-scheme">Color Scheme</a></li>
            <li><a href="#accent-color">Accent Color</a></li>
        </ul>
    </li>
    <li><a href="#screenshots"><strong>Screenshots</strong></a>
        <ul>
            <li><a href="#dark-default-with-control-nav">Dark (default) with Control Nav</a></li>
            <li><a href="#dark-default">Dark (default)</a></li>
        </ul>
    </li>
    <li><a href="#license"><strong>License</strong></a></li>
  </ul>
</details>

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

1. Install the `spicetify-marketplace` extension following its instructions: [https://github.com/spicetify/marketplace/wiki/Installation](https://github.com/spicetify/marketplace/wiki/Installation).
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

Available schemes: `dark`, `light`, `comfy`, `macos`, `coffee`, `violet`, `dracula`, `biscuit`, `cozytile`, `rosepine`, `darkgreen`, `greenland`, `dark-bloom`, `dark-fluent`, `dracula-pro`, `cosmic-dusk`, `midnight-slate`, `nocturne-coast`, `catppuccin-mocha`, `midnight-catppuccin`, `catppuccin-macchiato`, `catppuccin-darkrose`.

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

## License

[MIT License](LICENSE)
