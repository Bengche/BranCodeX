import re, os

base = r'c:\Users\THE EYE INFORMATIQUE\Desktop\Updated Portfolio\brancodex-next'

for root, dirs, files in os.walk(base):
    dirs[:] = [d for d in dirs if d not in ['node_modules', '.next']]
    for f in files:
        if f.endswith(('.jsx', '.js', '.css')) and f != 'package-lock.json':
            path = os.path.join(root, f)
            try:
                txt = open(path, encoding='utf-8').read()
            except:
                continue
            # Find block comments /* ... */ or {/* ... */}
            for m in re.finditer(r'/\*(.*?)\*/', txt, re.DOTALL):
                nl = m.group(0).count('\n')
                if nl > 3:
                    ln = txt[:m.start()].count('\n') + 1
                    rel = path.replace(base + os.sep, '')
                    preview = m.group(0)[:100].replace('\n', ' ')
                    print(f"{rel} L{ln} ({nl} lines): {preview}")
