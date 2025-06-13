import json
import sys
import re

def clean_text(text: str) -> str:
    """
    Cleans the input text by removing non-alphanumeric characters and converting to lowercase.

    Args:
        text (str): The input text to clean.

    Returns:
        str: The cleaned text.
    """
    return re.sub('[^A-Za-z0-9]+', '', text.lower().strip())

def is_array_equal(source: list, key: list) -> bool:
    """
    Checks if two arrays are equal.

    Args:
        source (list): The first array.
        key (list): The second array.

    Returns:
        bool: True if the arrays are equal, False otherwise.
    """
    if len(source) != len(key):
        return False
    for i in range(len(source)):
        src = clean_text(source[i])
        k = clean_text(key[i])
        if src != k:
            return False
    return True

def extract_data_from_json(json_data: dict, phrase: str) -> list:
    """
    Extracts data from a JSON object based on the provided key.

    Args:
        json_data (dict): The JSON object to extract data from.
        phrase (str): The phrase to extract data for.

    Returns:
        list: A list of extracted data.
    """
    key_words = phrase.split(" ")
    key_len = len(key_words)
    results = []
    analyze_result = json_data.get("analyzeResult", {})

    for page in analyze_result.get("pages", []):
        words = page.get("words", [])
        texts = [w["content"] for w in words]
        # Slide a window over the words
        for i in range(len(texts) - key_len + 1):
            window = texts[i:i+key_len]
            if is_array_equal(window, key_words):
                # Combine polygons
                polygons = [words[j]["polygon"] for j in range(i, i+key_len)]
                confidences = [words[j]["confidence"] for j in range(i, i+key_len)]
                # Flatten all points
                min_x = polygons[0][0]
                min_y = polygons[0][1]
                max_x = polygons[key_len-1][4]
                max_y = polygons[key_len-1][5]
                confidence = (sum(confidences) / key_len).__round__(3)
                # print(f"min_x: {min_x}, min_y: {min_y}, max_x: {max_x}, max_y: {max_y}")
                # xs = []
                # ys = []
                # for poly in polygons:
                #     xs.extend(poly[::2])
                #     ys.extend(poly[1::2])
                # # Get bounding rectangle (min x/y, max x/y)
                # min_x, max_x = min(xs), max(xs)
                # min_y, max_y = min(ys), max(ys)
                # Output as rectangle polygon (clockwise)
                combined_polygon = [
                    min_x, min_y,
                    max_x, min_y,
                    max_x, max_y,
                    min_x, max_y
                ]
                results.append({
                    "page": page.get("pageNumber", 1),
                    "content": " ".join(window),
                    "confidence": confidence,
                    "polygon": combined_polygon
                })
    return results

if __name__ == "__main__":
    print("Extracting data from JSON...", sys.argv[1], sys.argv[2])
    if len(sys.argv) < 3:
        print("Usage: python extract.py <json_file> <phrase> <output_file>")
        sys.exit(1)

    json_file = sys.argv[1]
    phrase = sys.argv[2]
    output_file = sys.argv[3] if len(sys.argv) > 3 else "results.json"

    with open(json_file, "r") as f:
        json_data = json.load(f)
    
    results = extract_data_from_json(json_data, phrase)
    with(open(output_file, "w")) as f:
        json.dump(results, f, indent=2)
    print("Extraction complete. Results saved to results.json.")