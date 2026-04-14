html = open(r'c:\Users\THE EYE INFORMATIQUE\Desktop\Updated Portfolio\index.html', encoding='utf-8').read()

# Find skills section
tag = '<section id="skills"'
start = html.find(tag)
# Find the closing </section> that matches
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
print(f"Section length: {len(section)} chars")
print("--- Content ---")
print(section[:4000])
