import json
from django.http import JsonResponse
from django.http import HttpResponse
from app.models import *
from django.db import connection

def dictfetchall(cursor):
    """
    Return all rows from a cursor as a dict.
    Assume the column names are unique.
    """
    columns = [col[0] for col in cursor.description]
    return [dict(zip(columns, row)) for row in cursor.fetchall()]

def vibe_rooms(request):
    print('\n------------------- ROOMS REQUESTED ------------------\n\n')

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
        # print('lalala: ', cursor.fetchall())

        response_data = {}
        response_data['result'] = dictfetchall(cursor)

    # print(response_data)
    # print(json.dumps(response_data))
    return HttpResponse(json.dumps(response_data), content_type='application/json')

def vibe_room_user_id(user_id):
    return None

def vibe_room_room_id():
    return None

def song():
    return None

def media():
    return None