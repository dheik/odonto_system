from django.db import models
from django.contrib.auth.models import User

class Note(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="notes")
    file = models.FileField(upload_to='notes_files/', null=True, blank=True)
    file_name = models.CharField(max_length=255, null=True, blank=True)

    def __str__(self):
        return self.title
