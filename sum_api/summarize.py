# import necessary libraries
import string
import numpy as np
from sklearn.cluster import KMeans
from gensim.models import KeyedVectors
from sklearn.metrics import pairwise_distances_argmin_min


def load_vector():
    '''Load pretrained word embedding'''
    model = KeyedVectors.load_word2vec_format("./emb_256.txt")
    return model


def preprocess(text):
    '''preprocess text to remove punctuations and newline characters'''
    sentences = text.split(u"।")
    sentences = [x.translate(str.maketrans(
        '\n\xa0', '  ', string.punctuation)).strip() for x in sentences]
    return sentences


def vectorize(sentences, embedding):
    '''create vectors from sentences using word2vec embedding'''
    X = []
    vocab = embedding.key_to_index
    wc = 0
    for sentence in sentences:
        words = sentence.split(" ")
        wc += len(words)
        sent_vec = np.zeros((embedding.vector_size))
        for word in words:
            if word in vocab:
                sent_vec += embedding[word]
        X.append(sent_vec)
    return X, wc


def summary(X, lines=5):
    '''create clusters of related sentences, get most closest from cluster sentences
   Returns index of choosen sentences and order of sentences
   '''
    n_clusters = lines
    kmeans = KMeans(n_clusters=n_clusters, max_iter=7, n_init="auto")
    kmeans = kmeans.fit(X)

    print("No. of iterations: ", kmeans.n_iter_)
    # print(kmeans.labels_) # gives cluster for each sentence
    avg_pos = []
    for j in range(n_clusters):
        idx = np.where(kmeans.labels_ == j)
        # average position of sentences in a cluster
        avg_pos.append(np.mean(idx))
    # return index and distance of distance from cluster centroid
    closest, _ = pairwise_distances_argmin_min(kmeans.cluster_centers_, X)
    # ordered selected sentences based on average position of each cluster
    ordering = sorted(range(n_clusters), key=lambda k: avg_pos[k])

    return closest, ordering


def get_summary(text: str, embedding, n=5):
    '''Get summary of Nepali text
    text: Original Text
    embedding: word2vec embedding vector
    n = No of sentences to get as suumary
    '''

    processed_text = preprocess(text)
    vec_input, wc = vectorize(processed_text, embedding)
    sents_idx, sents_order = summary(vec_input, 10)
    raw_sents = text.split(u"।")
    result = ""
    count = 0
    max_sent = int(wc/4)

    for x in sents_order:
        sel_sent = raw_sents[sents_idx[x]]
        count += len(sel_sent.split(" "))
        result += sel_sent + u"।"
        if count > max_sent:
            break

    return result
