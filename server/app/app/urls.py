"""
URL configuration for app project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from app import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('vibe_rooms/', views.vibe_rooms, name='vibe_rooms'),
    path('vibe_rooms_user_id/<str:username>/', views.vibe_room_user_id, name='vibe_room_user_id'),
    path('vibe_rooms_room_id/<int:room_id>/', views.vibe_room_room_id, name='vibe_room'),
    path('song_links/<int:room_id>/', views.song, name='song'),
    path('media/<int:room_id>/', views.media),
    path("auth/", views.auth),
    path("create_account/", views.create_account)
]
