#!/bin/sh

set -e

branch="main"
mode="Remote"

while [ "$#" -gt 0 ]; do
    case "$1" in
        --branch)
            branch="$2"
            shift 2
            ;;
        --mode)
            mode="$2"
            shift 2
            ;;
        *)
            echo "Unknown option: $1"
            echo "Usage: $0 [--branch main|beta] [--mode Remote|Local]"
            exit 1
            ;;
    esac
done

if [ "$mode" != "Remote" ] && [ "$mode" != "Local" ]; then
    echo "❌ Invalid mode: $mode"
    echo "Allowed values: Remote, Local"
    exit 1
fi

if [ "$branch" != "main" ] && [ "$branch" != "beta" ]; then
    echo "❌ Invalid branch: $branch"
    echo "Allowed values: main, beta"
    exit 1
fi

theme_name="Lucid"
theme_dir="$(dirname "$(spicetify -c)")/Themes/${theme_name}"
mkdir -p "$theme_dir"

base_url="https://raw.githubusercontent.com/sanoojes/Spicetify-Lucid/$branch"

if [ "$mode" = "Remote" ]; then
    user_css_url="$base_url/remote/user.css"
    theme_js_url="$base_url/remote/theme.js"
else
    user_css_url="$base_url/src/user.css"
    theme_js_url="$base_url/src/theme.js"
fi

color_ini_url="$base_url/src/color.ini"

echo "📥 Downloading Lucid theme ($mode mode) from '$branch' branch..."
curl --silent --output "${theme_dir}/color.ini" "$color_ini_url"
curl --silent --output "${theme_dir}/user.css" "$user_css_url"
curl --silent --output "${theme_dir}/theme.js" "$theme_js_url"
echo "✅ Files downloaded to: $theme_dir"

echo "🎨 Applying theme..."
spicetify config current_theme "$theme_name" color_scheme dark
spicetify config inject_css 1 replace_colors 1 overwrite_assets 1 inject_theme_js 1
spicetify apply

echo "✅ All done!"
