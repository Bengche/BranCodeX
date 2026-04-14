import re, os

BASE = r'c:\Users\THE EYE INFORMATIQUE\Desktop\Updated Portfolio'

# Check playground.js for large commented-out blocks (consecutive // lines)
print("=== JAVASCRIPT/playground.js - large // comment blocks ===")
lines = open(os.path.join(BASE, 'JAVASCRIPT/playground.js'), encoding='utf-8').readlines()
block_start = -1
for i, line in enumerate(lines):
    s = line.strip()
    if s.startswith('//') and (i == 0 or not lines[i-1].strip().startswith('//')):
        block_start = i
    elif block_start >= 0 and not s.startswith('//') and s:
        size = i - block_start
        if size > 10:
            print(f'  L{block_start+1}-L{i} ({size} lines): {lines[block_start].strip()[:80]}')
        block_start = -1

# Check CSS files for block comments
print("\n=== CSS/index.css - block comments ===")
css = open(os.path.join(BASE, 'CSS/index.css'), encoding='utf-8').read()
for m in re.finditer(r'/\*(.*?)\*/', css, re.DOTALL):
    lines_in = m.group(0).count('\n')
    if lines_in > 3:
        start_line = css[:m.start()].count('\n') + 1
        print(f'  L{start_line} ({lines_in} lines): {m.group(0)[:80].replace(chr(10)," ")}')

print("\n=== CSS/playground.css - block comments ===")
css2 = open(os.path.join(BASE, 'CSS/playground.css'), encoding='utf-8').read()
for m in re.finditer(r'/\*(.*?)\*/', css2, re.DOTALL):
    lines_in = m.group(0).count('\n')
    if lines_in > 3:
        start_line = css2[:m.start()].count('\n') + 1
        print(f'  L{start_line} ({lines_in} lines): {m.group(0)[:80].replace(chr(10)," ")}')

# Check index.html for large commented-out HTML
print("\n=== index.html - large HTML comment blocks ===")
html = open(os.path.join(BASE, 'index.html'), encoding='utf-8').read()
for m in re.finditer(r'<!--(.*?)-->', html, re.DOTALL):
    block = m.group(0)
    nl = block.count('\n')
    if nl > 5:
        start_line = html[:m.start()].count('\n') + 1
        print(f'  L{start_line} ({nl} lines): {block[:100].replace(chr(10)," ")}')
