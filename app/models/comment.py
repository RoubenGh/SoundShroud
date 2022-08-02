from .db import db

class Comment(db.Model):
    __tablename__ = 'comments'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    song_id = db.Column(db.Integer, db.ForeignKey('songs.id'), nullable=False)
    username = db.Column(db.String(40), nullable=False)
    content = db.Column(db.String(500), nullable=False)
    created_at = db.Column(db.DateTime, default=db.func.now(), nullable=False)


    #RELATIONSHIPS
    user = db.relationship('User', back_populates='comment')
    song = db.relationship('Song', back_populates='comment')


def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'song_id': self.song_id,
            'username': self.username,
            'comment': self.comment,
            'created_at': self.created_at
        }
