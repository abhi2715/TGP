from PIL import Image

# Restore backup
import shutil
shutil.copy('public/shikhar-flyer.png.bak', 'public/shikhar-flyer.png')

img = Image.open('public/shikhar-flyer.png')
w, h = img.size

# Let's crop 350 pixels from the bottom instead. 
# It seems "Registration and selection" might be higher up.
crop_height = h - 350

cropped_img = img.crop((0, 0, w, crop_height))
cropped_img.save('public/shikhar-flyer.png')
print(f'Cropped to {w}x{crop_height}')
