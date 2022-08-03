from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError
from app.models import Song



class EditSongForm(FlaskForm):
    title = StringField('title', validators=[DataRequired()])
