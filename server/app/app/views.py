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
                id,
                user,
                title,
                color_gradient,
                font
            FROM vibe_rooms
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
                id,
                created_by as user,
                title,
                color_gradient,
                font
            FROM vibe_rooms
            WHERE user = %s
        """, [user_id])
    
        response_data = {}
        response_data['result'] = dictfetchall(cursor)

    return HttpResponse(json.dumps(response_data), content_type='application/json')

def vibe_room_room_id(request, room_id):
    with connection.cursor() as cursor:
        cursor.execute(
            """
            SELECT
                id,
                created_by as user,
                title,
                color_gradient,
                font
            FROM vibe_rooms
            WHERE id = %s
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
    request_data = json.loads(request.body)
    user = authenticate(username=request_data.get('username', ''), password=request_data.get('password', ''))
    if user is not None:
        # Sign in User! Celebrations!
        with connection.cursor() as cursor:
            cursor.execute(
                """
                SELECT *
                FROM users 
                WHERE username = %s
            """, [user.username])

            user_info = dictfetchall(cursor)

        return HttpResponse(json.dumps({
            'username': user.username,
            'email': user.email,
            'f_name': user_info[0]['f_name'],
            'l_name': user_info[0]['l_name']
        }), content_type='application/json')
    else:
        # Oopsy!
        return HttpResponse(json.dumps('Oopsy!'), content_type='application/json')
    
    
    