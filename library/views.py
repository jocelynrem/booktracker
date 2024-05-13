import requests
from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import Book
from .serializers import BookSerializer


class BookViewSet(viewsets.ModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BookSerializer

    def create(self, request, *args, **kwargs):
        isbn = request.data.get("isbn")
        if not isbn:
            return Response(
                {"error": "ISBN is required"}, status=status.HTTP_400_BAD_REQUEST
            )

        # Fetch book details from Open Library API
        url = f"https://openlibrary.org/api/books?bibkeys=ISBN:{isbn}&format=json&jscmd=data"
        response = requests.get(url)
        print(f"API Response: {response.json()}")  # Debug log for API response

        if response.status_code == 200:
            data = response.json().get(f"ISBN:{isbn}", {})
            if data:
                title = data.get("title", "Unknown Title")
                authors = (
                    ", ".join([author["name"] for author in data.get("authors", [])])
                    or "Unknown Author"
                )
            else:
                title = "Unknown Title"
                authors = "Unknown Author"
        else:
            title = "Unknown Title"
            authors = "Unknown Author"

        book_data = {
            "isbn": isbn,
            "title": title,
            "author": authors,
        }

        book, created = Book.objects.get_or_create(isbn=isbn, defaults=book_data)

        if not created:
            return Response(
                {"error": "Book already exists"}, status=status.HTTP_400_BAD_REQUEST
            )

        serializer = self.get_serializer(book)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
