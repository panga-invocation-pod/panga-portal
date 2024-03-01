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
            name: workshop.name,
            start_at: workshop_session.start_at,
            end_at: workshop_session.end_at,
            facilitators: workshop_session.facilitators.order(:short_name).map do |facilitator|
              {
                id: facilitator.id,
                name: facilitator.short_name
              }
            end
          }
        }
      }
    end

    private

    attr_reader :attendance

    def workshop_session
      attendance.workshop_session
    end

    def workshop
      workshop_session.workshop
    end
  end
end
