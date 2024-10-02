$srcFolder = "src"
$themeName ="Lucid"
$destinationFolder = "$(spicetify path userdata)\Themes\$themeName"

# Create the destination folder if it doesn't exist
if (!(Test-Path $destinationFolder)) {
    New-Item -ItemType Directory -Path $destinationFolder -Force
}

Write-Host "Copying theme files..."
try {
    Copy-Item -Path "$srcFolder\*.*" -Destination "$destinationFolder" -Recurse -Force
    Write-Host "Theme files copied successfully!"
} catch {
    Write-Host "Error copying files: $($_.Exception.Message)"
}
Write-Host "Applying Spicetify theme..."
Invoke-Expression "spicetify config current_theme $themeName inject_theme_js 1 extensions theme.js-" 
Invoke-Expression "spicetify apply" 

while ((Get-Item $destinationFolder).LastWriteTime -eq $lastWriteTime) {
    Start-Sleep -Milliseconds 500 # Check every 500ms
}

Write-Host "Theme applied successfully!"

$configPath = (spicetify path -c)
Write-Host "Config path: $configPath"
Write-Host "Theme path: $destinationFolder"