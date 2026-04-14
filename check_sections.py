html = open(r'c:\Users\THE EYE INFORMATIQUE\Desktop\Updated Portfolio\index.html', encoding='utf-8').read()

sections_to_check = [
    ('about', 'id="about"'),
    ('testimonials', 'id="testimonials"'),
    ('contact', 'id="contact"'),
    ('playground_teaser', 'id="playground"'),
    ('cta', 'class="cta-section"'),
]

for name, tag in sections_to_check:
    start = html.find(f'<section {tag}')
    if start == -1:
        start = html.find(f'<div {tag}')
    if start == -1:
        print(f"\n=== {name}: NOT FOUND ===")
        continue
    end = html.find('</section>', start) + 10
    section = html[start:end]
    print(f"\n=== {name}: {len(section)} chars ===")
    print(section[:500])
    print("...")
