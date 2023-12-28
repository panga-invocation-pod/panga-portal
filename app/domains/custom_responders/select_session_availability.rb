module CustomResponders
  class SelectSessionAvailability
    def initialize(workshop:)
      @workshop = workshop
    end

    def as_json
      {
        sessions: sessions.map do |session|
          session.as_json(only: [:id, :start_at], methods: [:end_at])
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
