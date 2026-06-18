Write-Output "Checking git:"
Get-Command git | Format-List | Out-String
Write-Output "Checking git location:"
where.exe git | Out-String
Write-Output "Trying to execute git:"
try {
    & git --version
} catch {
    Write-Output "Error running git: $_"
}
