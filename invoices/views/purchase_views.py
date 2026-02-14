from rest_framework.generics import ListAPIView
from rest_framework import status
from rest_framework.response import Response
from ..serializers import InvoiceSerializer
from ..models import Invoice, Person
from ..services.invoices_service import InvoicesService

class PurchaseListView(ListAPIView):
    serializer_class = InvoiceSerializer

    def get_queryset(self):
        identificationNumber = self.kwargs.get("identificationNumber")

        queryset = Invoice.objects.filter(
            buyer__identificationNumber=identificationNumber
        )

        product = self.request.GET.get("product")
        min_price = self.request.GET.get("min_price")
        max_price = self.request.GET.get("max_price")
        limit = self.request.GET.get("limit")

        if product:
            queryset = queryset.filter(product__icontains=product)

        if min_price:
            queryset = queryset.filter(price__gte=min_price)

        if max_price:
            queryset = queryset.filter(price__lte=max_price)

        if limit:
            queryset = queryset[:int(limit)]

        return queryset