from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, TextAreaField
from wtforms.validators import DataRequired, Length, ValidationError

def comment_field_empty(form, field):
    comment_body = field.data
    if len(comment_body) == 0:
        raise ValidationError('Please provide a comment.')

def comment_too_long(form, field):
    comment_body = field.data
    if len(comment_body) > 500:
        raise ValidationError('Comment is too long.')

class PostCommentForm(FlaskForm):
    user_id = StringField('User ID', validators=[DataRequired()])
    song_id = StringField('Song ID', validators=[DataRequired()])
    content = TextAreaField('Comment', validators=[DataRequired(), Length(min=1, max=500), comment_field_empty, comment_too_long])
    username = StringField('Username', validators=[DataRequired()])
    submit = SubmitField('Submit')

class EditCommentForm(FlaskForm):
    content = TextAreaField('Comment', validators=[DataRequired(), Length(min=1, max=500), comment_field_empty, comment_too_long])
