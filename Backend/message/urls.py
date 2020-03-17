
from django.conf.urls import url, include
from . import views
from rest_framework import routers

router = routers.DefaultRouter()
router.register('message', views.messageView)

urlpatterns = [
    url('', include(router.urls))
]
