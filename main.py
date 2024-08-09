import os
from types import SimpleNamespace

from pdfs import extract_pdfs, extract_pdf
from openai_vector_store import get_openai_client, create_vector_store_openai, list_file_from_vector_store

def run() :
    # extract_pdfs()

    # 1. call openai gpt4-min to get description of each file. Then push this to a vector store  
    # 2. retreive with colpali

    client = get_openai_client()
    vs = create_vector_store_openai(client, name="DEMO_pdfs_extractor", directory_path="out")
    # if you want to run only the "list_file_from_vector_store" function -> vs = SimpleNamespace(id="vs_...")
    list_file_from_vector_store(client, vs) 

def run2():
    pdf_path = "2404.16130v1.pdf"
    txt_output_path = "output.txt"
    text = extract_pdf(pdf_path)
    # Save
    with open(txt_output_path, "w", encoding="utf-8") as text_file:
        text_file.write(text)
    print(f"Text extracted and saved to {txt_output_path}")

if __name__ == "__main__" :
    run2()

