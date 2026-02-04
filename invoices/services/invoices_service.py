from ..models import Invoice

class InvoicesService:
    @staticmethod
    def filter_invoices(buyer_id=None, seller_id=None, product=None, minPrice=None, maxPrice=None, limit=None, identification=None):
        queryset = Invoice.objects.all()

        print(f"buyer_id: {buyer_id}, "
              f"seller_id: {seller_id}, "
              f"product: {product}, "
              f"minPrice: {minPrice}, "
              f"maxPrice: {maxPrice}, "
              f"limit: {limit},"
              f"identification: {identification}")

        if buyer_id :
            queryset = queryset.filter(buyer__id=buyer_id)
        if seller_id :
            queryset = queryset.filter(seller__id=seller_id)
        if product:
            queryset = queryset.filter(product__icontains=product)
        if minPrice :
            try:
                minPrice = float(minPrice)
                queryset = queryset.filter(price__gte=minPrice)
            except ValueError:
                raise ValueError("minPrice must be a valid number")
        if maxPrice:
            try:
                maxPrice = float(maxPrice)
                queryset = queryset.filter(price__lte=maxPrice)
            except ValueError:
                raise ValueError("maxPrice must be a valid number")
        if limit:
            try:
                limit = int(limit)
                queryset = queryset[:int(limit)]
            except ValueError:
                raise ValueError("limit must be a valid integer")

        if identification:
            queryset = queryset.filter(buyer__identificationNumber=identification) | queryset.filter(seller__identificationNumber=identification)


        return queryset

    #vytvořit nové view na purchases a sales pro osobu