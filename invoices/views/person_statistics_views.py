# invoices/views/person_statistics_views.py
from rest_framework.decorators import api_view
from rest_framework.response import Response
from ..models import Person, Invoice
import pandas as pd

@api_view(['GET'])
def persons_statistics(request):
    # volitelný parametr personId
    person_id = request.GET.get('personId')  # tady očekáváme Django PK

    # načíst faktury s prodejci
    invoices = Invoice.objects.select_related('seller').values(
        'price',
        'seller__id',    # Django FK, ne _id z JSON
        'seller__name'
    )
    df = pd.DataFrame(list(invoices))

    if df.empty:
        return Response([])

    # pokud je zadáno person_id, filtrovat podle něj
    if person_id:
        df = df[df['seller__id'] == int(person_id)]
        if df.empty:
            return Response([])

    # agregace
    df_grouped = df.groupby(['seller__id', 'seller__name'], as_index=False)['price'].sum()

    result = [
        {
            "personId": int(row['seller__id']),
            "personName": row['seller__name'],
            "revenue": float(row['price'])
        }
        for _, row in df_grouped.iterrows()
    ]

    return Response(result)
