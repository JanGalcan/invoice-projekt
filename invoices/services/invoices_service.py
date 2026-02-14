from ..models import Invoice

class InvoicesService:
    @staticmethod
    def filter_invoices(buyer_id=None, seller_id=None, product=None, min_price=None, max_price=None, limit=None, identification=None):
        queryset = Invoice.objects.all()

        print(f"buyer_id: {buyer_id}, "
              f"seller_id: {seller_id}, "
              f"product: {product}, "
              f"min_price: {min_price}, "
              f"max_price: {max_price}, "
              f"limit: {limit},"
              f"identification: {identification}")

        if buyer_id :
            queryset = queryset.filter(buyer__id=buyer_id)
        if seller_id :
            queryset = queryset.filter(seller__id=seller_id)
        if product:
            queryset = queryset.filter(product__icontains=product)
        if min_price :
            try:
                min_price = float(min_price)
                queryset = queryset.filter(price__gte=min_price)
            except ValueError:
                raise ValueError("min_price must be a valid number")
        if max_price:
            try:
                max_price = float(max_price)
                queryset = queryset.filter(price__lte=max_price)
            except ValueError:
                raise ValueError("max_price must be a valid number")
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