from flask import Flask, request, jsonify, send_file, send_from_directory
from flask_cors import CORS
import pandas as pd
import os

app = Flask(__name__, static_folder='build')
CORS(app)

@app.route('/upload', methods=['POST'])
def upload_files():
    if 'files' not in request.files:
        return jsonify({'error': 'No files provided'}), 400

    files = request.files.getlist('files')
    dataframes = []

    for file in files:
        try:
            df = pd.read_csv(file)
            df['Source File'] = file.filename
            dataframes.append(df)
        except Exception as e:
            return jsonify({'error': str(e)}), 500

    try:
        combined_df = pd.concat(dataframes, ignore_index=True)
        output_path = 'combined_spreadsheet.xlsx'
        combined_df.to_excel(output_path, index=False)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

    return send_file(output_path, as_attachment=True, download_name='combined_spreadsheet.xlsx')

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')

if __name__ == '__main__':
    app.run(debug=True, port=5000, host='0.0.0.0')

