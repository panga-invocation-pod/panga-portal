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
            location: location && location_json(location)
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
        image: {
          url: "https://rsnh.org.au/wp-content/uploads/2023/12/outdoor-tables-in-lovely-garden-setting-reynard-street-neighbourhood-house-in-coburg.jpg",
          alt: "Reynard St Neighbourhood House",
        },
        address: location.address.as_json
      }
    end
  end
end
