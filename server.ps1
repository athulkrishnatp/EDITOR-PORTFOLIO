$port = 8000
$listener = New-Object System.Net.Sockets.TcpListener([System.Net.IPAddress]::Loopback, $port)
try {
    $listener.Start()
    Write-Host "Server started on http://localhost:$port/"
    while ($true) {
        $client = $listener.AcceptTcpClient()
        $stream = $client.GetStream()
        
        # We need a binary reader/writer and stream reader to handle headers
        $reader = New-Object System.IO.StreamReader($stream)
        $requestLine = $reader.ReadLine()
        
        # Read the rest of headers to clear buffer
        while ($null -ne ($headerLine = $reader.ReadLine()) -and $headerLine.Trim() -ne "") {
            # Just consume headers
        }
        
        if ($requestLine) {
            $parts = $requestLine.Split(' ')
            if ($parts.Length -ge 2) {
                $method = $parts[0]
                $urlPath = $parts[1]
                
                # Clean URL parameters and decode spaces
                $urlPath = [System.Web.HttpUtility]::UrlDecode($urlPath.Split('?')[0])
                if ($urlPath -eq "/") { $urlPath = "/index.html" }
                
                # Normalize and construct local path
                $localPath = [System.IO.Path]::GetFullPath((Join-Path "c:\Users\Netcom\Downloads\portfolio files" $urlPath.TrimStart('/')))
                
                if (Test-Path $localPath -PathType Leaf) {
                    $ext = [System.IO.Path]::GetExtension($localPath).ToLower()
                    $contentType = "application/octet-stream"
                    switch ($ext) {
                        ".html" { $contentType = "text/html; charset=utf-8" }
                        ".css"  { $contentType = "text/css" }
                        ".js"   { $contentType = "application/javascript" }
                        ".png"  { $contentType = "image/png" }
                        ".jpg"  { $contentType = "image/jpeg" }
                        ".jpeg" { $contentType = "image/jpeg" }
                        ".mp4"  { $contentType = "video/mp4" }
                        ".svg"  { $contentType = "image/svg+xml" }
                        ".webp" { $contentType = "image/webp" }
                    }
                    
                    $bytes = [System.IO.File]::ReadAllBytes($localPath)
                    
                    $writer = New-Object System.IO.StreamWriter($stream)
                    $writer.AutoFlush = $true
                    $writer.WriteLine("HTTP/1.1 200 OK")
                    $writer.WriteLine("Content-Type: $contentType")
                    $writer.WriteLine("Content-Length: $($bytes.Length)")
                    $writer.WriteLine("Access-Control-Allow-Origin: *")
                    $writer.WriteLine("Connection: close")
                    $writer.WriteLine("")
                    
                    $stream.Write($bytes, 0, $bytes.Length)
                } else {
                    $writer = New-Object System.IO.StreamWriter($stream)
                    $writer.AutoFlush = $true
                    $writer.WriteLine("HTTP/1.1 404 Not Found")
                    $writer.WriteLine("Content-Type: text/plain")
                    $writer.WriteLine("Connection: close")
                    $writer.WriteLine("")
                    $writer.Write("404 Not Found")
                }
            }
        }
        
        $client.Close()
    }
} catch {
    Write-Error $_
} finally {
    if ($listener) { $listener.Stop() }
}
