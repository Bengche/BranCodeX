import re

for filename in ['index.html', 'faq.html', 'playground.html']:
    print(f"\n{'='*60}")
    print(f"FILE: {filename}")
    print('='*60)
    with open(filename, encoding='utf-8') as f:
        content = f.read()
    
    # Find all multi-line comment blocks (<!-- ... --> spanning multiple lines)
    pattern = re.compile(r'<!--((?!-->).)*?-->', re.DOTALL)
    
    lines = content.split('\n')
    line_starts = [0]
    for line in lines:
        line_starts.append(line_starts[-1] + len(line) + 1)
    
    def get_line_num(pos):
        for i, s in enumerate(line_starts):
            if s > pos:
                return i
        return len(lines)
    
    for m in pattern.finditer(content):
        block = m.group(0)
        num_newlines = block.count('\n')
        if num_newlines > 3:  # Only multi-line blocks with actual content
            start_line = get_line_num(m.start())
            end_line = get_line_num(m.end())
            preview = block.strip()[:100].replace('\n', ' ')
            print(f"Lines {start_line}-{end_line} ({num_newlines} newlines): {preview}")
