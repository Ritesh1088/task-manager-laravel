from datetime import date
from django.http import HttpResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Task

# 🔹 Home Page (optional but useful)
def home(request):
    return HttpResponse("Django Running Successfully")

# 🔹 Overdue API (FINAL VERSION)
@api_view(['GET'])
def check_overdue(request):
    tasks = Task.objects.all()

    updated = 0

    for t in tasks:
        # ✅ Safe check
        if t.due_date and t.due_date < date.today():
            
            # ❌ Skip if already DONE or OVERDUE
            if t.status not in ['DONE', 'OVERDUE']:
                t.status = 'OVERDUE'
                t.save()
                updated += 1

    return Response({
        "status": True,
        "message": "Overdue tasks updated successfully",
        "updated_tasks": updated
    })