from PIL import Image

img = Image.open('public/shikhar-flyer.png')
w, h = img.size

# We want to crop out the bottom part. Let's assume it's the bottom 160 pixels.
# The user wants to crop out the "Registration and Selection" block which is at the bottom.
crop_height = h - 180 

cropped_img = img.crop((0, 0, w, crop_height))
cropped_img.save('public/shikhar-flyer.png')
print(f'Cropped to {w}x{crop_height}')
