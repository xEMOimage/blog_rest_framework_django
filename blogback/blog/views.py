from rest_framework.response import Response
from rest_framework import permissions
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView,RetrieveAPIView
from .models import BlogPost
from .serializers import BlogPostSerializer

class BlogPostListView(ListAPIView):
    queryset = BlogPost.objects.order_by('-date_created')
    serializer_class = BlogPostSerializer
    lookup_field = 'slug'
    permissions_classes = (permissions.AllowAny,)


class BlogPostDetailView(RetrieveAPIView):
    querySet = BlogPost.objects.order_by('-date_created')
    serializer_class = BlogPostSerializer
    lookup_field = 'slug'
    permissions_classes = (permissions.AllowAny,)

class BlogPostFeaturedView(ListAPIView):
    querySet = BlogPost.objects.all().filter(featured = True)
    serializer_class = BlogPostSerializer
    lookup_field = 'slug'
    permissions_classes = (permissions.AllowAny,)

class BlogPostCategoryView(APIView):
    serializer_class = BlogPostSerializer
    permissions_classes = (permissions.AllowAny,)
    def post(self,request,format=None):
        data = self.request.data
        category = data['category']
        querySet = BlogPost.objects.order_by('-date_created').filter(category__iexact = category)
        serializer = BlogPostSerializer(querySet,many=True)
        return Response(serializer.data)