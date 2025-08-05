$ErrorActionPreference = 'Stop'

if (-not (Get-Command spicetify -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Spicetify is not installed or not in PATH." -ForegroundColor Red
    exit 1
}

$modeChoice = $Host.UI.PromptForChoice(
    'Installation Mode',
    'Choose how to install Lucid theme:',
    @('&Remote (auto-update)', '&Local (static files)'),
    0
)
$mode = if ($modeChoice -eq 0) { 'Remote' } else { 'Local' }

$branchChoice = $Host.UI.PromptForChoice(
    'Select Branch',
    'Choose which branch to install from:',
    @('&main', '&beta'),
    0
)
$branch = if ($branchChoice -eq 0) { 'main' } else { 'beta' }

$themeName = 'Lucid'
$themePath = "$(spicetify path userdata)\Themes\$themeName"
$configPath = spicetify path -c
$baseUrl = "https://raw.githubusercontent.com/sanoojes/Spicetify-Lucid/$branch"

# File URLs
if ($mode -eq 'Remote') {
    $files = @{
        'color.ini' = "$baseUrl/src/color.ini"
        'user.css'  = "$baseUrl/remote/user.css"
        'theme.js'  = "$baseUrl/remote/theme.js"
    }
} else {
    $files = @{
        'color.ini' = "$baseUrl/src/color.ini"
        'user.css'  = "$baseUrl/src/user.css"
        'theme.js'  = "$baseUrl/src/theme.js"
    }
}

New-Item -Path $themePath -ItemType Directory -Force | Out-Null

foreach ($file in $files.GetEnumerator()) {
    $outPath = Join-Path $themePath $file.Key
    Invoke-WebRequest -Uri $file.Value -OutFile $outPath -UseBasicParsing
    Write-Host "✓ Downloaded: $file.Key" -ForegroundColor Cyan
}

spicetify config inject_css 1 replace_colors 1 overwrite_assets 1 inject_theme_js 1
spicetify config current_theme $themeName
spicetify config color_scheme 'dark'
spicetify apply

Write-Host "`n🎉 Lucid theme installed successfully!"
Write-Host "→ Mode: $mode"
Write-Host "→ Branch: $branch" -ForegroundColor Green
