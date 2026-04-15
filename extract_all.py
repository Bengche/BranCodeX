import re

html = open(r'c:\Users\THE EYE INFORMATIQUE\Desktop\Updated Portfolio\index.html', encoding='utf-8').read()

def extract_section(tag_attr, tag='section'):
    marker = f'<{tag} {tag_attr}'
    start = html.find(marker)
    if start == -1:
        return f"NOT FOUND: {tag_attr}"
    depth = 0
    i = start
    close_tag = f'</{tag}>'
    open_tag = f'<{tag}'
    while i < len(html):
        if html[i:i+len(open_tag)] == open_tag and html[i+len(open_tag)] in (' ', '\n', '\t'):
            depth += 1
        elif html[i:i+len(close_tag)] == close_tag:
            depth -= 1
            if depth == 0:
                return html[start:i+len(close_tag)]
        i += 1
    return html[start:start+5000]

sections = {
    'skills':        extract_section('id="skills"'),
    'projects':      extract_section('id="projects"'),
    'cta':           extract_section('class="cta-section"'),
    'playground':    extract_section('class="text-white py-20 px-6 playground"'),
    'contact':       extract_section('id="contact"'),
    'testimonials':  extract_section('id="testimonials"'),
}

for name, content in sections.items():
    with open(f'section_{name}.txt', 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"{name}: {len(content)} chars")
