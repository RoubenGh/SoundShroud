from app.models import db, Comment

def seed_comments():
    comments = [
        {
            'user_id': 1,
            'song_id': 1,
            'username': 'Demo',
            'content': 'This is a comment',
            'created_at': '2020-01-01 00:00:00'
        },
        {
            'user_id': 1,
            'song_id': 1,
            'username': 'Demo',
            'content': 'This is a GREAT COMMENT',
            'created_at': '2020-01-01 00:00:00'
        },
        {
            'user_id': 1,
            'song_id': 1,
            'username': 'Demo',
            'content': 'This is an EVEN BETTER COMMENT',
            'created_at': '2020-01-01 00:00:00'
        }
    ]

    for comment in comments:
        db.session.add(Comment(**comment))
    db.session.commit()


def undo_comments():
    db.session.execute('TRUNCATE comments RESTART IDENTITY CASCADE;')
    db.session.commit()
