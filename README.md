# Lucid Theme

**Lucid** is a sleek, modern Spicetify theme with dynamic visuals and **highly customizable** features for a personalized Spotify experience.

---

## 🖥️ Preview

<div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 0.5rem">
  <img src="./assets/images/base.png" style="width: 48%; border-radius: 8px;">
  <img src="./assets/images/base-2.png" style="width: 48%; border-radius: 8px;">
</div>

<details>
  <summary>Lazy note</summary>
  Sorry, am lazy to add more previews. Try out the theme.
</details>

---

## ✅ Compatibility

* **Recommended Spicetify**: `v2.40.11` or later
* **Recommended Spotify**: `v1.2.63` or later

---

## 💬 Community & Support

* 🗨️ [Discord](https://discord.gg/PWEyKduwJh)
* 🐛 [GitHub Issues](https://github.com/sanoojes/Spicetify-Lucid/issues)

---

## 📥 Installation

### 🔸 Spicetify Marketplace (Recommended)

1. [Install Marketplace](https://github.com/spicetify/marketplace/wiki/Installation)
2. Search **"Lucid"** and click **Install**

---

### 🔹 Script Installation

#### Windows (PowerShell)

```powershell
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
iex "& { $(iwr -useb 'https://cdn.jsdelivr.net/gh/sanoojes/Spicetify-Lucid@latest/scripts/install.ps1') }"
```

#### Linux/macOS (Bash)

```bash
curl -fsSL https://cdn.jsdelivr.net/gh/sanoojes/Spicetify-Lucid/scripts/install.sh | sh
```

---

### 🔸 Manual Installation

1. [Download ZIP](https://github.com/sanoojes/Spicetify-Lucid)
2. Find your themes folder:

   ```bash
   spicetify path userdata
   ```
3. Create a `Lucid` folder inside `Themes`
4. Extract contents of `/src` into `Lucid`
5. Apply the theme:

   ```bash
   spicetify config current_theme Lucid
   spicetify config color_scheme dark
   spicetify config inject_css 1 replace_colors 1 overwrite_assets 1 inject_theme_js 1
   spicetify apply
   ```

---

## ❌ Uninstallation

### Windows (PowerShell)

```powershell
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
iex "& { $(iwr -useb 'https://cdn.jsdelivr.net/gh/sanoojes/Spicetify-Lucid@latest/scripts/uninstall.ps1') }"
```

### Linux/macOS (Bash)

```bash
curl -fsSL https://cdn.jsdelivr.net/gh/sanoojes/Spicetify-Lucid/scripts/uninstall.sh | sh
```

---

## 📄 License

[MIT License](LICENSE)

