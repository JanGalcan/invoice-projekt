from rest_framework import viewsets, status
from rest_framework.response import Response

from ..serializers import PersonSerializer
from ..models import Person
from django.db.models import Q



class PersonViewSet(viewsets.ModelViewSet):
    queryset = Person.objects.filter(hidden=False)
    serializer_class = PersonSerializer

    def list(self, request):
        queryset = Person.objects.filter(hidden=False)

        name = request.GET.get("name")
        identification = request.GET.get("identification")
        city = request.GET.get("city")

        if name:
            queryset = queryset.filter(name__icontains=name)

        if identification:
            queryset = queryset.filter(
                Q(identificationNumber__icontains=identification) |
                Q(taxNumber__icontains=identification)
            )

        if city:
            queryset = queryset.filter(city__icontains=city)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)



    def update(self, request, *args, **kwargs):
        instance = self.get_object()

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        instance.hidden = True
        instance.save(update_fields=["hidden"])

        validated_data = serializer.validated_data
        validated_data.pop('hidden', None)
        new_instance = Person.objects.create(**validated_data, hidden=False)

        output_serializer = self.get_serializer(new_instance)
        return Response(output_serializer.data, status=status.HTTP_200_OK)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.hidden = True
        instance.save(update_fields=["hidden"])
        return Response(status=status.HTTP_204_NO_CONTENT)




