from rest_framework.generics import ListAPIView
from rest_framework import status
from ..models import Invoice, Person

from ..serializers import InvoiceSerializer

from ..services.invoices_service import InvoicesService


class SalesListView(ListAPIView):
    serializer_class = InvoiceSerializer
    queryset = Invoice.objects.all()

    def get_queryset(self):
        seller_id = self.request.GET.get('seller_id')
        identificationNumber = self.kwargs.get('identificationNumber')
        product = self.request.GET.get('product')
        minPrice = self.request.GET.get('minPrice')
        maxPrice = self.request.GET.get('maxPrice')
        limit = self.request.GET.get('limit')

        try:
            queryset = InvoicesService.filter_invoices(
                seller_id=seller_id,
                identification=identificationNumber,
                product=product,
                minPrice=minPrice,
                maxPrice=maxPrice,
                limit=limit
            )
        except ValueError as e:
            self.raise_exception(status.HTTP_400_BAD_REQUEST, str(e))

        return queryset