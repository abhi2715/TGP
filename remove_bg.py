from PIL import Image

def make_transparent(image_path):
    img = Image.open(image_path)
    img = img.convert("RGBA")
    datas = img.getdata()

    newData = []
    # Using a tolerance to catch near-white pixels
    for item in datas:
        # Check if the pixel is close to white
        if item[0] > 240 and item[1] > 240 and item[2] > 240:
            # Calculate alpha based on how close to white it is (anti-aliasing)
            # Pure white -> 0 alpha. 240 -> 255 alpha.
            # But simple transparency is fine for a white background if we just set it to 0
            # A better approach for antialiasing is to map white to transparent, 
            # and keep dark pixels solid.
            newData.append((255, 255, 255, 0))
        else:
            newData.append(item)

    img.putdata(newData)
    img.save(image_path, "PNG")

make_transparent("/Users/abhishekks/Desktop/The growth project/public/leadership_compass.png")
print("Background removed.")
