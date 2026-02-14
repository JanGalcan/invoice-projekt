from ..models import Person
from django.db.models import Q

class PersonsService:
    @staticmethod
    def filter_persons(name=None, identification=None, city=None):
        queryset = Person.objects.all()

        if name:
            queryset = queryset.filter(name__icontains=name)

        if identification:
            queryset = queryset.filter(
                Q(identificationNumber__icontains=identification) |
                Q(taxNumber__icontains=identification)
            )

        if city:
            queryset = queryset.filter(city__icontains=city)

        return queryset
