# from djongo import models
# from django import forms

# Create your models here.
# var courseSchema = new Schema({
#   name: String,
#   about: String,
#   ratingNum: Number,
#   rating: Number,
#   image: String,
#   what_learn: [String],
#   currrent_module_num: { type: Number, default: 0 },
#   modules: [
#     {
#       topic: String,
#       status: { type: Number, default: 0 }, //0->not completed 1->completed
#       conversation: [{}],
#     },
#   ],

# class Modules(models.Model):
#     id = models.BigIntegerField(primary_key=True)
#     topic = models.CharField(max_length=200)
#     status = models.BooleanField(default=False)
#     class Meta:
#         managed=False
        
#     def __str__(self):
#         return self.topic

# class ModulesForm(forms.ModelForm):
#     class Meta:
#         model = Modules
#         fields = (
#             'topic', 'status'
#         )

# class Course(models.Model):
#     name = models.CharField(max_length=200)
#     about = models.TextField()
#     ratingNum = models.FloatField()
#     rating = models.IntegerField()
#     image = models.URLField()
#     what_learn = models.TextField()
#     modules = models.ArrayField(model_container=Modules,
#                                 model_form_class=ModulesForm)

# objects = models.DjongoManager()
# from djongo import models

# class Modules(models.Model):
#     topic = models.CharField(max_length=200)
#     status = models.BooleanField(default=False)
    
#     class Meta:
#         abstract = True

from django.db import models
from django.contrib.auth.hashers import make_password
from django.contrib.postgres.fields import ArrayField,JSONField

class Module(models.Model):
    topic = models.CharField(max_length=200)
    status = models.BooleanField(default=False)
    conversation= ArrayField(
        models.JSONField(),
        blank=True,
        null=True,
        default=list,
    )

class Course(models.Model):
    name = models.CharField(max_length=200)
    about = models.TextField()
    ratingNum = models.FloatField()
    rating = models.IntegerField()
    image = models.URLField()
    what_learn = models.TextField()
    modules = models.ManyToManyField(Module)

class User(models.Model):
    email = models.EmailField()
    phoneNo = models.CharField(max_length=20)
    password = models.CharField(max_length=256)
    firstName = models.CharField(max_length=200)
    lastName = models.CharField(max_length=200)

    def set_password(self, raw_password):
        self.password = make_password(raw_password)