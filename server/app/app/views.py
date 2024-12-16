import json
from django.http import JsonResponse
from app.models import *
from django.db import connection


# >>> Person.objects.raw(
# ...     """
# ...     SELECT first AS first_name,
# ...            last AS last_name,
# ...            bd AS birth_date,
# ...            pk AS id,
# ...     FROM some_other_table
# ...     """
# ... )
# class VibeRoom(models.Model):
#     id = models.IntegerField()
#     user_id = models.IntegerField()
#     title = models.TextField()
#     color_gradient = models.TextField()
#     fonts = models.TextField()
def vibe_rooms(request):
    with connection.cursor() as cursor:
        cursor.execute(
            """
            SELECT
                vb.id as id,
                vb.user_id as user_id,
                ri.title as title,
                ri.color_gradient as color_gradient,
                ri.font as fonts
            FROM vibe_rooms as vb
            JOIN room_info as ri on ri.vibe_room_id = vb.id
        """, [])
    print(connection.cursor().fetchall())
    return connection.cursor().fetchall()
    # data = VibeRoom.objects.raw(
        # """
        # SELECT
        #     vb.id as id,
        #     vb.user_id as user_id,
        #     ri.title as title,
        #     ri.color_gradient as color_gradient,
        #     ri.font as fonts
        # FROM vibe_rooms as vb
        # JOIN room_info as ri on ri.vibe_room_id = vb.id
        # """
    # )
    # print('Data: ', data)
    # response = json.dumps(data)
    # print('Response: ', response)

def vibe_room_user_id(user_id):
    return None

def vibe_room_room_id():
    return None

def song():
    return None

def media():
    return None