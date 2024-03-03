class Invitation < ApplicationRecord
  include AASM
  has_secure_token

  belongs_to :inviter, class_name: 'Person'
  belongs_to :invitee, class_name: 'Person'
  belongs_to :workshop, class_name: 'Event', optional: true, foreign_key: 'event_id'
  has_many :attendances

  validates :invitee, uniqueness: { scope: :inviter }
  validates :inviter, :invitee, :message, :workshop, presence: true

  aasm do
    state :new, initial: true
    state :confirmed_identity
    state :considering_accessibility
    state :considering_availability
    state :collecting_contact_details
    state :awaiting_workshop_invitation
    state :invited_to_workshop
    state :cant_do_workshop
    state :invitation_declined

    event :confirm_identity do
      transitions from: :new, to: :confirmed_identity
    end

    event :workshop_explained do
      transitions from: [:new, :confirmed_identity], to: :considering_accessibility
    end

    event :accessibility_needs_provided do
      transitions from: :considering_accessibility, to: :considering_availability
    end

    event :cant_do_workshop do
      transitions from: [:considering_accessibility, :considering_availability], to: :cant_do_workshop
    end

    event :invitation_declined do
      transitions from: [:considering_accessibility, :considering_availability], to: :invitation_declined
    end

    event :no_accessibility_needs do
      transitions from: :considering_accessibility, to: :considering_availability
    end

    event :accessibility_needs_recorded do
      transitions from: :considering_accessibility, to: :considering_availability
    end

    event :availability_recorded do
      transitions from: :considering_availability, to: :collecting_contact_details
    end

    event :received_invitee_email do
      transitions from: :collecting_contact_details, to: :awaiting_workshop_invitation
    end

    event :uninvited_from_session do
      transitions from: :invited_to_workshop, to: :awaiting_workshop_invitation do
        guard do
          attendances.invited.empty?
        end
      end
    end

    event :send_invitation_email do
      after do
        YamDaisyMailer.with(invitation_id: id).first_workshop_invite.deliver_now
      end

      transitions from: [:awaiting_workshop_invitation, :invited_to_workshop], to: :invited_to_workshop
    end

    event :workshop_invitation_rejected do
      after do
        attendances.invited.each(&:cant_attend!)
      end

      transitions from: :invited_to_workshop, to: :considering_availability
    end

    event :reset do
      transitions to: :confirmed_identity
    end
  end

  def applicable_event_sessions(limit:)
    EventSession.future.limit(limit)
  end

  def in_progress?
    !new?
  end

  def opted_out?
    cant_do_workshop? || invitation_declined?
  end

  def set_invitee_email!(email)
    raise ArgumentError, "no email" if email.blank?
    self.invitee_email = email
    received_invitee_email if may_received_invitee_email?
    save!
  end

  def workshop_invitation
    attendances.invited.first
  end

  def delete_contact_details!
    self.invitee_email = nil
    save!
  end

  def append_note(text)
    self.notes = [self.notes, text].reject(&:blank?).join("\n\n")
  end
end
