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
    state :considering_availability
  end

  def applicable_workshop_sessions(limit:)
    WorkshopSession.future.limit(limit)
  end
end
