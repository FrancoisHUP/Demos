import fitz  # PyMuPDF
import numpy as np
from PIL import Image
import os

def convert_pdf_page_to_img(page, zoom=2):
    # Set zoom factor (optional, default is 2)
    mat = fitz.Matrix(zoom, zoom)
    # Render page to a Pixmap (image)
    pix = page.get_pixmap(matrix=mat)
    # Convert Pixmap to NumPy array
    img_array = np.frombuffer(pix.samples, dtype=np.uint8).reshape(pix.height, pix.width, pix.n)
    return img_array

def extract_pdf_data(file_path, file_name, output_dir='out/'):
    file_full_path = os.path.join(file_path, file_name)
    with fitz.open(file_full_path) as pdf_document:
        num_pages = pdf_document.page_count
        for page_number in range(num_pages):
            page = pdf_document[page_number]
            # Convert pdf page to img
            img_array = convert_pdf_page_to_img(page)
            
            # Convert NumPy array to image
            image = Image.fromarray(img_array)
            
            # Ensure the output directory exists
            os.makedirs(output_dir, exist_ok=True)
            
            # Save image to directory out/
            output_file_path = os.path.join(output_dir, f"{os.path.splitext(file_name)[0]}_page_{page_number + 1}.png")
            image.save(output_file_path)
            print(f"Saved image to {output_file_path}")

def extract_pdfs(file_path = 'dataset/'):
    # List all files in the directory
    file_list = os.listdir(file_path)
    print("Files to process:", len(file_list))

    start_index = 0 
    stop_index = len(file_list)

    # Loop through each file and process it
    for i, file_name in enumerate(file_list[start_index:stop_index], start=start_index):
        if file_name.endswith('.pdf'):
            extract_pdf_data(file_path, file_name)

def extract_pdf(pdf_path):
    document = fitz.open(pdf_path)
    all_text = ""

    for page_num in range(len(document)):
        page = document.load_page(page_num)
        text = page.get_text()
        all_text += f"Page {page_num + 1}:\n{text}\n"
    
    return all_text


