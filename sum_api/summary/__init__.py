import logging

import azure.functions as func

from summarize import load_vector, get_summary
embedding = load_vector()

def main(req: func.HttpRequest) -> func.HttpResponse:
    try:
        form = req.form

        text=None
        if form:
            text = form['text']

        if text:
            summary = get_summary(text, embedding)
            return func.HttpResponse(summary)
        else:
            raise
    except:
        return func.HttpResponse(
             "सारांश उत्पन्न भएको छैन",
             status_code=200
        )
