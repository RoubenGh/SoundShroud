from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError, Length

def title_limit(form, ,field):
    title = field.data
    if len(title) > 100:
        raise ValidationError('Title must be less than 100 characters')

class SongForm(FlaskForm):
    title = StringField('Title', validators=[DataRequired(), title_limit])
    song_url = StringField('Song URL', validators=[DataRequired()])
