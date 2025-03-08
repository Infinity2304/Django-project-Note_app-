from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Note
from .serializer import NoteSerializer

import logging

logger = logging.getLogger(__name__)

# Create your views here.

@api_view(['GET'])
def get_notes(request):
    notes = Note.objects.all()
    serializedData = NoteSerializer(notes, many=True).data
    return Response(serializedData)

@api_view(['POST'])
def create_notes(request):
    data = request.data
    serializer = NoteSerializer(data=data) 

    if serializer.is_valid():
        serializer.save()
        return Response({'message': 'Note added successfully'}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors  ,status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
def delete_note(request, pk):
    try:
        note = Note.objects.get(pk=pk)
    except Note.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    note.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)

    
    
    
    
