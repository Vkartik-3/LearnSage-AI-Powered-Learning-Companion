from django.shortcuts import render

# Create your views here.
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

from .models import Course
from .serializers import *
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.hashers import check_password, make_password
from rest_framework_simplejwt.tokens import RefreshToken
from .models import User
import os


from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Course
from django.core import serializers

from dotenv import load_dotenv

load_dotenv()
# @api_view(['GET','POST'])
# def courses(request):
#     if request.method == 'GET':
#         data = Course.objects.all()
#         serializer = CourseSerializer(data, many=True)
#         return Response(serializer.data)
    
#     elif request.method=='POST':
#         serializer=CourseSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data,status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


import logging
logger = logging.getLogger(__name__)

@api_view(['POST'])
def register(request):
    email = request.data['email']
    password = request.data['password']
    firstName = request.data['firstName']
    lastName = request.data['lastName']
    phoneNo = request.data['phoneNo']

    if User.objects.filter(email=email).exists():
        return Response({"error": "Each account must have a unique mail"}, status=409)
    
    hashed_password = make_password(password)
    user = User.objects.create(email=email, password=hashed_password, firstName=firstName, lastName=lastName, phoneNo=phoneNo)
    user.save()

    return Response({"message": "User created"}, status=201)

@api_view(['POST'])
def login(request):
    email = request.data['email']
    password = request.data['password']

    try:
        user = User.objects.get(email=email)
    except User.DoesNotExist:
        return Response({"error": "Auth failed"}, status=401)

    if not check_password(password, user.password):
        return Response({"error": "Auth failed"}, status=401)

    refresh = RefreshToken.for_user(user)
    return Response({"message": "Auth successful", "token": str(refresh), "id": user.id})


from rest_framework.decorators import api_view
from rest_framework.response import Response
from openai import OpenAI
from googleapiclient.discovery import build
import json

def search_youtube_videos(api_key, query, max_results=5):
    # Create a YouTube API service
    youtube = build('youtube', 'v3', developerKey=api_key)

    # Search for videos based on the query
    search_response = youtube.search().list(
        q=query,
        type='video',
        part='id,snippet',
        maxResults=max_results
    ).execute()

    # Extract video details from the search response
    videos = []
    for search_result in search_response.get('items', []):
        video_id = search_result['id']['videoId']
        video_title = search_result['snippet']['title']
        video_url = f'https://www.youtube.com/watch?v={video_id}'
        videos.append({'title': video_title, 'url': video_url})

    return videos



@api_view(['POST'])
def explain(request):
    topic = request.data['topic']
    
    # search_query = 'types of salts'
    result_videos = search_youtube_videos(api_key, topic)
    if 'topic' not in request.data:
        return Response({"error": "Topic is missing in request data"}, status=400)
    prompt = f"Provide a question related to ${topic}?Give answer to the same question?Give a hint to the same question that does not completely solve the question In json format with keys question,answer and hint"

    try:
        openai = OpenAI(api_key='Add_Api_Key')
        completion = openai.chat.completions.create(
  model = 'gpt-3.5-turbo',
  messages = [
    {'role': 'user', 'content': prompt}
  ],
  max_tokens=1000,
  temperature = 0,
)
        obj = json.loads(completion.choices[0].message.content)

        return Response({
            "message": "Successfully Completed",
            "data": {
                "question": obj["question"],
                "answer": obj["answer"],
                "hint": obj["hint"],
            },
            "result_video": result_videos,
        })
    except Exception as e:
        return Response({"error": str(e)}, status=500)

@api_view(['POST'])
def doubt(request):
    logger.info('Request data: %s', request.data)
    topic = request.data['topic']
    doubt = request.data['doubt']
    prompt = f"With respect to {topic} {doubt}"

    try:
        openai = OpenAI(api_key='Add_Api_Key')
        completion = openai.chat.completions.create(
  model = 'gpt-3.5-turbo',
  messages = [
    {'role': 'user', 'content': prompt}
  ],
  temperature = 0  )

        return Response({
            "message": "Successfully Completed",
            "data": {
                "question": doubt,
                "answer": completion.choices[0].message.content,
            }
        })
    except Exception as e:
        return Response({"error": str(e)}, status=500)

@api_view(['POST'])
def check(request):
    topic = request.data['topic']
    question = request.data['question']
    answer = request.data['answer']
    prompt = f"With respect to {topic} considering the question : {question} is the answer: {answer} correct or incorrect, answer in one word"

    try:
        openai = OpenAI(api_key='Add_Api_Key')
        completion = openai.create_completion(
            model="text-davinci-003",
            prompt=prompt,
            max_tokens=120,
        )

        return Response({
            "message": "Successfully Completed",
            "data": {
                "answer_status": completion.choices[0].text,
            }
        })
    except Exception as e:
        return Response({"error": str(e)}, status=500)


from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Course,Module

@api_view(['GET'])
def courses(request):
    data = Course.objects.all()
    serializer = CourseSerializer(data, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def create_course(request):
        serializer=CourseSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def course_details(request, courseid):
    try:
        course = Course.objects.get(pk=courseid)
        course_json = serializers.serialize('json', [course])
        modules = [{'id': module.id, 'topic': module.topic, 'status':module.status} for module in course.modules.all()]
        data = {
            "message": "course retrieved",
            "coursedetails": {'pk': course.id, 'name': course.name, 'about':course.about, 'ratingNum': course.ratingNum, 'rating': course.rating, 'image':course.image, 'what_learn': course.what_learn, 'modules': [{'id': module.id, 'topic': module.topic, 'status':module.status, 'conversation': module.conversation} for module in course.modules.all()]},
            "modules": modules
        }
        return Response(data)
    except Course.DoesNotExist:
        return Response({"error": "Course not found"}, status=404)

@api_view(['GET'])
def get_modules(request, courseid):
    try:
        course = Course.objects.get(pk=courseid)
        modules = [{'id': module.id, 'topic': module.topic, 'status':module.status} for module in course.modules.all()]
        data = {'name': course.name, 'modules': modules}
        return Response(data)
    except Course.DoesNotExist:
        return Response({"error": "Course does not exist"}, status=404)


# [{\"model\": \"ai_tutor.course\", \"pk\": 1, \"fields\": {\"name\": \"Science\", \"about\": \"age\", \"ratingNum\": 4.5, \"rating\": 555, \"image\": \"https://i.ibb.co/WsL3B0N/MERN.webp\", \"what_learn\": \"agds\", \"modules\": [1]}}]
    

from langchain_community.llms import OpenAI
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain
from langchain.chains import SequentialChain

def search_youtube_videos(api_key, query, max_results=5):
    # Create a YouTube API service
    youtube = build('youtube', 'v3', developerKey=api_key)

    # Search for videos based on the query
    search_response = youtube.search().list(
        q=query,
        type='video',
        part='id,snippet',
        maxResults=max_results
    ).execute()

    # Extract video details from the search response
    videos = []
    for search_result in search_response.get('items', []):
        video_id = search_result['id']['videoId']
        video_title = search_result['snippet']['title']
        video_url = f'https://www.youtube.com/watch?v={video_id}'
        videos.append({'title': video_title, 'url': video_url})

    return videos

# @api_view(['POST'])
# def explainllm(request):
#     topic = request.data['topic']
#     difficulty = request.data['difficulty']
#    
#     query = "{topic} in Chemistry"

#     result_videos = search_youtube_videos(api_key, query)
#     try:
#         llm = OpenAI(temperature=0.7, openai_api_key='')
#         prompt_template_exp = PromptTemplate(
#             input_variables = ['topic', 'difficulty'],
#             template = """- Provide a comprehensive explanation of the {topic} with attention to detail.
# - Paraphrase your answers to enhance clarity and cater to the understanding level of a {difficulty}-level student.
# - Incorporate real-world examples to facilitate better comprehension, ensuring relevance and avoiding hypothetical analogies.
# - Include proper chemical equations where applicable to reinforce the understanding of the topic.
# - Strictly limit the discussion to the specified topic, avoiding any extraneous words or interactions."""
#         )
#         name_chain = LLMChain(llm=llm, prompt=prompt_template_exp,output_key="explanation")
#         response = name_chain({'topic': topic, 'difficulty': difficulty})

#         return Response({
#             "message": "Successfully Completed",
#             "data": response['explanation'],
#             "video": result_videos,
#         }
#         )
#     except Exception as e:
#         return Response({"error": str(e)}, status=500)



from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain


@api_view(['POST'])
def explainllm(request):
    topic = request.data['topic']
    difficulty = request.data['difficulty']
    
    query = topic+"in Chemistry"

    result_videos = search_youtube_videos(api_key, query)
    try:
        llm = ChatGoogleGenerativeAI(model="gemini-pro", temperature=0.5, google_api_key=GOOGLE_GEMINI_KEY)
        
        temp="""Provide a comprehensive explanation of the {topic} with attention to detail.\n\nParaphrase your answers to enhance clarity and cater to the understanding level of a {difficulty}-level student.\n\nIncorporate real-world examples to facilitate better comprehension, ensuring relevance and avoiding hypothetical analogies\n\nInclude proper chemical equations where applicable to reinforce the understanding of the topic\n\nStrictly limit the discussion to the specified topic, avoiding any extraneous words or interactions\n\nProvide in Markdown format."""
        prompt = PromptTemplate.from_template(temp)

        chain = LLMChain(llm=llm, prompt=prompt)
        # name_chain = LLMChain(llm=llm, prompt=prompt,output_key="explanation")
        response = chain({'topic': topic, 'difficulty': difficulty})

        return Response({
            "message": "Successfully Completed",
            "data": response["text"],
            "video": result_videos[:-2],
        }
        )
    except Exception as e:
        return Response({"error": str(e)}, status=500)
# - Give answer in text format to paste in a html file and add new line yourself  
# - Provide a comprehensive explanation of the {topic} with attention to detail.
# - Paraphrase your answers to enhance clarity and cater to the understanding level of a {difficulty}-level student.
# - Incorporate real-world examples to facilitate better comprehension, ensuring relevance and avoiding hypothetical analogies.
# - Include proper chemical equations where applicable to reinforce the understanding of the topic.
# - Strictly limit the discussion to the specified topic, avoiding any extraneous words or interactions.
# - Give answer in a paragraph format to paste in a html file and add new line yourself avoid using text formatting
# -To avoid issues with emphasis characters like "***" or "**", please refrain from using them for formatting text.
@api_view(['POST'])
def doubtllm(request):
    topic=request.data['topic']
    doubt=request.data['doubt']
    try:
        llm = ChatGoogleGenerativeAI(model="gemini-pro", temperature=0.5, google_api_key=GOOGLE_GEMINI_KEY)
        prompt = PromptTemplate.from_template("Chemistry Doubt Solver for Students\n\nYou are a dedicated chemistry doubt solver for students up to 10th standard. Please ensure your responses are tailored to the chemistry subject and follow the guidelines below:\n\nPolite Refusal: Politely refuse to answer any questions that are not related to the subject of chemistry.\n\nTopic Relevance: Provide answers strictly related to chemistry. Do not deviate from the subject.\n\nDirect Answers: If the question is direct, give a concise and direct answer without unnecessary elaboration.\n\nElaboration when Needed: Elaborate on the topic only when necessary for better understanding. Keep explanations simple and basic.\n\nExamples and Equations: Whenever possible, provide related examples and chemical equations to enhance comprehension.\n\nWord Limit: Keep responses within a range of 50 to 100 words. Paraphrase answers as needed.\n\nRemember to maintain a positive and encouraging tone while assisting students with their chemistry-related queries.\n\n the doubt is {doubt}")
        
        chain = LLMChain(llm=llm, prompt=prompt)
        response = chain({'topic': topic, 'doubt': doubt})
        return Response({
            "message": "Successfully Completed",
            "data": {
                "question": doubt,
                "answer": response["text"],
            }
        })
    
    except Exception as e:
        return Response({"error": str(e)}, status=500) 
    
from langchain_core.messages import HumanMessage

@api_view(['POST'])
def photollm(request):
    topic=request.data['topic']
    photo=request.data['photo']
    try:
        llm = ChatGoogleGenerativeAI(model="gemini-pro-vision", temperature=0.5, google_api_key=GOOGLE_GEMINI_KEY)
        message = HumanMessage(
    content=[
        {
            "type": "text",
            "text": "What's in this image?, Solve if any question or reaction is asked with proper chemical reaction related to {topic}, Provide a detailed description as well",
        },  # You can optionally provide text parts
        {"type": "image_url", "image_url": photo},
    ]
    )
        res = llm.invoke([message])
        response = res.content
        return Response({
            "message": "Successfully Completed",
            "data": {
                "description": response,
            }
        })        
    except Exception as e:
        return Response({"error": str(e)}, status=500) 

import json
@api_view(['POST'])
def quizapp(request):
    num=request.data['num']
    difficulty=request.data['difficulty']
    topic=request.data['topic']
    try:
        llm = ChatGoogleGenerativeAI(model="gemini-pro", temperature=0.5, google_api_key=GOOGLE_GEMINI_KEY)
        prompt = PromptTemplate.from_template(""" You are an expert quiz maker for technical fields. Let's think step by step and create a quiz with {num} {difficulty} questions about the following concept/content: {topic}.
     The format of the quiz could be one of the following : {{"question":[{{"id":0,"question":"","options":["Option 1", "Option 2", "Option 3", "Option 4"],"answer":0}}]}} 
 """)
        
        chain = LLMChain(llm=llm, prompt=prompt)
        response = chain({'num': num, 'difficulty': difficulty, 'topic': topic})
        parsed_data = json.loads(response["text"])
        return Response({
            "message": "Successfully Completed",
            "data": {
                # "question": topic,
                "answer" : response["text"],
                "json" : parsed_data,
            }
        })
    
    except Exception as e:
        return Response({"error": str(e)}, status=500) 

