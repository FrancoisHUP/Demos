import json
import csv

# Replace 'input.json' with the path to your JSON file
input_file = 'translated_words.json'
# Replace 'output.csv' with the desired path for the output CSV file
output_file = 'translated_words.csv'

# Load the JSON data
with open(input_file, 'r', encoding='utf-8') as f:
    data = json.load(f)

# Open the CSV file for writing
with open(output_file, 'w', newline='', encoding='utf-8') as f:
    writer = csv.writer(f)
    # Write the header
    writer.writerow(['english', 'french'])
    
    # Write the data
    for item in data:
        writer.writerow([item['word'], item['translation']])

print(f"Data has been written to {output_file}")
