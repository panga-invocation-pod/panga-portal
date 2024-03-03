class Attendance < ApplicationRecord
  include AASM

  belongs_to :person
  belongs_to :event_session
  belongs_to :invitation, optional: true

  scope :for_event, ->(event) { joins(:event_session).where(event_sessions: { event_id: event.id }) }

  validates :person, uniqueness: { scope: :event_session }

  aasm do
    state :available, initial: true
    state :invite_planned
    state :invited
    state :facilitator
    state :unavailable

    event :make_invitee do
      transitions from: :available, to: :invite_planned
    end

    event :unmake_invitee do
      transitions from: [:invite_planned], to: :available
    end

    event :invite do
      before do
        invitation.send_invitation_email! if invitation.present?
      end

      transitions from: :invite_planned, to: :invited
    end

    event :resend_invitation do
      before do
        invitation.send_invitation_email! if invitation.present?
      end

      transitions from: :invited, to: :invited
    end

    event :retract_invitation do
      after do
        invitation.uninvited_from_session! if invitation.present?
      end

      transitions from: :invited, to: :available
    end

    event :cant_attend do
      transitions from: [:available, :invite_planned, :invited], to: :unavailable
    end

    event :mark_available do
      transitions from: :unavailable, to: :available
    end
  end

  def others_for_person_and_event
    self.class.for_event(event).where(person: person).where.not(id: id)
  end

  def event
    event_session.event
  end
end
