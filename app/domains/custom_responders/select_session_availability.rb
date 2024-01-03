module CustomResponders
  class SelectSessionAvailability
    include DatetimeHelper

    def initialize(workshop:)
      @workshop = workshop
    end

    def as_json
      {
        fields: [
          {
            "name": "sessions",
            "field_type": "checkbox_group",
            "label": "Select all suitable times",
            "required": true,
            "options": sessions.map do |session|
              {
                id: session.id.to_s,
                label: "#{format_date(session.start_at)}: #{format_time_range(session.start_at, session.end_at)}",
              }
            end
          }
        ],
        sessions: sessions.map do |session|
          {
            id: session.id.to_s,
            label: "#{format_date(session.start_at)}: #{format_time_range(session.start_at, session.end_at)}",
          }
        end
      }
    end

    private

    attr_reader :workshop

    def sessions
      @session ||= workshop.sessions.future
    end
  end
end
