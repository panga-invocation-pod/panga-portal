module CustomResponders
  class SelectSessionAvailability
    include DatetimeHelper

    def initialize(workshop:, custom_data: nil)
      @workshop = workshop
      @custom_data = custom_data
    end

    def as_json
      {
        responder_type: 'form',
        fields: [
          {
            "name": "session_ids",
            "field_type": "checkbox_group",
            "label": "Select all suitable times",
            "required": true,
            "options": sessions.map do |session|
              {
                value: session.id.to_s,
                label: "#{format_date(session.start_at)}: #{format_time_range(session.start_at, session.end_at)}",
              }
            end
          }
        ],
        buttons: custom_data['buttons'] || []
      }
    end

    private

    attr_reader :workshop, :custom_data

    def sessions
      @session ||= workshop.sessions.future
    end
  end
end
