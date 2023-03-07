from flask import Flask, jsonify, request

from summarize import get_summary, load_vector

app = Flask(__name__)
embedding = load_vector()


@app.route("/summary", methods=['POST'])
def summarize():
    """Return summarized text"""
    text = request.json['text']
    summary = get_summary(text, embedding)
    return {"summary": summary}


@app.route("/")
def home():
    """Default endpoints gives some messages"""
    return {"msg": "Nepali News Summarizer."}


if __name__ == "__main__":
    app.run()
