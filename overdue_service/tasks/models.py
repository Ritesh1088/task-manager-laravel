from django.db import models

class Task(models.Model):
    STATUS_CHOICES = [
        ('PENDING','PENDING'),
        ('IN_PROGRESS','IN_PROGRESS'),
        ('DONE','DONE'),
        ('OVERDUE','OVERDUE'),
    ]

    title = models.CharField(max_length=255)
    status = models.CharField(max_length=50, choices=STATUS_CHOICES)
    due_date = models.DateField()

    def __str__(self):
        return self.title