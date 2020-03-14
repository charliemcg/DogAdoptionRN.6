from django.conf.urls import url, include
from . import views
from rest_framework import routers

router = routers.DefaultRouter()
router.register('dog', views.dogView)

urlpatterns = [
    url('', include(router.urls))
]
