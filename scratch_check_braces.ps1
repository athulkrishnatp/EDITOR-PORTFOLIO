$content = Get-Content 'c:\Users\Netcom\Downloads\portfolio files\athulkrishna-portfolio-premium.jsx' -Raw
$openC = 0
$closeC = 0
$line = 1
$col = 1
$stack = @()

for ($i = 0; $i -lt $content.Length; $i++) {
    $char = $content[$i]
    if ($char -eq "`n") {
        $line++
        $col = 1
        continue
    }
    
    if ($char -eq '{') {
        $openC++
        $stack += ,@($line, $col)
    } elseif ($char -eq '}') {
        $closeC++
        if ($stack.Length -gt 0) {
            $stack = $stack[0..($stack.Length - 2)]
        } else {
            Write-Host "Unmatched closing brace '}' at Line $line, Col $col"
        }
    }
    $col++
}

Write-Host "Total Open Braces: $openC"
Write-Host "Total Close Braces: $closeC"
if ($stack.Length -gt 0) {
    Write-Host "Unmatched open braces remaining:"
    foreach ($item in $stack) {
        Write-Host "  Opened at Line $($item[0]), Col $($item[1])"
    }
} else {
    Write-Host "All braces matched successfully!"
}
