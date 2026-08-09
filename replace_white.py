import os
import glob

for root, dirs, files in os.walk('src/pages'):
    for file in files:
        if file.endswith('.css') or file.endswith('.tsx'):
            filepath = os.path.join(root, file)
            with open(filepath, 'r') as f:
                content = f.read()
            
            if 'var(--color-white)' in content or '#151515' in content:
                content = content.replace('var(--color-white)', 'var(--color-primary)')
                content = content.replace('#151515', 'var(--color-surface)')
                with open(filepath, 'w') as f:
                    f.write(content)
                print(f"Updated {filepath}")
