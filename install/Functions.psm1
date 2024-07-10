#Requires -Version 5.0

#region Console helpers
function Write-Center {
    [CmdletBinding()]
    param (
        [Parameter(Mandatory)]
        [string]$Message,
        
        [string]$ForegroundColor = $Host.UI.RawUI.ForegroundColor
    )
    process {
        $freeSpace = $Host.UI.RawUI.BufferSize.Width - $Message.Length
        $spaces = ' ' * [Math]::Floor($freeSpace / 2)
        Write-Host -Object ($spaces + $Message + $spaces) -ForegroundColor $ForegroundColor
    }
}

function Write-HelloMessage {
    [CmdletBinding()]
    param ()
    process {
        Write-Host
        Write-Center -Message '----------------------------------------' -ForegroundColor Blue
        Write-Center -Message 'Starting the Spicetify Lucid script...' -ForegroundColor Blue
        Write-Host
        Write-Center -Message 'github.com/sanoojes/Spicetify-Lucid' -ForegroundColor Blue
        Write-Center -Message '----------------------------------------' -ForegroundColor Blue
        Write-Host
    }
}

function Write-Error {
    [CmdletBinding()]
    param (
        [Parameter(Mandatory)]
        [string]$Message
    )
    process {
        Write-Host -Object $Message -ForegroundColor Red
        Write-Verbose -Message $Message
    }
    end {
        Wait-Input
        exit 1
    }
}

function Write-ByeMessage {
    [CmdletBinding()]
    param ()
    process {
        Write-Host
        Write-Center -Message '----------------------------------------' -ForegroundColor Green
        Write-Center -Message 'No errors!' -ForegroundColor Green
        Write-Host
        Write-Center -Message 'Thanks for using Lucid!' -ForegroundColor Green
        Write-Center -Message '----------------------------------------' -ForegroundColor Green
        Write-Host
    }
}

function Wait-Input {
    [CmdletBinding()]
    param ()
    process {
        Write-Host -Object 'Press any key to continue...'
        $Host.UI.RawUI.Flushinputbuffer()
        $Host.UI.RawUI.ReadKey('NoEcho, IncludeKeyDown') | Out-Null
    }
}
#endregion Console helpers

#region Spotify
function Test-Spotify {
    [CmdletBinding()]
    [OutputType([bool])]
    param ()
    begin {
        Write-Verbose -Message 'Checking if Spotify is installed...'
    }
    process {
        $desktopApp = Test-Path -Path "$env:APPDATA\Spotify" -PathType Container
        $storeApp = Get-AppxPackage -Name '*SpotifyAB*'
    }
    end {
        $desktopApp -or $storeApp
    }
}

function Test-SpotifyBackup {
    [CmdletBinding()]
    [OutputType([bool])]
    param (
        [Parameter(Mandatory)]
        [string]$Path
    )
    begin {
        Write-Verbose -Message 'Checking if there is up-to-date Spotify backup...'
    }
    process {
        $configFile = Get-Content -Path $Path
        $configFile | ForEach-Object -Process {
            if ($PSItem -match '^version = (.+)$') {
                $backupVersion = $Matches[1]
            }
            elseif ($PSItem -match '^prefs_path.+= (.+)$') {
                $spotifyPrefsPath = $Matches[1]
            }
        }
        
        $spotifyPrefs = Get-Content -Path $spotifyPrefsPath
        $spotifyPrefs | ForEach-Object -Process {
            if ($PSItem -match '^app.last-launched-version="(.+)"$') {
                $spotifyVersion = $Matches[1]
            }
        }
    }
    end {
        $backupVersion -eq $spotifyVersion
    }
}

function Install-Spotify {
    [CmdletBinding()]
    param ()
    begin {
        $Temp = [System.IO.Path]::GetTempPath()
        $installerPath = "$Temp\SpotifySetup.exe"
    }
    process {
        Write-Verbose -Message 'Downloading the Spotify installer...'
        $Parameters = @{
            UseBasicParsing = $true
            Uri             = 'https://download.scdn.co/SpotifySetup.exe'
            OutFile         = $installerPath
        }
        try {
            Invoke-WebRequest @Parameters -ErrorAction Stop
        } catch {
            Write-Error -Message "Failed to download: $($_.Exception.Message). Please check your internet connection and try again."
        } 
        
        Write-Host
        Write-Host -Object 'ATTENTION!' -ForegroundColor Yellow
        Write-Host -Object 'Do not close the Spotify installer!'
        Write-Host -Object 'Once Spotify is installed, please login. Then close the window.'
        Wait-Input
        
        Write-Host
        Write-Verbose -Message 'Starting the Spotify installer...'
        Start-Process -FilePath $installerPath
        
        while (-not (Get-Process -Name Spotify -ErrorAction SilentlyContinue)) {
            Start-Sleep -Seconds 1
        }
        Wait-Process -Name Spotify
    }
}
#endregion Spotify

#region Spicetify
function Test-Spicetify {
    [CmdletBinding()]
    [OutputType([bool])]
    Param ()
    Begin {
        Write-Verbose -Message 'Checking if Spicetify is installed...'
    }
    Process {
        [bool](Get-Command -Name spicetify -ErrorAction SilentlyContinue) 
    }
}

function Install-Spicetify {
    [CmdletBinding()]
    param ()
    begin {
        Write-Verbose -Message 'Starting the Spicetify installation script...'
    }
    process {
        $Parameters = @{
            UseBasicParsing = $true
            Uri             = 'https://raw.githubusercontent.com/spicetify/spicetify-cli/master/install.ps1'
        }
        try {
            Invoke-WebRequest @Parameters -ErrorAction Stop | Invoke-Expression
        } catch {
            Write-Error -Message "Failed to download: $($_.Exception.Message). Please check your internet connection and try again."
        } 
    }
}

function Install-Marketplace {
    [CmdletBinding()]
    param ()
    begin {
        Write-Verbose -Message 'Starting the Spicetify Marketplace installation script...'
    }
    process {
        $Parameters = @{
            UseBasicParsing = $true
            Uri             = (
                'https://raw.githubusercontent.com/spicetify/spicetify-marketplace/main/resources/install.ps1'
            )
        }
        try {
            Invoke-WebRequest @Parameters -ErrorAction Stop | Invoke-Expression
        } catch {
            Write-Error -Message "Failed to download: $($_.Exception.Message). Please check your internet connection and try again."
        } 
    }
}

function Get-SpicetifyFoldersPaths {
    [CmdletBinding()]
    [OutputType([hashtable])]
    param ()
    begin {
        Write-Verbose -Message 'Getting the Spicetify folders paths...'
    }
    process {
        @{
            configPath = (spicetify path -c)
            lucidPath  = "$(spicetify path userdata)\Themes\Lucid"
        }
    }
}

function Submit-SpicetifyConfig {
    [CmdletBinding()]
    param (
        [Parameter(Mandatory)]
        [string]$Path
    )
    begin {
        Write-Verbose -Message 'Applying changes...'
    }
    process {
        if (Test-SpotifyBackup -Path $Path) {
            spicetify apply
        }
        else {
            spicetify backup apply
        }
    }
}
#endregion Spicetify

#region Misc
function Get-WindowsAppsTheme {
    [CmdletBinding()]
    param ()
    begin {
        Write-Verbose -Message 'Getting current Windows apps theme...'
        $Parameters = @{
            Path = 'HKCU:\Software\Microsoft\Windows\CurrentVersion\Themes\Personalize'
            Name = 'AppsUseLightTheme'
        }
    }
    process {
        switch (Get-ItemPropertyValue @Parameters) {
            0 { 'dark' }
            1 { 'light' }
        }
    }
}

function Get-ThemeType {
    [CmdletBinding()]
    [OutputType([string])]
    param (
        [Parameter(Mandatory)]
        [string]$Path
    )
    begin {
        Write-Verbose -Message 'Detecting current installation type...'
    }
    process {
        $userCssData = Get-Content -Path "$Path\user.css"
    }
    end {
        if ($userCssData -like '*@import*') {
            'Remote'
        }
        else {
            'Local'
        }
    }
}
#endregion Misc

#region Lucid
function Get-Lucid {
    [CmdletBinding()]
    [OutputType([System.Collections.Hashtable])]
    param (
        [ValidateSet('Remote', 'Local')]
        [string]$Type = 'Remote'
    )
    begin {
        $baseUrl = 'https://raw.githubusercontent.com/sanoojes/Spicetify-Lucid/main'
        $filesToDownload = if ($Type -eq 'Remote') {
            @(
                "$baseUrl/src/color.ini", 
                "$baseUrl/remote/user.css",
                "$baseUrl/remote/theme.js"
            )
        } else {
            @(
                "$baseUrl/src/color.ini",
                "$baseUrl/src/user.css",
                "$baseUrl/src/theme.js"
            )
        }
        $downloadedFiles = @{}
        $fileCount = $filesToDownload.Count
        $fileIndex = 0
    }
    process {
        foreach ($fileUrl in $filesToDownload) {
            $fileIndex++
            Write-Verbose -Message "Downloading '$fileUrl' ($fileIndex/$fileCount)..."
            try {
                $fileContent = (Invoke-WebRequest -Uri $fileUrl -UseBasicParsing -ErrorAction Stop).Content
                $fileName = Split-Path -Path $fileUrl -Leaf
                $downloadedFiles.Add($fileName, $fileContent)
            } catch {
                Write-Error -Message "Failed to download '$fileUrl': $($_.Exception.Message)"
            }
        }
    }
    end {
        return $downloadedFiles
    }
}

function Install-Lucid {
    [CmdletBinding()]
    param (
        [Parameter(Mandatory)]
        [string]$Destination,
        
        [Parameter(Mandatory)]
        [string]$Config,
        
        [ValidateSet('Remote', 'Local')]
        [string]$Type = 'Remote',
        
        [string]$ColorScheme
    )
    begin {
        Write-Verbose -Message "Installing Lucid theme (Type: $Type)..."
        $downloadedFiles = Get-Lucid -Type $Type

        # Check if downloads were successful
        if ($downloadedFiles.Count -ne 3) {
            Write-Error -Message 'Failed to download all Lucid theme files. Installation aborted.' 
        }
    }
    process {
        New-Item -Path $Destination -ItemType Directory -Force | Out-Null

        foreach ($fileName in $downloadedFiles.Keys) {
            $filePath = Join-Path -Path $Destination -ChildPath $fileName
            Write-Verbose -Message "Creating '$filePath'"
            Set-Content -Path $filePath -Value $downloadedFiles[$fileName] -Encoding UTF8
        }
        
        Write-Verbose -Message 'Configuring Spicetify...'
        spicetify config inject_css 1 replace_colors 1 overwrite_assets 1 inject_theme_js 1
        spicetify config current_theme 'Lucid'
        
        if ($ColorScheme) {
            spicetify config color_scheme $ColorScheme
        }
        
        Submit-SpicetifyConfig -Path $Config
    }
}

function Uninstall-Lucid {
    <#
    .SYNOPSIS
        Uninstalls the Lucid theme.

    .DESCRIPTION
        This function uninstalls the Lucid theme by resetting the relevant Spicetify configurations 
        and removing the theme directory.

    .PARAMETER Path
        Specifies the path to the Lucid theme directory.

    .PARAMETER Config
        Specifies the path to your Spicetify configuration file.

    .PARAMETER Value 
        Sets current theme and color_scheme to this value, default is empty string
    #>
    [CmdletBinding()]
    param (
        [Parameter(Mandatory)]
        [string]$Path,
        
        [Parameter(Mandatory)]
        [string]$Config,
        
        [string]$Value = ' '
    )
    begin {
        Write-Verbose -Message 'Uninstalling Lucid theme...'
    }
    process {
        Write-Verbose -Message 'Resetting Spicetify configurations...'
        spicetify config current_theme $Value color_scheme $Value
        Submit-SpicetifyConfig -Path $Config
    }
    end {
        Write-Verbose -Message "Removing theme directory '$Path'..."
        Remove-Item -Path $Path -Recurse -Force
    }
}
#endregion Lucid