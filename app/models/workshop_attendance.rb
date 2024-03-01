class WorkshopAttendance < ApplicationRecord
  include AASM

  belongs_to :person
  belongs_to :workshop_session
  belongs_to :invitation, optional: true

  scope :for_workshop, ->(workshop) { joins(:workshop_session).where(workshop_sessions: { workshop_id: workshop.id }) }

  validates :person, uniqueness: { scope: :workshop_session }

  aasm do
    state :available, initial: true
    state :invite_planned
    state :invited
    state :facilitator

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
  end

  def others_for_person_and_workshop
    self.class.for_workshop(workshop).where(person: person).where.not(id: id)
  end

  def workshop
    workshop_session.workshop
  end
end
