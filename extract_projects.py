html = open(r'c:\Users\THE EYE INFORMATIQUE\Desktop\Updated Portfolio\index.html', encoding='utf-8').read()

# Find projects section
tag = '<section id="projects"'
start = html.find(tag)
depth = 0
i = start
while i < len(html):
    if html[i:i+8] == '<section':
        depth += 1
    elif html[i:i+10] == '</section>':
        depth -= 1
        if depth == 0:
            end = i + 10
            break
    i += 1

section = html[start:end]
print(f"Projects section: {len(section)} chars, {section.count('project-card')} project-cards")
print(section[:5000])
