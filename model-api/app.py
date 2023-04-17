from flask import Flask, jsonify, request
import joblib
import re

model = joblib.load('model_predict/model.pkl')
tfidf = joblib.load('model_predict/tfidf.pkl')
word_tokenize = joblib.load('model_predict/underthesea.pkl')

def check_bank(text):
    bank_data = open('data/bank.txt', "r", encoding='utf-8')
    for l in bank_data:
        bank = l.strip().split(', ')
        for i in range(1, len(bank)):
            text = text.replace(" "+bank[i]+" ", " tên_ngân_hàng ")
    return text

def preprocess(text):
    text = text.lower()
    text = " " + text + " "
    text = text.replace(" ck ", " chuyển_khoản ").replace(" k ", " không ").replace(" tk ", " tài_khoản ").replace(" stk ", " số_tài_khoản ")
    text = check_bank(text)
    text = re.sub(r"\d{9,14}", "số_tài_khoản", text)
    text = re.sub(r"\d{1,10}k", "số_tiền", text)
    text = word_tokenize(text, format="text")
    return text

def pipeline(text):
    print(f'Raw text: \n {text} \n')
    text = preprocess(text)
    print(f'Preprocessed text: \n {text} \n')
    features = tfidf.transform([text]).astype("float32")
    proba = model.predict_proba(features) [:,1]
    pred = 0
    if (proba >= 0.5): pred = 1
    return pred

app = Flask(__name__)
  
@app.route('/', methods = ['GET', 'POST'])
def home():
    if(request.method == 'GET'):
  
        data = "hello world"
        return jsonify({'label': data})
  
  
@app.route('/home', methods = ['GET'])
def predict():
    text = request.args.get("mess")
    return jsonify({'label': pipeline(text)})
  
if __name__ == '__main__':
    app.run(debug = True)