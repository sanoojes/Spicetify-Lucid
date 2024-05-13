<div align="center">
  <h1>Bloom</h1>
  
  Bloom theme inspired by [Bloom](https://github.com/nimsandu/spicetify-bloom)  
  
  **Consider starring us !**
</div>

## Screenshots

### Dark (default)

![Dark Preview](./assets/images/base.png)
![Dark 1 Preview](./assets/images/better-bloom-dark.png)
![Dark 2 Preview](./assets/images/better-bloom-dark2.png)

### Light

![Light Preview](./assets/images/better-bloom-light.png)

### Comfy

![Comfy Preview](./assets/images/better-bloom-comfy.png)

### Darkgreen

![DarkGreen Preview](./assets/images/better-bloom-darkgreen.png)

### Violet

![Violet Preview](./assets/images/better-bloom-violet.png)

### Dark-Fluent

![Dark-Fluent Preview](./assets/images/better-bloom-dark-fluent.png)

### Dark-Bloom

![Dark-Bloom Preview](./assets/images/better-bloom-dark-bloom.png)

## Dependencies

- Latest version of [Spicetify](https://github.com/spicetify/spicetify-cli).
- Latest version of [Spotify](https://www.spotify.com/download).
- [Poppins](https://fonts.google.com/specimen/Poppins) font family, from Google Fonts.

## Troubleshooting

### Issues when installing from Spicetify Marketplace

```sh
spicetify config current_theme marketplace color_scheme marketplace
spicetify config inject_css 1 replace_colors 1 overwrite_assets 1 inject_theme_js 1
spicetify apply
```

### There isn't any blur at all

Open Spotify settings and turn on `Enable hardware acceleration`.

### Some custom app on the left navbar has a wrong icon

Please report about that via the repository's issues page.

## Credits

- Based on [Bloom](https://github.com/nimsandu/spicetify-bloom) by [nimsandu](https://github.com/nimsandu)

## License

[MIT License](LICENSE)
