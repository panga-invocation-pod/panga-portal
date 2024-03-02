module CustomPrompts
  class EventSessionDetails

    def initialize(attendance:)
      @attendance = attendance
    end

    def as_json
      {
        data: {
          session: {
            id: session.id,
            name: event.name,
            start_at: session.start_at,
            end_at: session.end_at,
            facilitators: session.facilitators.order(:short_name).map { |facilitator| facilitator_json(facilitator) },
            location: location && location_json(location),
            links: {
              calendar: "/event_sessions/#{session.id}-#{CGI.escape(event.name)}.ics",
            }
          }
        }
      }
    end

    private

    attr_reader :attendance

    def session
      attendance.event_session
    end

    def event
      session.event
    end

    def location
      session.location
    end

    def facilitator_json(facilitator)
      {
        id: facilitator.id,
        name: facilitator.short_name
      }
    end

    def location_json(location)
      {
        id: location.id,
        name: location.name,
        directions: location.directions,
        accessibility: location.accessibility,
        image: image_json(location.picture),
        address: location.address.as_json
      }
    end

    def image_json(image)
      return nil unless image.attached?
      {
        url: image.variant(:card).url,
        alt: image.filename
      }
    end
  end
end
