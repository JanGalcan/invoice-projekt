
from rest_framework.decorators import api_view
from rest_framework.response import Response
from ..models import Invoice
import pandas as pd
from datetime import datetime

@api_view(['GET'])
def invoices_statistics(request):

    invoices = Invoice.objects.all().values('price', 'issued')
    df = pd.DataFrame(list(invoices))


    if df.empty:
        return Response({
            "currentYearSum": 0,
            "allTimeSum": 0,
            "invoicesCount": 0
        })


    df['issued'] = pd.to_datetime(df['issued'])


    year_param = request.GET.get('year')
    if year_param and year_param.isdigit():
        year = int(year_param)
    else:
        year = datetime.now().year


    all_time_sum = df['price'].sum()


    current_year = datetime.now().year
    current_year_sum = df[df['issued'].dt.year == current_year]['price'].sum()


    invoices_count = len(df)


    result = {
        "currentYearSum": float(current_year_sum),
        "allTimeSum": float(all_time_sum),
        "invoicesCount": invoices_count,
        "yearUsed": year  # přidáme info, podle jakého roku se počítalo
    }

    return Response(result)
