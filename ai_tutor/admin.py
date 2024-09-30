from django.contrib import admin
from .models import *
from jsoneditor.forms import JSONEditor

class CourseAdmin(admin.ModelAdmin):
    formfield_overrides = {
        models.TextField: {'widget': JSONEditor},
    }

class ModuleAdmin(admin.ModelAdmin):
    list_display = ('topic', 'status')

    def formfield_for_manytomany(self, db_field, request, **kwargs):
        if db_field.name == "modules":
            kwargs["queryset"] = User.objects.filter(is_author=True)
        return super(ModuleAdmin, self).formfield_for_manytomany(db_field, request, **kwargs)

# Register your models here.
admin.site.register(Module,ModuleAdmin)
admin.site.register(Course)
# admin.site.register(Module)