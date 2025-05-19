from rest_framework import serializers
from datetime import datetime
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from .models import User
from .models import Post, Comment, File, Chat, Like, Notification
from .models import UserFollower


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        # Add custom claims
        token['user_id'] = user.id
        return token

    def validate(self, attrs):
        data = super().validate(attrs)
        # Add extra responses here
        data['user_id'] = self.user.id
        data['profile_picture_url'] = self.user.profile_picture.url if self.user.profile_picture else '/files/profile_pictures/default_profile.png'
        return data


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id",
                  "email",
                  "name",
                  "student_id",
                  "birthday_date",
                  "phone_number",
                  "profile_picture",
                  "faculty",
                  "department",
                  "field",
                  "graduation_year",
                  "job_title",
                  "working_company",
                  "work_experience",
                  "is_staff_member",
                  "password"
                  ]
        # extra_kwargs = {"password": {"read_only": True}, "email": {"read_only": True}}
        # extra_kwargs = {"password": {"write_only": True}}
        
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        if not instance.profile_picture:
            representation['profile_picture'] = 'http://127.0.0.1:8000/files/profile_pictures/default_profile.png'
        return representation

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user


class UserProfileFeedSerializer(serializers.ModelSerializer):
    followers_count = serializers.SerializerMethodField()
    following_count = serializers.SerializerMethodField()
    profile_picture_url = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = [
            'id',
            'name',
            'profile_picture_url',
            'job_title',
            'working_company',
            'followers_count',
            'following_count'
        ]

    def get_followers_count(self, obj):
        return UserFollower.objects.filter(user=obj).count()

    def get_following_count(self, obj):
        return UserFollower.objects.filter(follower=obj).count()

    def get_profile_picture_url(self, obj):
        if obj.profile_picture:
            return obj.profile_picture.url
        return '/files/profile_pictures/default_profile.png'


class FileSerializer(serializers.ModelSerializer):
    class Meta:
        model = File
        fields = ['id', 'post', 'file']

class FileListSerializer(serializers.ListSerializer):
    child = FileSerializer()

class FileUploadSerializer(serializers.Serializer):
    files = FileListSerializer()

    def create(self, validated_data):
        files_data = validated_data['files']
        created_files = []
        for file_data in files_data:
            created_file = File.objects.create(**file_data)
            created_files.append(created_file)
        return created_files


class PostSerializer(serializers.ModelSerializer):
    files = FileSerializer(many=True, read_only=True)
    likes_count = serializers.SerializerMethodField()
    is_liked = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = ["id", "author", "content", "created_at", "files", "likes_count", "is_liked"]
        extra_kwargs = {"author": {"read_only": True}}

    def get_likes_count(self, obj):
        return obj.likes.count()

    def get_is_liked(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            return obj.likes.filter(user=request.user).exists()
        return False

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ["id", "author", "post", "content", "created_at"]
        extra_kwargs = {"author": {"read_only": True},
                        "post":{"read_only": True}
                        }
        
class ChatUserSerializer(serializers.ModelSerializer):
    profile_picture = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ['id', 'name', 'profile_picture']

    def get_profile_picture(self, obj):
        if obj.profile_picture:
            return obj.profile_picture.url
        return '/files/profile_pictures/default_profile.png'  # Default profile picture URL

class ChatSerializer(serializers.ModelSerializer):
    participant_1 = ChatUserSerializer(read_only=True)
    participant_2 = ChatUserSerializer(read_only=True)
    
    class Meta:
        model = Chat
        fields = ["id", "messages", "participant_1", "participant_2", "created_at", "lastMessage"]
        extra_kwargs = {"participant_1": {"read_only": True}}

    def update(self, instance, validated_data):
        time = str(datetime.now())
        message = self.context['request'].data.get("message")
        
        if message == "":
            return None
        
        new_message = {
            "sender": self.context['request'].user.id,
            "body": message
        }
        instance.messages[time] = new_message
        instance.lastMessage = message  # Store only the message text
        instance.save()
        
        # Return updated chat data through serializer
        updated_chat = Chat.objects.get(pk=instance.pk)
        return ChatSerializer(updated_chat).data
    
    
class UserFollowerSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserFollower
        fields = ["id", "user", "follower"]
        

class LikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Like
        fields = ['id', 'user', 'post', 'created_at']
        extra_kwargs = {
            'user': {'read_only': True},
            'post': {'read_only': True}
        }
        

class NotificationSerializer(serializers.ModelSerializer):
    sender_name = serializers.CharField(source='sender.name', read_only=True)
    sender_profile_picture = serializers.SerializerMethodField()
    post_id = serializers.SerializerMethodField()

    class Meta:
        model = Notification
        fields = [
            'id',
            'sender',
            'sender_name',
            'sender_profile_picture',
            'notification_type',
            'content',
            'is_read',
            'created_at',
            'post_id'
        ]
        read_only_fields = ['sender', 'notification_type', 'content', 'is_read', 'created_at']

    def get_sender_profile_picture(self, obj):
        if obj.sender.profile_picture:
            return obj.sender.profile_picture.url
        return 'http://127.0.0.1:8000/files/profile_pictures/default_profile.png'

    def get_post_id(self, obj):
        if obj.notification_type == 'comment' and obj.post:
            return obj.post.id
        return None
        
