from django.db import models

from datetime import datetime
from django.template.defaultfilters import slugify

class Categories(models.TextChoices):
    HEALTH = 'health'
    CULTURE = 'culture'
    BUSINESS = 'business'
    OIL = 'oil'
    SPORTS = 'sports'
    AGRICULTURE = 'agriculture'
    TRAVEL = 'travel'
    BLOG = 'Blog'

class BlogPost(models.Model):
    title = models.CharField(max_length=100)
    slug = models.SlugField()
    category = models.CharField(max_length=50, choices = Categories.choices,default=Categories.HEALTH)
    thumbnail = models.ImageField(upload_to='photos/%y/%m/%d/')
    excerpt = models.CharField(max_length=150)
    month = models.CharField(max_length=3)
    day = models.CharField(max_length=2)
    content = models.TextField()
    featured = models.BooleanField(default=False)
    date_created = models.DateTimeField(default = datetime.now,blank=True)

    def save(self,*args,**kwargs):
        original_slug = slugify(self.title)
        querySet = BlogPost.objects.all().filter(slug__iexact=original_slug).count()
        count =1
        slug = original_slug
        while(querySet):
            slug = original_slug+'-'+str(count)
            count +=1
            querySet = BlogPost.objects.all().filter(slug__iexact=slug).count()
        self.slug = slug
        if self.featured:
            try:
                temp = BlogPost.objects.get(featured=True)
                if self != temp:
                    temp.featured = False
                    temp.save()
            except BlogPost.DoesNotExist:
                pass
        super(BlogPost,self).save(*args,**kwargs)
    def __str__(self):
        return self.title

