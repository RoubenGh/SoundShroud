import boto3
import botocore

from flask import Blueprint, request, jsonify, render_template
from flask_login import login_required, current_user
from datetime import datetime
from app.models import User, Song, Comment, db
from app.config import Config
from app.forms import EditSongForm, UploadSongForm, PostCommentForm, EditCommentForm
from app.aws_s3 import *

song_routes = Blueprint('songs', __name__)



# GET ALL SONGS
@song_routes.route('/discover')
# @login_required
def get_all_songs():
    songs = Song.query.all()
    data = [song.to_dict() for song in songs]
    return {'songs' : data}


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
        print('THIS IS MY FILE ------', file)
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


# DELETE SINGLE SONG
@song_routes.route('/delete/<int:id>', methods=['DELETE'])
# @login_required
def delete_song(id):
    song = Song.query.get(id)
    old_song = song.to_dict()
    db.session.delete(song)
    db.session.commit()
    return old_song


##############################COMMENTS######################################

# GET ALL COMMENTS
@song_routes.route('/<int:id>/comments')
# @login_required
def get_all_comments(id):
    comments = Comment.query.filter_by(song_id=id).all()
    data = [comment.to_dict() for comment in comments]
    return {'comments' : data}

# GET SINGLE COMMENT
@song_routes.route('/<int:id>/comments/<int:comment_id>')
# @login_required
def get_single_comment(id, comment_id):
    song = Song.query.get(id)
    comment = Comment.query.get(comment_id)
    return comment.to_dict()

# POST SINGLE COMMENT
@song_routes.route('/<int:id>', methods=['POST'])
# @login_required
def post_single_comment(id):
    form = PostCommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    print('THIS IS MY FORM DATA', form.data)
    if form.validate_on_submit():
        comment = Comment(
            user_id=form.user_id.data,
            song_id=form.song_id.data,
            content=form.content.data,
            username=form.username.data,
            created_at=datetime.now()
        )
        db.session.add(comment)
        db.session.commit()
        print('THIS IS MY COMMENT', comment.to_dict())
        return comment.to_dict()


# EDIT A SINGLE COMMENT
@song_routes.route('/<int:id>/comments/<int:comment_id>', methods=['PUT'])
# @login_required
def edit_single_comment(id, comment_id):
    comment = Comment.query.get(comment_id)
    form = EditCommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        comment.content = form.content.data
        comment.created_at = datetime.now()
        db.session.add(comment)
        db.session.commit()
        return comment.to_dict()

# DELETE A SINGLE COMMENT
@song_routes.route('/<int:id>/comments/<int:comment_id>', methods=['DELETE'])
# @login_required
def delete_single_comment(id, comment_id):
    comment = Comment.query.get(comment_id)
    db.session.delete(comment)
    db.session.commit()
    return comment.to_dict()
