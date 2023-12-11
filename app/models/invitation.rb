class Invitation < ApplicationRecord
  has_secure_token

  belongs_to :inviter, class_name: 'Person'
  belongs_to :invitee, class_name: 'Person'

  validates :invitee, uniqueness: { scope: :inviter }

  def applicable_workshop_sessions(limit:)
    WorkshopSession.future.limit(limit)
  end
end
