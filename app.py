from flask import Flask, render_template, request, jsonify
import numpy as np
import pandas as pd

popular_df = pd.read_pickle('data/popular.pkl')
pt = pd.read_pickle('data/pt.pkl')
books = pd.read_pickle('data/books.pkl')
similarity_scores = pd.read_pickle('data/similarity_scores.pkl')

app = Flask(__name__)

@app.route('/')
def users():
    return render_template('users.html')

@app.route('/login')
def login():
    return render_template('login.html')

@app.route('/user_account')
def user_account():
    return render_template('user_account.html')

@app.route('/youbuteAPI')
def author_interviews():
    return render_template('youbuteAPI.html')

@app.route('/googlebook')
def googlebook():
    return render_template('googlebook.html')
@app.route('/wishlist')
def wishlist():
    return render_template('wishlist.html')

@app.route('/home')
def index():
    print(popular_df['Image-URL-M'].head(5).values)
    
    formatted_votes = [int(x) for x in popular_df['num_ratings'].values]
    formatted_ratings = [float(f"{x:.2f}") for x in popular_df['avg_rating'].values]
    
    return render_template('home.html',
                           book_name=list(popular_df['Book-Title'].values),
                           author=list(popular_df['Book-Author'].values),
                           image=list(popular_df['Image-URL-M'].values),
                           votes=formatted_votes,
                           rating=formatted_ratings
                           )
@app.route('/recommend')
def recommend_ui():
    return render_template('recommend.html')
@app.route('/autocomplete', methods=['GET'])
def autocomplete():
    search_term = request.args.get('q')
    matching_books = books[books['Book-Title'].str.contains(search_term, case=False, na=False)]
    matching_books = matching_books[matching_books['Book-Title'].isin(pt.index)]    
    unique_books = matching_books['Book-Title'].drop_duplicates().values.tolist()
    return jsonify(unique_books)


@app.route('/recommend_books', methods=['POST'])
def recommend():
    user_input = request.form.get('user_input')
    if user_input not in pt.index:
        return render_template('recommend.html', data=[], message="Book not found or no recommendations available.")
    index = np.where(pt.index == user_input)[0][0]
    similar_items = sorted(list(enumerate(similarity_scores[index])), key=lambda x: x[1], reverse=True)[1:9]
    data = []
    for i in similar_items:
        item = []
        temp_df = books[books['Book-Title'] == pt.index[i[0]]]
        item.extend(list(temp_df.drop_duplicates('Book-Title')['Book-Title'].values))
        item.extend(list(temp_df.drop_duplicates('Book-Title')['Book-Author'].values))
        item.extend(list(temp_df.drop_duplicates('Book-Title')['Image-URL-M'].values))
        data.append(item)
    print(data)
    return render_template('recommend.html', data=data, message="")
if __name__ == '__main__':
    app.run(debug=True)
