from flask import Blueprint, request, jsonify, render_template
from flask_login import login_required, current_user
from datetime import datetime
from app.models import User, Image, Comment, db
from app.config import Config
from app.aws_s3 import *
from app.forms import image_form, comment_form

comment_routes = Blueprint('songs', __name__)

# GET ALL COMMENTS
@image_routes.route('/<int:id>/comments')
# @login_required
def get_all_comments(id):
    comments = Comment.query.filter_by(song_id=id).all()
    data = [comment.to_dict() for comment in comments]
    return {'comments' : data}

# GET SINGLE COMMENT
@image_routes.route('/<int:id>/comments/<int:comment_id>')
# @login_required
def get_single_comment(id, comment_id):
    comment = Comment.query.get(comment_id)
    return comment.to_dict()

# POST SINGLE COMMENT
@image_routes.route('/<int:id>', methods=['POST'])
# @login_required
def post_single_comment(id):
    form = comment_form.PostCommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        comment = Comment(
            user_id=form.user_id.data,
            song_id=form.song_id.data,
            content=form.content.data,
            created_at=datetime.now()
        )
        db.session.add(comment)
        db.session.commit()
        return comment.to_dict()


# EDIT A SINGLE COMMENT
@image_routes.route('/<int:id>/comments/<int:comment_id>', methods=['PUT'])
# @login_required
def edit_single_comment(id, comment_id):
    comment = Comment.query.get(comment_id)
    form = comment_form.EditCommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        comment.content = form.content.data
        comment.created_at = datetime.now()
        db.session.add(comment)
        db.session.commit()
        return comment.to_dict()

# DELETE A SINGLE COMMENT
@image_routes.route('/<int:id>/comments/<int:comment_id>', methods=['DELETE'])
# @login_required
def delete_single_comment(id, comment_id):
    comment = Comment.query.get(comment_id)
    db.session.delete(comment)
    db.session.commit()
    return comment.to_dict()
