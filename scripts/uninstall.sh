#!/bin/sh

set -e

theme_name="Lucid"
theme_dir="$(dirname "$(spicetify -c)")/Themes/$theme_name"

# Check if Lucid theme folder exists
if [ ! -d "$theme_dir" ]; then
    echo "⚠️ Lucid theme not found at $theme_dir"
else
    echo "🗑 Removing Lucid theme directory..."
    rm -rf "$theme_dir"
    echo "✅ Theme directory removed."
fi

# Reset Spicetify theme settings
echo "🔧 Resetting Spicetify config..."
spicetify config current_theme ""
spicetify config color_scheme ""
spicetify config inject_css 1 replace_colors 1 overwrite_assets 1 inject_theme_js 1

# Apply changes
echo "🎨 Reapplying default settings..."
spicetify apply

echo "✅ Lucid theme uninstalled successfully!"
