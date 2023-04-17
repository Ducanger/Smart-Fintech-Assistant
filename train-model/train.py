import pandas as pd
import joblib
import re
from underthesea import word_tokenize
from lightgbm import LGBMClassifier
from sklearn.model_selection import StratifiedKFold
from sklearn.feature_extraction.text import TfidfVectorizer, CountVectorizer
from sklearn.metrics import accuracy_score, f1_score, confusion_matrix, precision_score, recall_score

def get_metrics(y_test, y_pred_proba):
    m0 = accuracy_score(y_test, y_pred_proba>=0.5)
    m1 = precision_score(y_test, y_pred_proba>=0.5)
    m2 = recall_score(y_test, y_pred_proba>=0.5)
    m3 = f1_score(y_test, y_pred_proba>=0.5, average='macro')
    m4 = confusion_matrix(y_test, y_pred_proba>=0.5)
    print(f"{'Accuracy:': <15}{round(m0,4): >5}")
    print(f"{'Precision:': <15}{round(m1,4): >5}")
    print(f"{'Recall:': <15}{round(m2,4): >5}")
    print(f"{'F1:': <15}{round(m3,4): >5}")
    print(f'Confussion-matrix:\n{m4}\n')
    return m0, m1, m2 ,m3

bank_data = open('data/bank.txt', "r", encoding='utf-8')

def check_bank(text):
    for l in bank_data:
        bank = l.strip().split(', ')
        for i in range(1, len(bank)):
            text = text.replace(" "+bank[i]+" ", " tên_ngân_hàng ")
    return text

def preprocess(text):
    text = text.lower()
    text = " " + text + " "
    text = text.replace(" ck ", " chuyển_khoản ").replace(" k ", " không ").replace(" tk ", " tài_khoản ").replace(" stk ", " số_tài_khoản ")
    text = check_bank(text=text)
    text = re.sub(r"\d{9,14}", "số_tài_khoản", text)
    text = re.sub(r"\d{1,10}k", "số_tiền", text)
    text = word_tokenize(text, format="text")
    return text.strip()

def run():
    df = pd.read_csv("data/mess.csv")
    df['text_preprocessed'] = df['text'].apply(lambda z: preprocess(z))

    kf = StratifiedKFold(n_splits=5, random_state=42, shuffle=True)
    acc, pre, recall, f1 = [], [], [], []
    for train_idx, test_idx in kf.split(df, df['label']):
        train, test = df.iloc[train_idx], df.iloc[test_idx]
        tfidf = CountVectorizer(ngram_range=(1,1)) #TfidfVectorizer(ngram_range=(1,1))
        X_train = tfidf.fit_transform(train['text_preprocessed']).astype("float32")
        # joblib.dump(tfidf, "../deploy/model_predict/tfidf.pkl")
        X_test = tfidf.transform(test['text_preprocessed']).astype("float32")
        y_train = train['label']
        y_test = test['label']

        model = LGBMClassifier()
        model.fit(X_train, y_train)
        # joblib.dump(model, "../deploy/model_predict/model.pkl")
        y_pred_proba = model.predict_proba(X_test) [:,1]
        _acc, _pre, _recall, _f1 = get_metrics(y_test, y_pred_proba)
        acc.append(_acc), pre.append(_pre), recall.append(_recall), f1.append(_f1)
        print("-"*50)

    print(f"{'Average Accuracy:': <25}{round(sum(acc)/5, 4): >5}")
    print(f"{'Average Precision:': <25}{round(sum(pre)/5,4): >5}")
    print(f"{'Average Recall:': <25}{round(sum(recall)/5,4): >5}")
    print(f"{'Average F1:': <25}{round(sum(f1)/5,4): >5}")

if __name__ == '__main__':
    run()


