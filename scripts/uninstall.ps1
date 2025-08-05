$ErrorActionPreference = 'Stop'

$themeName = 'Lucid'
$themeDir = Join-Path -Path (Split-Path (spicetify -c)) -ChildPath "Themes\$themeName"

# Check if theme directory exists
if (-Not (Test-Path -Path $themeDir)) {
    Write-Host "⚠️ Lucid theme not found at '$themeDir'" -ForegroundColor Yellow
} else {
    Write-Host "🗑 Removing Lucid theme directory..."
    Remove-Item -Path $themeDir -Recurse -Force
    Write-Host "✅ Theme directory removed." -ForegroundColor Green
}

# Reset Spicetify settings
Write-Host "🔧 Resetting Spicetify config..."
spicetify config current_theme ""
spicetify config color_scheme ""
spicetify config inject_css 1 replace_colors 1 overwrite_assets 1 inject_theme_js 1

# Apply config
Write-Host "🎨 Reapplying default settings..."
spicetify apply

Write-Host "✅ Lucid theme uninstalled successfully!" -ForegroundColor Green
