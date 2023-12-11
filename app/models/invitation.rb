class Invitation < ApplicationRecord
  has_secure_token

  belongs_to :inviter, class_name: 'Person'
  belongs_to :invitee, class_name: 'Person'
end
