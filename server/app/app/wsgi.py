"""
WSGI config for app project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.1/howto/deployment/wsgi/
"""

import os
import sys

from django.core.wsgi import get_wsgi_application

sys.path.append('/app')
sys.path.append('/app/app')

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'app.app.settings')

application = get_wsgi_application()
