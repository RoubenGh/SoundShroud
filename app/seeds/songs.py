from app.models import db, Song

def seed_songs():
    songs = [
        {
            'user_id': 1,
            'song_url': 'https://soundshroud.s3.amazonaws.com/The Beatles - Help!.mp3',
            'title': 'Help!',
            'created_at': '2020-01-01 00:00:00'
        }
    ]

    for song in songs:
        db.session.add(Song(**song))
    db.session.commit()

def undo_songs():
    db.session.execute('TRUNCATE songs RESTART IDENTITY CASCADE;')
    db.session.commit()
