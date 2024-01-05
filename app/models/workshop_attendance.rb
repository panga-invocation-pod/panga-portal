class WorkshopAttendance < ApplicationRecord
  include AASM

  belongs_to :person
  belongs_to :workshop_session

  scope :for_workshop, ->(workshop) { joins(:workshop_session).where(workshop_sessions: { workshop_id: workshop.id }) }

  aasm do
    state :available, initial: true
    state :invited

    event :make_invitee do
      transitions from: :available, to: :invited
    end

    event :unmake_invitee do
      transitions from: :invited, to: :available
    end
  end

  def others_for_person_and_workshop
    self.class.for_workshop(workshop).where(person: person).where.not(id: id)
  end

  def workshop
    workshop_session.workshop
  end
end
