import os
import pandas as pd
import requests

def load_data_from_csv(file_path):
    """Load data from a CSV file."""
    if os.path.exists(file_path):
        return pd.read_csv(file_path)
    else:
        raise FileNotFoundError(f"The file {file_path} does not exist.")

def scrape_data(url):
    """Scrape data from a given URL."""
    response = requests.get(url)
    if response.status_code == 200:
        return response.text
    else:
        raise Exception(f"Failed to scrape data from {url} with status code {response.status_code}")

def query_database(query, connection):
    """Query data from a database."""
    return pd.read_sql(query, connection)

def load_data_from_json(file_path):
    """Load data from a JSON file."""
    if os.path.exists(file_path):
        return pd.read_json(file_path)
    else:
        raise FileNotFoundError(f"The file {file_path} does not exist.")

def collect_data(source_type, source_info):
    """Collect data based on the source type."""
    if source_type == 'csv':
        return load_data_from_csv(source_info)
    elif source_type == 'json':
        return load_data_from_json(source_info)
    elif source_type == 'url':
        return scrape_data(source_info)
    elif source_type == 'database':
        # Assuming source_info is a tuple (query, connection)
        return query_database(source_info[0], source_info[1])
    else:
        raise ValueError("Unsupported source type. Use 'csv', 'json', 'url', or 'database'.")