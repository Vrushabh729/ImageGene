from flask import Flask, render_template, request, jsonify
import openai
import os

app = Flask(__name__)

# Set your OpenAI API key
openai.api_key = os.getenv("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")

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/generate', methods=['POST'])
def generate():
    data = request.get_json()
    prompt = data.get('prompt', '')

    if prompt:
        try:
            response = openai.Image.create(
                prompt=prompt,
                n=1,
                size='512x512'
            )
            image_url = response['data'][0]['url']
            return jsonify({'image_url': image_url})
        except Exception as e:
            return jsonify({'error': str(e)}), 500
    else:
        return jsonify({'error': 'No prompt provided'}), 400

if __name__ == '__main__':
    app.run(debug=True)
