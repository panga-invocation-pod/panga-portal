class WorkshopSession < ApplicationRecord
  belongs_to :workshop
  validates :start_at, presence: true

end
