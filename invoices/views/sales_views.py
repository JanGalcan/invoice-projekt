from rest_framework.generics import ListAPIView
from rest_framework import status
from ..models import Invoice, Person

from ..serializers import InvoiceSerializer

from ..services.invoices_service import InvoicesService


class SalesListView(ListAPIView):
    serializer_class = InvoiceSerializer

    def get_queryset(self):
        identificationNumber = self.kwargs.get("identificationNumber")

        return Invoice.objects.filter(
            seller__identificationNumber=identificationNumber
        )