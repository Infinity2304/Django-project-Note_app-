from django.urls import path
from .views import get_notes,create_notes,delete_note

urlpatterns = [
    path('notes/',get_notes, name='get_notes'),
    path('notes/create',create_notes, name='create_notes'),
    path('notes/<int:pk>',delete_note, name='delete_notes'),
]