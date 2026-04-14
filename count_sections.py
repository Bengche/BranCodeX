import re

html = open(r'c:\Users\THE EYE INFORMATIQUE\Desktop\Updated Portfolio\index.html', encoding='utf-8').read()
plans_jsx = open(r'c:\Users\THE EYE INFORMATIQUE\Desktop\Updated Portfolio\brancodex-next\components\Plans.jsx', encoding='utf-8').read()
services_jsx = open(r'c:\Users\THE EYE INFORMATIQUE\Desktop\Updated Portfolio\brancodex-next\components\Services.jsx', encoding='utf-8').read()
projects_jsx = open(r'c:\Users\THE EYE INFORMATIQUE\Desktop\Updated Portfolio\brancodex-next\components\Projects.jsx', encoding='utf-8').read()
skills_jsx = open(r'c:\Users\THE EYE INFORMATIQUE\Desktop\Updated Portfolio\brancodex-next\components\Skills.jsx', encoding='utf-8').read()
testimonials_jsx = open(r'c:\Users\THE EYE INFORMATIQUE\Desktop\Updated Portfolio\brancodex-next\components\Testimonials.jsx', encoding='utf-8').read()

print("=== Plans ===")
print(f"HTML plan-title count: {html.count('plan-title')}")
print(f"JSX plan-title count: {plans_jsx.count('plan-title') + plans_jsx.count('planTitle')}")

print("\n=== Services ===")
html_svc = len(re.findall(r'<div class="service-card', html))
jsx_svc = len(re.findall(r"title:", services_jsx))
print(f"HTML service-card divs: {html_svc}")
print(f"JSX service title entries: {jsx_svc}")

print("\n=== Projects ===")
html_proj = len(re.findall(r'<div class="project-card|project-item', html))
jsx_proj = len(re.findall(r'title:', projects_jsx))
print(f"HTML project cards: {html_proj}")
print(f"JSX project entries: {jsx_proj}")

print("\n=== Skills ===")
html_skills = len(re.findall(r'skill-name|skill-tab|data-tab=', html))
print(f"HTML skill tabs/names: {html_skills}")

print("\n=== Testimonials HTML ===")
html_test = len(re.findall(r'testimonial-card|testimonial-author', html))
print(f"HTML testimonial cards: {html_test}")
