from django.apps import AppConfig


class PlannerAppConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'planner_app'

    def ready(self):
        import planner_app.signals
