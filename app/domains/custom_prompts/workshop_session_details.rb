module CustomPrompts
  class WorkshopSessionDetails

    def initialize(attendance:)
      @attendance = attendance
    end

    def as_json
      {
        data: {
          session: {
            id: workshop_session.id,
            name: event.name,
            start_at: workshop_session.start_at,
            end_at: workshop_session.end_at,
            facilitators: workshop_session.facilitators.order(:short_name).map { |facilitator| facilitator_json(facilitator) },
            location: workshop_session.location && location_json(workshop_session.location)
          }
        }
      }
    end

    private

    attr_reader :attendance

    def workshop_session
      attendance.workshop_session
    end

    def event
      workshop_session.event
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
