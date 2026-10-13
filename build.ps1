param([switch]$Check)
$ErrorActionPreference = 'Stop'
Set-StrictMode -Version Latest
$root = $PSScriptRoot
$utf8 = [System.Text.UTF8Encoding]::new($false)
$template = [System.IO.File]::ReadAllText((Join-Path $root 'page.template.html'))
$css = [System.IO.File]::ReadAllText((Join-Path $root 'styles.css'))
$parts = @('app.js','catalog.js','engine.js') | ForEach-Object { [System.IO.File]::ReadAllText((Join-Path $root $_)) }
$javascript = $parts -join "`n"
$javascript = $javascript.Replace('</script', '<\/script')
$script = "<script>`n(() => {`n'use strict';`ntry {`n" + $javascript + "`n} catch (error) {`nconst notice = document.getElementById('startup-error');`nnotice.hidden = false;`nnotice.textContent += ': ' + error.message;`nconsole.error(error);`n}`n})();`n</script>"
$output = $template.Replace('<!-- INLINE_STYLES -->', "<style>`n$css`n</style>").Replace('<!-- INLINE_SCRIPTS -->', $script)
$output = $output.Replace("`r`n", "`n")
$target = Join-Path $root 'index.html'
if ($Check) {
  $current = [System.IO.File]::ReadAllText($target).Replace("`r`n", "`n")
  if ($current -cne $output) { throw 'index.html is stale. Run ./build.ps1' }
  Write-Output 'PASS: index.html matches source files'
} else {
  [System.IO.File]::WriteAllText($target, $output, $utf8)
  Write-Output 'Built standalone index.html'
}
