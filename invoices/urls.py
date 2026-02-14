from django.urls import path, include
from .routers import SlashOptionalRouter

from .views.person_views import PersonViewSet
from .views.invoice_views import InvoiceViewSet
from .views.purchase_views import PurchaseListView
from .views.sales_views import SalesListView
from .views.invoice_statistics_views import invoices_statistics
from .views.person_statistics_views import persons_statistics
router = SlashOptionalRouter()
router.register(r'persons', PersonViewSet)
router.register(r"invoices", InvoiceViewSet)


urlpatterns = [
    path('api/', include(router.urls)),
    path('api/identification/<str:identificationNumber>/purchases',PurchaseListView.as_view(), name='purchase_by_identification'),
    path('api/identification/<str:identificationNumber>/sales', SalesListView.as_view(), name='sales_by_identification'),
    path('api/statistics/invoices/', invoices_statistics, name='invoices-statistics'),
    path('api/statistics/persons/', persons_statistics, name='persons-statistics')
]

