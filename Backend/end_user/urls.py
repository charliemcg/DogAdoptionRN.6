from django.conf.urls import url, include
from . import views
from rest_framework import routers

router = routers.DefaultRouter()
router.register('end_user', views.endUserView)

urlpatterns = [
    url('', include(router.urls))
]
