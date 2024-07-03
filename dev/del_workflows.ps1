# Set colors for output
$green =  [ConsoleColor]::Green
$red =  [ConsoleColor]::Red
$yellow =  [ConsoleColor]::Yellow
$reset =  [ConsoleColor]::White

# Prompt for GitHub username and repository
$username = Read-Host -Prompt "Enter your GitHub username"
$repository = Read-Host -Prompt "Enter your GitHub repository name"

# Function to get the total number of workflow runs
function Get-TotalRuns {
  $runs = gh api -X GET /repos/$username/$repository/actions/runs | ConvertFrom-Json
  return $runs.workflow_runs.Count
}

# Function to delete all workflow runs
function Delete-AllWorkflowRuns {
  $runs = gh api -X GET /repos/$username/$repository/actions/runs | ConvertFrom-Json
  $runIds = $runs.workflow_runs | Select-Object -ExpandProperty id 

  foreach ($runId in $runIds) {
    Write-Host "Deleting workflow run with ID: $runId" -ForegroundColor Green
    gh api -X DELETE /repos/$username/$repository/actions/runs/$runId | Out-Null
  }

  Write-Host "All workflow runs have been deleted." -ForegroundColor Green
}

# Main loop
while ($true) {
  $totalRuns = Get-TotalRuns

  # Display options
  Write-Host "Workflow Run Deleter for $username/$repository" -ForegroundColor Green
  Write-Host "Total Workflow Runs: $totalRuns" -ForegroundColor Yellow

  Write-Host "1. Delete all workflow runs" -ForegroundColor Green
  Write-Host "2. Exit" -ForegroundColor Green

  $choice = Read-Host -Prompt "Enter your choice"

  switch ($choice) {
    1 {
      if ($totalRuns -gt 0) {
        Delete-AllWorkflowRuns
      } else {
        Write-Host "No workflow runs found to delete." -ForegroundColor Yellow
      }
    }
    2 {
      Write-Host "Exiting..."
      break
    }
    default {
      Write-Host "Invalid choice. Please try again." -ForegroundColor Red
    }
  }

  Write-Host "" # Add a blank line for better readability
}

# Reset console color
Write-Host -NoNewLine -ForegroundColor $reset