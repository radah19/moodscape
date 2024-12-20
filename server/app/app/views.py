import json
from django.http import JsonResponse
from django.http import HttpResponse
from app.models import *
from django.db import connection
from django.contrib.auth import authenticate

def dictfetchall(cursor):
    """
    Return all rows from a cursor as a dict.
    Assume the column names are unique.
    """
    columns = [col[0] for col in cursor.description]
    return [dict(zip(columns, row)) for row in cursor.fetchall()]


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

        response_data = {}
        response_data['result'] = dictfetchall(cursor)

    return HttpResponse(json.dumps(response_data), content_type='application/json')

def vibe_room_user_id(request, user_id):
    print('\nREQUEST: ', request, '\n')
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
            WHERE vb.user_id = %s
        """, [user_id])
    
        response_data = {}
        response_data['result'] = dictfetchall(cursor)

    return HttpResponse(json.dumps(response_data), content_type='application/json')

def vibe_room_room_id(request, room_id):
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
            WHERE vb.id = %s
        """, [room_id])

        response_data = {}
        response_data['result'] = dictfetchall(cursor)

    return HttpResponse(json.dumps(response_data), content_type='application/json')

def song(request, room_id):
    with connection.cursor() as cursor:
        cursor.execute(
            """
            SELECT *
            FROM song_links
            WHERE vibe_room_id = %s
        """, [room_id])

        response_data = {}
        response_data['result'] = dictfetchall(cursor)

    return HttpResponse(json.dumps(response_data), content_type='application/json')

def media(request, room_id):
    with connection.cursor() as cursor:
        cursor.execute(
            """
            SELECT *
            FROM media 
            WHERE vibe_room_id = %s
        """, [room_id])

        response_data = {}
        response_data['result'] = dictfetchall(cursor)

    return HttpResponse(json.dumps(response_data), content_type='application/json')

def auth(request):
    user = authenticate(username=request.GET.get('username', '-1'), password=request.GET.get('password', '-1'))

    if user is not None:
        # Sign in User! Celebrations!
        return HttpResponse(json.dumps({
            'username': user.username,
            'email': user.email
        }), content_type='application/json')
    else:
        # Oopsy!
        return HttpResponse(json.dumps('Oopsy!'), content_type='application/json')
    
    # print(json.dumps(response_data), '\n')
    