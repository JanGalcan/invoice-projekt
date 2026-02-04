from rest_framework.generics import ListAPIView
from rest_framework import status
from rest_framework.response import Response
from ..serializers import InvoiceSerializer
from ..models import Invoice, Person
from ..services.invoices_service import InvoicesService

class PurchaseListView(ListAPIView):
    serializer_class = InvoiceSerializer
    queryset = Invoice.objects.all()

    def get_queryset(self):
        buyer_id = self.request.GET.get('buyer_id')
        identificationNumber = self.kwargs.get('identificationNumber')
        product = self.request.GET.get('product')
        minPrice = self.request.GET.get('minPrice')
        maxPrice = self.request.GET.get('maxPrice')
        limit = self.request.GET.get('limit')

        try:
            queryset = InvoicesService.filter_invoices(
                buyer_id=buyer_id,
                identification=identificationNumber,
                product=product,
                minPrice=minPrice,
                maxPrice=maxPrice,
                limit=limit
            )
        except ValueError as e:
            self.raise_exception(status.HTTP_400_BAD_REQUEST, str(e))
        print(list(queryset.values()))
        return queryset