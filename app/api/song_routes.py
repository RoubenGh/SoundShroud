import boto3
import botocore

from flask import Blueprint, request, jsonify, render_template
from flask_login import login_required, current_user
from datetime import datetime
from app.models import User, Song, Comment, db
from app.config import Config
from app.forms import EditSongForm, UploadSongForm
from app.aws_s3 import *

song_routes = Blueprint('songs', __name__)



# GET ALL SONGS
@song_routes.route('/discover')
# @login_required
def get_all_songs():
    songs = Song.query.all()
    data = [song.to_dict() for song in songs]
    return {'songs' : data}


# GET SINGLE IMAGE
@song_routes.route('/<int:id>')
# @login_required
def get_single_song(id):
    song = Song.query.get(id)
    return song.to_dict()

# POST A SONG
@song_routes.route('/upload', methods=['POST'])
# @login_required
def post_song():
    form = UploadSongForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    print(form.user_id.data, '000000000000000000000')
    if form.validate_on_submit():
        if "file" not in request.files:
            return "No user_file key in request.files"
        file = request.files["file"]
        if file:
            file_url = upload_file_to_s3(file, Config.S3_BUCKET)
            file = Song(
                user_id=form.user_id.data,
                title=form.title.data,
                song_url=file_url
            )
            db.session.add(file)
            db.session.commit()
            return file.to_dict()
        else:
            return 'No File Attached!'


# EDIT SINGLE SONG TITLE
@song_routes.route('/edit/<int:id>', methods=['PUT'])
# @login_required
def edit_song(id):
    form = EditSongForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        song = Song.query.get(id)
        song.title = form.title.data
        db.session.commit()
        return song.to_dict()
