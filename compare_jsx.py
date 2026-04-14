import re

jsx = open(r'c:\Users\THE EYE INFORMATIQUE\Desktop\Updated Portfolio\brancodex-next\components\Projects.jsx', encoding='utf-8').read()
titles = re.findall(r"title:\s*['\"](.+?)['\"]", jsx)
print('Projects in JSX:')
for t in titles:
    print(' -', t)
print('Total:', len(titles))

# Also look at services
svc = open(r'c:\Users\THE EYE INFORMATIQUE\Desktop\Updated Portfolio\brancodex-next\components\Services.jsx', encoding='utf-8').read()
svc_titles = re.findall(r"title:\s*['\"](.+?)['\"]", svc)
print('\nServices in JSX:')
for t in svc_titles:
    print(' -', t)

# Also check ResultsStrip
results = open(r'c:\Users\THE EYE INFORMATIQUE\Desktop\Updated Portfolio\brancodex-next\components\ResultsStrip.jsx', encoding='utf-8').read()
result_values = re.findall(r"value:\s*['\"](.+?)['\"]", results)
print('\nResults in JSX:')
for t in result_values:
    print(' -', t)
