module Commands
  class SetSessionAvailability
    def call(input, context)
      workshop = context.workshop
      raise ArgumentError unless workshop

      person = context.current_person
      raise ArgumentError unless person

      sessions = workshop.sessions.find(input[:session_ids])
      raise ArgumentError, "at least one session must be specified" if sessions.empty?

      sessions.each do |workshop_session|
        set_as_available(workshop_session, person)
      end

      return nil
    end

    private

    def set_as_available(workshop_session, person)
      attendance = workshop_session.attendances.find_or_create_by!(person: person)
    end
  end
end