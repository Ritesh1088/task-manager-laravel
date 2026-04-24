from django.urls import path
from .views import check_overdue

urlpatterns = [
    path('check-overdue/', check_overdue),
]