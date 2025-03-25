from django.utils.functional import SimpleLazyObject
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.tokens import RefreshToken
from django.utils import timezone
from datetime import timedelta

def get_user(request):
    """
    Helper function to get the user from the JWT token.
    """
    user = None
    auth_header = request.headers.get('Authorization')
    
    if auth_header and auth_header.startswith('Bearer '):
        token = auth_header.split(' ')[1]
        try:
            jwt_auth = JWTAuthentication()
            validated_token = jwt_auth.get_validated_token(token)
            user = jwt_auth.get_user(validated_token)
        except Exception:
            pass
    
    return user

class JWTAuthenticationMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        # Only set the user if get_user returns a non-None value
        jwt_user = get_user(request)
        if jwt_user is not None:
            request.user = SimpleLazyObject(lambda: jwt_user)
        
        response = self.get_response(request)

        # Check if we need to refresh the token
        if hasattr(request, 'user') and request.user.is_authenticated:
            auth_header = request.headers.get('Authorization')
            if auth_header and auth_header.startswith('Bearer '):
                token = auth_header.split(' ')[1]
                try:
                    jwt_auth = JWTAuthentication()
                    validated_token = jwt_auth.get_validated_token(token)
                    
                    # If token is about to expire (less than 5 minutes remaining)
                    exp = validated_token['exp']
                    now = timezone.now()
                    remaining = exp - int(now.timestamp())
                    
                    if remaining < 300:  # 5 minutes
                        # Generate new token
                        refresh = RefreshToken.for_user(request.user)
                        response['X-New-Access-Token'] = str(refresh.access_token)
                        response['X-New-Refresh-Token'] = str(refresh)
                except Exception:
                    pass

        return response 