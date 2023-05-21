from flask import Flask, request, make_response
import os

from summarize import get_summary, load_vector

app = Flask(__name__)
embedding = load_vector()


@app.route("/summary", methods=['POST'])
def summarize():
    """Return summarized text"""
    try:
        text = request.form['text']
        summary = get_summary(text, embedding)
        response = make_response(summary, 200)
        response.mimetype = 'text/plain'
        return response
    except Exception as exp:
        response = make_response(
            "यस लेखको लागि हामीलाई सारांश उपलब्ध छैन", 200)
        response.mimetype = 'text/plain'
        return response


@app.route("/")
def home():
    """Default endpoints gives some messages"""
    return {"msg": "Nepali News Summarizer."}


if __name__ == "__main__":
    app.run(host=os.environ.get('HOST') or '127.0.0.1',
            port=os.environ.get('PORT') or 5000)
