
from rest_framework import viewsets, status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from ..serializers import InvoiceSerializer
from ..serializers import Invoice
from ..services.invoices_service import InvoicesService

class InvoiceViewSet(viewsets.ModelViewSet):
    queryset = Invoice.objects.all()
    serializer_class = InvoiceSerializer

    def list(self, request):
        print(request.GET)
        buyer_id = request.GET.get('buyer_id')
        seller_id = request.GET.get('seller_id')
        product = request.GET.get('product')
        minPrice = request.GET.get('minPrice')
        maxPrice = request.GET.get('maxPrice')
        limit = request.GET.get('limit')
        try:
            queryset = InvoicesService.filter_invoices(
                buyer_id=buyer_id,
                seller_id=seller_id,
                product=product,
                minPrice=minPrice,
                maxPrice=maxPrice,
                limit=limit
            )
        except ValueError as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)




