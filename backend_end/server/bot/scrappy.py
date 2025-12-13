import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin, urlparse
import os

# Define where you want to save images
STATIC_DIR = "static/icons"
DEFAULT_ICON = "static/icons/image.png"

# Ensure the directory exists when the app starts
os.makedirs(STATIC_DIR, exist_ok=True)

def get_website_icon(url):
    """
    Scrapes the URL to find the best possible icon link.
    """
    # 1. Ensure URL has protocol
    if not url.startswith(('http://', 'https://')):
        url = 'https://' + url

    try:
        response = requests.get(url, timeout=5, headers={'User-Agent': 'Mozilla/5.0'})
        response.raise_for_status()
        soup = BeautifulSoup(response.text, 'html.parser')

        # Priority list of tags
        icon_tags = [
            ('link', {'rel': 'apple-touch-icon'}),       
            ('link', {'rel': 'icon'}),                   
            ('link', {'rel': 'shortcut icon'}),          
            ('meta', {'property': 'og:image'})           
        ]

        icon_url = None

        # 2. Hunt for the icon
        for tag, attrs in icon_tags:
            element = soup.find(tag, attrs)
            if element:
                raw_url = element.get('href') or element.get('content')
                if raw_url:
                    icon_url = urljoin(url, raw_url)
                    print(f"[+] Found icon: {icon_url}")
                    break

        # 3. Fallback to /favicon.ico
        if not icon_url:
            parsed_url = urlparse(url)
            fallback = f"{parsed_url.scheme}://{parsed_url.netloc}/favicon.ico"
            # Quick check if it exists
            try:
                if requests.head(fallback, timeout=2).status_code == 200:
                    icon_url = fallback
                    print(f"[!] Using standard favicon: {icon_url}")
            except:
                pass

        return icon_url

    except Exception as e:
        print(f"[-] Error scraping {url}: {e}")
        return None

def download_and_save_icon(icon_url, filename_prefix):
    """
    Downloads the icon and saves it to static/icons/.
    Returns the relative path string for the database.
    """
    # 1. Handle cases where no URL was found
    if not icon_url:
        print("[-] No URL provided, using default.")
        return DEFAULT_ICON

    try:
        # 2. Download the image
        r = requests.get(icon_url, stream=True, timeout=10)
        if r.status_code == 200:
            # 3. Determine file extension safely
            ext = icon_url.split('.')[-1].split('?')[0].lower()
            if len(ext) > 4 or not ext.isalnum(): 
                ext = "png" # Safe default if extension is weird

            # 4. Construct the file path
            # Result: static/icons/facebook.png
            final_filename = f"{filename_prefix}.{ext}"
            file_path = os.path.join(STATIC_DIR, final_filename)

            # 5. Write file to disk
            with open(file_path, 'wb') as f:
                for chunk in r.iter_content(1024):
                    f.write(chunk)
            
            print(f"[SUCCESS] Saved to {file_path}")
            return file_path # <--- RETURN THIS for the database

    except Exception as e:
        print(f"[-] Error downloading file: {e}")

    # 6. Safety Net: Return default if download fails
    return DEFAULT_ICON