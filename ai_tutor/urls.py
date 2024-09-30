from django.contrib import admin
from django.urls import path,include
from .views import *

urlpatterns = [
    path('api/courses/',courses),
    path('api/courses/createCourse', create_course, name='createCourse'),
    path('api/courses/coursedetails/<int:courseid>/', course_details, name='coursedetails'),
    path('api/courses/modules/<int:courseid>/', get_modules),
    path('auth/register/',register),
    path('auth/login/',login),
    path('openai/explain/', explain),
    path('openai/doubt/', doubt),
    path('openai/check/', check),
    path('openai/explainllm/',explainllm),
    path('openai/doubtllm/',doubtllm),
    path('openai/photollm/',photollm),
    path('quiz/quizapp/',quizapp),
]