from .db import db

class Song(db.Model):
    __tablename__ = 'songs'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    song_url = db.Column(db.String(255), nullable=False)
    title = db.Column(db.String(100), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=db.func.now())

    #RELATIONSHIP
    user = db.relationship('User', back_populates='song')
    comment = db.relationship('Comment', back_populates='song', cascade='all, delete-orphan')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'song_url': self.song_url,
            'title': self.title,
            'created_at': self.created_at,
            'user_info': self.user.to_dict()
        }
