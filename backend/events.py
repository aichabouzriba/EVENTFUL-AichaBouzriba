from flask import request
from flask_restx import Namespace, Resource, fields
from models import Event
from flask_jwt_extended import jwt_required


event_ns = Namespace("event", description="A namespace for Events")

event_model = event_ns.model(
    "Event",
    {
        "id": fields.Integer(),
        "title": fields.String(),
        "description": fields.String(),
        "date": fields.String(),
        "location": fields.String()
    }
)


@event_ns.route("/events")
class EventsResource(Resource):

    @event_ns.marshal_list_with(event_model)
    def get(self):
        """get all events"""
        events = Event.query.all()

        return events, 200

    @event_ns.marshal_with(event_model)
    @event_ns.expect(event_model)
    @jwt_required()
    def post(self):
        """create a new event"""
        data = request.get_json()

        new_event = Event(
            title=data.get("title"),
            description=data.get("description"),
            date=data.get("date"),
            location=data.get("location")
        )

        new_event.save()

        return new_event, 201


@event_ns.route("/event/<int:id>")
class EventResource(Resource):

    @event_ns.marshal_with(event_model)
    def get(self, id):
        """get an event by id"""
        event = Event.query.get_or_404(id)

        return event

    @event_ns.marshal_with(event_model)
    @jwt_required()
    def put(self,id):
        """update an event"""
        event_to_update = Event.query.get_or_404(id)

        data = request.get_json()

        event_to_update.update(data.get("title"), data.get("description"), data.get("date"), data.get("location"))

        return event_to_update

    @event_ns.marshal_with(event_model)
    @jwt_required()
    def delete(self, id):
        """delete an event"""
        event_to_delete = Event.query.get_or_404(id)

        event_to_delete.delete()

        return event_to_delete




