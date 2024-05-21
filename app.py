# from dotenv import load_dotenv
# import os
# from requests import post, get
# import json
#
# #ENCODE
# import base64
#
# #HTML
# from flask import Flask, render_template, send_from_directory
#
# app = Flask(__name__)
# load_dotenv()
#
# client_id = os.getenv("CLIENT_ID")
# client_secret = os.getenv("CLIENT_SECRET")
#
# def get_token():
#     auth_string = client_id + ":" + client_secret
#     auth_bytes = auth_string.encode("utf-8")
#     auth_base64 = str(base64.b64encode(auth_bytes), "utf-8")
#
#     url = "https://accounts.spotify.com/api/token"
#     headers = {
#         "Authorization": "Basic " + auth_base64,
#         "Content-Type": "application/x-www-form-urlencoded"
#     }
#     data = {"grant_type": "client_credentials"}
#     result = post(url, headers=headers, data=data)
#     json_result = json.loads(result.content)
#     token = json_result["access_token"]
#     return token
#
# def get_auth_header(token):
#     return {"Authorization": "Bearer " + token}
#
#
# def search_for_artists(token, artist_name):
#     url = "https://api.spotify.com/v1/search"
#     headers = get_auth_header(token)
#     query = f"?q={artist_name}&type=artist&limit=1"
#
#     query_url = url + query
#     result = get(query_url, headers=headers)
#     json_result = json.loads(result.content)["artists"]["items"]
#
#     if len(json_result) == 0:
#         print("No artist with this name exists...")
#         return None
#
#     return json_result[0]
#
#
# def get_songs_by_artist(token, artist_id):
#     url = f"https://api.spotify.com/v1/artists/{artist_id}/top-tracks?country=PL"
#     headers = get_auth_header(token)
#     result = get(url, headers=headers)
#     json_result = json.loads(result.content)["tracks"]
#     return json_result
#
# @app.route('/')
# def home():
#     return "<h1>Welcome to the Spotify Top Songs App</h1><p>Use the URL format /artist_name to get top songs of the artist.</p>"
#
#
# @app.route('/<artist_name>')
# def index(artist_name):
#     token = get_token()
#     artist = search_for_artists(token, artist_name)
#     if artist is None:
#         return "Artist not found", 404
#
#     artist_id = artist["id"]
#     songs = get_songs_by_artist(token, artist_id)
#     return render_template('index.html', songs=songs)
#
# @app.route('/favicon.ico')
# def favicon():
#     return send_from_directory(os.path.join(app.root_path, 'static'),
#                                'favicon.ico', mimetype='image/vnd.microsoft.icon')
#
# if __name__ == '__main__':
#     app.run(debug=True)
#
# # token = get_token()
# # result = search_for_artists(token, "The Weeknd")
# # artist_id = result["id"]
# #
# # songs = get_songs_by_artist(token, artist_id)


from flask import Flask, render_template, send_from_directory, request, redirect, url_for
from dotenv import load_dotenv
import os
from requests import post, get
import json
import base64

app = Flask(__name__)

load_dotenv()

client_id = os.getenv("CLIENT_ID")
client_secret = os.getenv("CLIENT_SECRET")

def get_token():
    auth_string = client_id + ":" + client_secret
    auth_bytes = auth_string.encode("utf-8")
    auth_base64 = str(base64.b64encode(auth_bytes), "utf-8")

    url = "https://accounts.spotify.com/api/token"
    headers = {
        "Authorization": "Basic " + auth_base64,
        "Content-Type": "application/x-www-form-urlencoded"
    }
    data = {"grant_type": "client_credentials"}
    result = post(url, headers=headers, data=data)
    json_result = json.loads(result.content)
    token = json_result["access_token"]
    return token

def get_auth_header(token):
    return {"Authorization": "Bearer " + token}

def search_for_artists(token, artist_name):
    url = "https://api.spotify.com/v1/search"
    headers = get_auth_header(token)
    query = f"?q={artist_name}&type=artist&limit=1"

    query_url = url + query
    result = get(query_url, headers=headers)
    json_result = json.loads(result.content)["artists"]["items"]

    if len(json_result) == 0:
        print("No artist with this name exists...")
        return None

    return json_result[0]

def get_songs_by_artist(token, artist_id):
    url = f"https://api.spotify.com/v1/artists/{artist_id}/top-tracks?country=PL"
    headers = get_auth_header(token)
    result = get(url, headers=headers)
    json_result = json.loads(result.content)["tracks"]
    return json_result

@app.route('/', methods=['GET', 'POST'])
def home():
    if request.method == 'POST':
        artist_name = request.form['artist_name']
        if artist_name:
            encoded_artist_name = artist_name.replace(' ', '_')
            return redirect(url_for('index', artist_name=encoded_artist_name))
    return render_template('home.html')

@app.route('/<artist_name>')
def index(artist_name):
    token = get_token()
    artist = search_for_artists(token, artist_name)
    if artist is None:
        return "Artist not found", 404

    artist_id = artist["id"]
    songs = get_songs_by_artist(token, artist_id)
    return render_template('index.html', songs=songs)

@app.route('/favicon.ico')
def favicon():
    return send_from_directory(os.path.join(app.root_path, 'static'),
                               'favicon.ico', mimetype='image/vnd.microsoft.icon')

if __name__ == '__main__':
    app.run(debug=True)
