import os
import re

directory = 'src'
replacements = {
    r'var\(--color-primary-(dark|light|deeper)\)': 'var(--color-primary)',
    r'var\(--color-secondary-(dark|light)\)': 'var(--color-secondary)',
    r'var\(--color-surface-(alt|warm)\)': 'var(--color-surface)',
    r'var\(--color-text-muted\)': 'var(--color-text)',
    r'var\(--color-background\)': 'var(--color-bg)',
    r'var\(--color-text-main\)': 'var(--color-text)',
    r'var\(--color-white\)': 'var(--color-bg)',
    r'#1[cC]2023': 'var(--color-primary)',
    r'#4[aA]535[aA]': 'var(--color-primary)',
    r'#121517': 'var(--color-primary)',
    r'#[dD][bB][aA][eE]4[eE]': 'var(--color-secondary)',
    r'#[aA]57[dD]2[bB]': 'var(--color-secondary)',
    r'#[fF]2[fF]2[eE][dD]': 'var(--color-bg)',
    r'#[fF][fF][fF][fF][fF][fF]': 'var(--color-bg)',
    r'#606060': 'var(--color-text)',
    r'white': 'var(--color-bg)' # Only in specific contexts maybe? We will hold off on blindly replacing 'white'.
}

for root, _, files in os.walk(directory):
    for file in files:
        if file.endswith('.css') or file.endswith('.tsx'):
            filepath = os.path.join(root, file)
            with open(filepath, 'r') as f:
                content = f.read()
            
            new_content = content
            for pattern, repl in replacements.items():
                if pattern != 'white':
                    new_content = re.sub(pattern, repl, new_content)
            
            if new_content != content:
                with open(filepath, 'w') as f:
                    f.write(new_content)
                print(f"Updated {filepath}")
