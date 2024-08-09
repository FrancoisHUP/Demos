import os
from openai import OpenAI
import requests
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Define the API key and vector store ID
api_key = 'sk-...'

def get_openai_client():
    # Get the API key from the environment variables
    api_key = os.getenv('OPENAI_API_KEY')
    
    # Check if the API key is found
    if api_key is None:
        raise ValueError("API key not found. Please set it in the .env file.")
    
    # Set the OpenAI API key in the environment
    os.environ['OPENAI_API_KEY'] = api_key
    
    # Initialize and return the OpenAI client
    return OpenAI()

def create_vector_store_openai(client, name, directory_path, batch_size=50):
    """
    This creates a vector store in the OpenAI server at: https://platform.openai.com/storage/
    """
    # Create a vector store
    vector_store = client.beta.vector_stores.create(name=name)

    # List all files in the directory
    file_paths = [os.path.join(directory_path, file) for file in os.listdir(directory_path) if os.path.isfile(os.path.join(directory_path, file))]
    print("Uploading", len(file_paths), "files in batch of ", batch_size, "...")

    # Split the files into batches of batch_size
    for i in range(0, len(file_paths), batch_size):
        batch_paths = file_paths[i:i + batch_size]

        # Ready the files for upload to OpenAI
        file_streams = [open(path, "rb") for path in batch_paths]

        # Use the upload and poll SDK helper to upload the files, add them to the vector store,
        # and poll the status of the file batch for completion.
        file_batch = client.beta.vector_stores.file_batches.upload_and_poll(
            vector_store_id=vector_store.id, files=file_streams
        )

        # You can print the status and the file counts of the batch to see the result of this operation.
        print(batch_size, "/", len(file_paths), ": status : ", file_batch.status, "counts: ",file_batch.file_counts )

        # Close the file streams
        for file_stream in file_streams:
            file_stream.close()

    print("Vector store created! id:", vector_store.id)
    return vector_store


def list_file_from_vector_store(client, vs):    
    # Retrieve all files
    files = list_all_files(vs.id)
    files_data={}
    # Retrieve and print file names
    for file in files:
        file_metadata = client.files.retrieve(file_id=file['id'])
        files_data[file_metadata.id] = file_metadata.filename
        # print(f"File ID: {file_metadata.id}, File Name: {file_metadata.filename}")
    print("File ID:" , files[0]['id'],  "File Name: ", files_data[files[0]['id']])

# Function to list all files in the vector store
def list_all_files(vector_store_id):
    all_files = []
    limit = 100  # The number of files to retrieve per request
    last_id = ""

    headers = {
        'Authorization': f'Bearer {api_key}',
        'Content-Type': 'application/json',
        'OpenAI-Beta': 'assistants=v2'
    }

    params =  {
        'limit': limit,
    }

    while True:

        if last_id :
            params['after'] = last_id

        response = requests.get(
            f'https://api.openai.com/v1/vector_stores/{vector_store_id}/files',
            headers=headers,
            params=params
        )

        if response.status_code != 200:
            print(f"Error: {response.status_code}, {response.text}")
            break

        data = response.json()

        all_files.extend(data['data'])

        if data["has_more"]:
            last_id=data["last_id"]
        else:
            break

    return all_files
