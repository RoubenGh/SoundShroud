import boto3
import botocore
from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from sqlalchemy import desc
from app.models import User, db
from app.config import Config
from app.aws_s3 import *
from app.forms.edit_user_profile import UserForm

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
# @login_required
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
# @login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()

# @user_routes.route('/<int:id>/edit', methods=['PUT'])
# # @login_required
# def edit_user(id):

#     user = User.query.get(id)
#     user.bio = request.form.get('bio')
#     user.username = request.form.get('username')
#     print(user.to_dict(), '111111111111111111111111111')
#     if len(request.files) != 0:
#         file = request.files["file"]
#         file_url = upload_file_to_s3(file, Config.S3_BUCKET)
#         user.prof_pic_url = file_url

#     db.session.add(user)
#     db.session.commit()
#     return user.to_dict()

@user_routes.route('/<int:id>/edit', methods=['PUT'])
# @login_required
def edit_user(id):

    user = User.query.get(id)
    form = UserForm()
    user.username = form.username.data
    user.bio = form.bio.data
    # if (request.files):
    file = request.files["file"]
    file_url = upload_file_to_s3(file, Config.S3_BUCKET)
    user.prof_pic_url = file_url


    db.session.add(user)
    db.session.commit()
    return user.to_dict()

#delete specific user
@user_routes.route('/<int:id>', methods=['DELETE'])
# @login_required
def delete_user(id):
    user = User.query.get(id)
    db.session.delete(user)
    db.session.commit()
    return jsonify({'message': 'Your account has been removed.'})
