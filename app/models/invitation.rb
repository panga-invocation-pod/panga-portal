class Invitation < ApplicationRecord
  include AASM
  has_secure_token

  belongs_to :inviter, class_name: 'Person'
  belongs_to :invitee, class_name: 'Person'

  validates :invitee, uniqueness: { scope: :inviter }
  validates :message, presence: true

  aasm do
    state :new, initial: true
    state :confirmed_identity
    state :considering_accessibility
    state :considering_availability
    state :collecting_contact_details
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

    event :reset do
      transitions to: :confirmed_identity
    end
  end

  def applicable_workshop_sessions(limit:)
    WorkshopSession.future.limit(limit)
  end

  def in_progress?
    !new?
  end

  def opted_out?
    cant_do_workshop? || invitation_declined?
  end
end
