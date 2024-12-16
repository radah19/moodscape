from django.db import models

class User(models.Model):
    id = models.IntegerField(primary_key=True)
    username = models.CharField(max_length=255)
    f_name = models.CharField(max_length=255)
    l_name = models.CharField(max_length=255)

class VibeRoom(models.Model):
    id = models.IntegerField(primary_key=True)
    user_id = models.IntegerField()
    title = models.CharField(max_length=255)
    color_gradient = models.CharField(max_length=255)
    fonts = models.CharField(max_length=255)
    
class SongLink(models.Model):
    id = models.IntegerField(primary_key=True)
    vibe_room_id = models.IntegerField()
    song_link = models.CharField(max_length=255)

class Media(models.Model):
    id = models.IntegerField(primary_key=True)
    vibe_room_id = models.IntegerField()
    img_link = models.CharField(max_length=255)
    txt = models.TextField()