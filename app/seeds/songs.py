from app.models import db, Song

def seed_songs():
    songs = [
        {
            'user_id': 1,
            'song_url': 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            'title': 'The Sign',
            'created_at': '2020-01-01 00:00:00'
        },
        {
            'user_id': 1,
            'song_url': 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            'title': 'The Sign',
            'created_at': '2020-01-01 00:00:00'
        },
        {
            'user_id': 1,
            'song_url': 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            'title': 'The Sign',
            'created_at': '2020-01-01 00:00:00'
        }
    ]

    for song in songs:
        db.session.add(Song(**song))
    db.session.commit()
